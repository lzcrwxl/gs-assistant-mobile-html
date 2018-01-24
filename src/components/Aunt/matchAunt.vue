<template>
  <div id="replaceAunt">
    <LayerTemplate :isBalanceShow.sync="isBalanceShow" :deposit="resumeDeposit" :num="num"
                   @grap="grapOrder"></LayerTemplate>
    <header>
      <div class="header">
        <HeadView></HeadView>
        <a class="confirm" @click="checkGrapOrder">确认</a>
      </div>
      <div>
        <div class="search-bar">
          <input type="text" maxlength="40" placeholder="搜索（家政员姓名、编号）" class="search" @keyup="search"
                 v-model="searchTxt">
        </div>
        <!--<SearchBar @keyup.enter="search" v-model="searchTxt"></SearchBar>-->
      </div>
      <ServiceType :opts="opt" :eduData="eduData" :nativeData="nativeData" :ageRange="ageRange" :zodic='zodiacs'
                   @sortJob="sortAunt" @clearSort="clearSort" :exps="exps"></ServiceType>
    </header>
    <div class="replaceContainer">
      <ul class="replaceLists">
        <li class="replaceItem" v-for="(item,index) in auntsList" :data-staffId="item.staffId">
          <label>
            <input type="radio" class="rdoDot" name="aunt" :value="item.staffId" v-model="picked">
            <div class="replacePannel">
              <div class="imgLfBox">
                <img :src="item.headImage" alt="">
              </div>
              <div class="auntRtBox">
                <h6 class="f30 mt10">{{item.staffName}}<span class="ml30 f26">{{item.serviceType}}</span>
                </h6>
                <p class="replaceDetail">{{item.age}}岁&nbsp;|&nbsp;属{{item.zodiac}}&nbsp;|&nbsp;{{item.nativePlace}}人&nbsp;|&nbsp;处女座&nbsp;|&nbsp;{{item.education}}
                </p>
                <div class="replacePrice"><em>￥</em>{{item.servicePrice}} <span
                  class="unit f20">{{item.unitValue}}</span></div>
              </div>
            </div>
          </label>
        </li>
      </ul>
      <NoStaff v-show="noStaff"></NoStaff>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";

  .search-bar {
    border-bottom: 1px solid #efeff4;
    height: .88rem;
    background: #ffffff;
    line-height: .88rem;
    text-align: center;
    .search {
      width: 6.9rem;
      height: .56rem;
      background: #efeff4;
      background-image: url("../../assets/img/icons/search.png");
      background-size: .31rem;
      background-repeat: no-repeat;
      background-position: .19rem center;
      font-size: .24rem;
      border-radius: .12rem;
      padding: 0 .65rem;
      position: relative;
    }
  }

  .header {
    position: relative;
    .confirm {
      position: absolute;
      float: right;
      right: .3rem;
      top: .3rem;
      font-size: .3rem;
      color: @blue;
      z-index: 90;
    }
  }

  .replaceContainer {
    .replaceLists {
      .replaceItem {
        margin: .24rem .3rem .24rem .2rem;
        label {
          font-size: .3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .replacePannel {
          border: 2px solid #ffffff;
          display: flex;
          justify-content: flex-start;
          padding: .24rem;
          border-radius: .06rem;
          font-size: .3rem;
          float: right;
          align-items: flex-end;
          background: #ffffff;
          width: 6.5rem;
          height: 2.15rem;
          .imgLfBox {
            display: inline-block;
            width: 1.24rem;
            height: 1.53rem;
            border: 1px solid #f2f2f2;
            border-radius: .06rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .auntRtBox {
            vertical-align: bottom;
            display: inline-block;
            margin-left: .3rem;
            h6 {
              /*width: 4.3rem;*/
              span {
                margin-left: .3rem;
                font-size: .22rem;
                color: #6b6b6b;
              }
              /*overflow: hidden;*/
              /*text-overflow: ellipsis;*/
              /*white-space: nowrap;*/
            }
            .replaceDetail {
              margin: .3rem 0;
              color: #a9a9a9;
              font-size: .20rem;
            }
            .replacePrice {
              color: @price;
              font-size: .2rem;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import ServiceType from "../template/serviceType"
  import {ButtonTab, ButtonTabItem} from 'vux'
  import SearchBar from "@/components/template/searchBarTemplate"
  import HeadView from "@/components/Header/headView"
  import NoStaff from 'components/template/noCtnTemplate'
  import LayerTemplate from 'components/template/layerTemplate'

  export default{
    data(){
      return {
        opt: [
          {name: '经验', href: "#sortExperience", isChecked: false},
          {name: '学历', href: "#sortEducation", isChecked: false},
          {name: "籍贯", href: "#sortNative", isChecked: false},
          {name: "更多", href: "#sortMore", isChecked: false},
        ],
        picked: "",
        auntsList: [],
        eduData: [],
        serviceType: "",
        education: "",
        nativeData: [],
        ageRange: [],
        zodiacs: [],
        nativePlace: "",
        age: "",
        zodiac: "",
        state: "",
        searchTxt: "",
        staffNo: "",
        staffName: "",
        noStaff: false,
        page: 1,
        num: "",
        resumeDeposit: "",
        money: "",
        isBalanceShow: false,
        jobId: "",
        staffId: "",
        exps: [],
        experience: "",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
      this.fetchData()
      this.eduData = this.$cm.getEudcationData();
      this.nativeData = this.$cm.getNativePlace();
      this.ageRange = this.$cm.getAgeRange();
      this.zodiacs = this.$cm.getZodic();
      this.exps = this.$cm.getExperience();
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      SearchBar,
      ServiceType,
      HeadView,
      NoStaff,
      LayerTemplate
    },
    methods: {
      fetchData(){
        let _this = this;
        var orderNo = this.$route.params.orderNo;
        _this.jobId = this.$route.params.jobId;
        console.log(orderNo)
        $.ajax({
          url: window.global_config.getStaffList,
          type: "post",
          data: {
            pageNumber: _this.page,
            pageSize: _this.$cm.pageSize,
            orderNo: orderNo,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
            staffNo: _this.staffNo,
            staffName: _this.staffName,
            experience: _this.experience
          },
          headers: _this.params,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.auntsList = dataJD.rows;
              if (_this.auntsList == "") {
                _this.noStaff = true;
              } else {
                _this.noStaff = false;
              }
              console.log(data);
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      检查是否可抢单
      checkGrapOrder(){
        let _this = this;
        _this.staffId = _this.picked;
        if (_this.$cm.isEmpty(_this.staffId)) {
          this.$vux.toast.text('请选择家政员')
          return;
        }
        _this.getReleaseInfo()
      },
      getReleaseInfo(){
        let _this = this;
        var req = {
          url: window.global_config.releaseJob,
          methods: 'get',
          headers: _this.params
        }
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            console.log(dataJD)
            _this.num = dataJD.resumeTotalNum - dataJD.resumeUsedNum;
            _this.money = dataJD.balance - dataJD.resumeDeposit;
            _this.resumeDeposit = dataJD.resumeDeposit;
            if (_this.num > 0) {
              _this.isBalanceShow = true;
              return;
            } else if (_this.num < 1 && _this.money < 100) {
              _this.isBalanceShow = true;
              return;
            } else {
              _this.isBalanceShow = false;
              _this.grapOrder();
            }
          }
        }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.releaseJob,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                let dataJD = data.jsonData;
                console.log(dataJD)
                _this.num = dataJD.resumeTotalNum - dataJD.resumeUsedNum;
                _this.money = dataJD.balance - dataJD.resumeDeposit;
                _this.resumeDeposit = dataJD.resumeDeposit;
                if (_this.num > 0) {
                  _this.isBalanceShow = true;
                  return;
                } else if (_this.num < 1 && _this.money < 0) {
                  _this.isBalanceShow = true;
                  return;
                } else {
                  _this.isBalanceShow = false;
                  _this.grapOrder();
                }
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      grapOrder(){
        let _this = this;
        $.ajax({
          url: window.global_config.jobsList + "/" + _this.jobId + "/resume",
          type: "post",
          data: {
            staffId: _this.staffId,
          },
          headers: _this.params,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              console.log(data);
              _this.$vux.toast.show({
                text: '抢单成功，等待对方处理',
                width:"4rem",
                position:"middle",
                onHide () {
                  _this.$router.push({name: 'grap',query: { grapNo: 1 }})
                }
              })
            } else {
              console.log(data);
              _this.$cm.checkAuth(data.code)
              if (data.code == 900001) {
                _this.$vux.toast.text("该订单已抢完，请下次加油")
                _this.$router.push({name: 'grap'})
              } else if (data.code == 900002) {
                _this.$vux.toast.text("抢单失败，该订单已取消")
                _this.$router.push({name: 'grap'})
              } else {
                _this.$vux.toast.text(data.jsonData)
              }
            }
          }
        });
      },
      sortAunt(opts){
        this.$nextTick(() => {
          console.log(opts)
          this.picked="";
          this.opts = opts;
          if ($("#sortAge ul li.mf-on").length > 0) {
            this.age = $("#sortAge ul li.mf-on").data("code");
            console.log(this.age)
          }
          if ($("#sortZodiac ul li.mf-on").length > 0) {
            this.zodiac = $("#sortZodiac ul li.mf-on").data("code");
            console.log(this.zodiac);
          }
          if ($("#sortState ul li.mf-on").length > 0) {
            this.state = $("#sortState ul li.mf-on").data("code");
          }
          this.serviceType = $("#sortService p.service-on").data("code");
          this.education = $("#sortEducation p.service-on").data("code");
          this.nativePlace = $("#sortNative p.service-on").data("code");
          this.experience = $("#sortExperience p.service-on").data("code");
          this.fetchData();
        })
      },
      //      清除搜索结果
      clearSort(){
        this.$nextTick(() => {
          this.picked="";
          this.age = "";
          this.zodiac = "";
          this.state = "";
          this.serviceType = "";
          this.experience = "";
          this.education = "";
          this.nativePlace = "";
          this.fetchData();
        })
      },
      //      搜索
      search(){
        var txt = this.searchTxt;
        var regTxt = /^[Ss0-9]+$/;
        if (regTxt.test(txt)) {
          this.staffNo = txt;
          this.staffName = "";
        } else {
          this.staffName = txt;
          this.staffNo = "";
        }
        this.fetchData();
      }
    },
  }
</script>
