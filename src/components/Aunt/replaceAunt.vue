<template>
  <div id="replaceAunt">
    <header>
      <div class="header">
        <a href="javascript:history.back();" class="back"></a>
        <div class="buttonTab">
          <button-tab>
            <button-tab-item selected @on-item-click="myAunt()">我的家政员</button-tab-item>
            <button-tab-item @on-item-click="resumeAunt()">简历箱</button-tab-item>
          </button-tab>
        </div>
        <a class="confirm" @click="changeStaff">确认</a>
      </div>
      <div>
        <SearchBar @search="search" v-show="isStaffList"></SearchBar>
      </div>
      <ServiceType :opts="opt" :eduData="eduData" :nativeData="nativeData" :exps="exps" :ageRange="ageRange"
                   :zodic='zodiacs'
                   @sortJob="sortAunt" @clearSort="clearSort"></ServiceType>
    </header>
    <div class="replaceContainer">
      <div class="noStaff" v-show="noStaff">
        暂无内容~
      </div>
      <ul class="replaceLists" v-if="isStaffList">
        <li class="replaceItem" v-for="(item,index) in auntsList">
          <label>
            <input type="radio" class="rdoDot" name="aunt" v-model="picked" :value="item.staffId">
            <div class="replacePannel">
              <div class="imgLfBox">
                <img :src="item.headImage" alt="">
              </div>
              <div class="auntRtBox">
                <h6 class="f30 mt10">{{item.staffName}}
                  <span>{{item.serviceType}}</span>
                </h6>
                <p class="replaceDetail">{{item.age}}岁&nbsp;|&nbsp;属{{item.zodiac}}&nbsp;|&nbsp;{{item.nativePlace}}人&nbsp;|&nbsp;{{item.constellationValue}}&nbsp;|&nbsp;{{item.education}}
                </p>
                <div class="replacePrice"><em>￥</em>{{item.servicePrice|money}}<span
                  class="unit f20">{{item.unitValue}}</span></div>
              </div>
            </div>
          </label>
        </li>
        <!--<label>
          <input type="radio" class="rdoDot" name="aunt" v-model="picked" :value="item.staffId">
          <div class="replacePannel">
            <div class="imgLfBox">
              <img :src="item.headImage" alt="">
            </div>
            <div class="auntRtBox">
              <h6 class="f30 mt10">{{item.staffName}}
                <span>{{item.serviceType}}</span>
              </h6>
              <p class="replaceDetail">{{item.age}}岁&nbsp;|&nbsp;属{{item.zodiac}}&nbsp;|&nbsp;{{item.nativePlace}}人&nbsp;|&nbsp;{{item.constellationValue}}&nbsp;|&nbsp;{{item.education}}
              </p>
              <div class="replacePrice"><em>￥</em>{{item.servicePrice|money}}<span class="unit f20">{{item.unitValue}}</span></div>
            </div>
          </div>
        </label>-->
        </li>

      </ul>
      <ul class="replaceLists" v-else>
        <li class="replaceItem" v-for="(item,index) in resumeList">
          <label>
            <input type="radio" class="rdoDot" name="aunt" v-model="picked" :value="item.resumeTenantStaffId">
            <div class="replacePannel">
              <div class="imgLfBox">
                <img :src="item.staffInfo.headImage" alt="">
              </div>
              <div class="auntRtBox">
                <h6 class="f30 mt10">
                  <em v-if="item.staffInfo.sex=='01'">{{item.staffInfo.staffName.substr(0,1)+"师傅"}}</em>
                  <em v-if="item.staffInfo.sex=='02'">{{item.staffInfo.staffName.substr(0,1)+"阿姨"}}</em>
                  <!--<span></span>{{item.staffInfo.staffName}}-->
                  <span>{{item.staffInfo.serviceTypeValue}}</span>
                </h6>
                <p class="replaceDetail">{{item.staffInfo.age}}岁&nbsp;|&nbsp;属{{item.staffInfo.zodiacValue}}&nbsp;|&nbsp;{{item.staffInfo.nativePlaceValue}}人&nbsp;|&nbsp;{{item.staffInfo.constellationValue}}&nbsp;|&nbsp;{{item.staffInfo.educationValue}}
                </p>
                <div class="replacePrice"><em>￥</em>{{item.staffInfo.price}}<span class="unit f20">{{item.staffInfo.unitValue}}</span>
                </div>
              </div>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";

  .back {
    position: absolute;
    left: 0;
    padding-left: .2rem;
    padding-right: .2rem;
    width: .2rem;
    height: 100%;
    background: url("/static/img/back.png") no-repeat center;
    background-size: .2rem auto;
  }

  .header {
    position: relative;
    height: .88rem;
    background: #ffffff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .buttonTab {
      display: inline-block;
      width: 3.52rem;
      height: .64rem;
      .vux-button-group > a.vux-button-tab-item-first {
        /*border-top-left-radius:.1rem;*/
        /*border-bottom-left-radius:.1rem;*/
        /*font-size: .3rem;*/
        color: #4c4c4c;
        &:after {
          border: 1px solid #a9a9a9;
          /*border-top-left-radius:.1rem;*/
          /*border-bottom-left-radius:.1rem;*/
        }
      }
      .vux-button-group > a.vux-button-tab-item-last {
        /*font-size: .3rem;*/
        color: #4c4c4c;
        &:after {
          border: 1px solid #a9a9a9;
          /*border-top-left-radius:.06rem;*/
          /*border-bottom-left-radius:.06rem;*/
        }
      }
      .vux-button-group > a.vux-button-group-current {
        color: #FFF;
        background: @blue;
      }

    }
    .confirm {
      position: absolute;
      float: right;
      right: .3rem;
      font-size: .3rem;
      color: @blue;
    }
    box-shadow: 0px 5px 10px rgba(10, 126, 227, .11);
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
  export default{
    data(){
      return {
        opt: [
          {name: '经验', href: "#sortExperience", isChecked: false},
          {name: '学历', href: "#sortEducation", isChecked: false},
          {name: "籍贯", href: "#sortNative", isChecked: false},
          {name: "更多", href: "#sortMore", isChecked: false},
        ],
        code: "",
        orderNo: "",
        auntsList: [],
        isStaffList: true,
        noStaff: false,
        picked: "",
        eduData: [],
        serviceType: "",
        education: "",
        nativeData: [],
        ageRange: [],
        zodiacs: [],
        exps: [],
        nativePlace: "",
        age: "",
        zodiac: "",
        state: "",
        searchTxt: "",
        staffNo: "",
        staffName: "",
        pageStaff: 1,
        pageResume: 1,
        experience: "",
        staffId: "",
        resumeList: [],
        noStaff: false,
        sw: true,
        totalPageStaff:"",
        totalPageResume: "",
        sort: false,
        nomore: false,
        path:"",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    watch: {
      $route(to, from){
//        this.page=1;
        console.log("to:"+to)
        console.log("from:"+from)
      }
    },
    created(){
      this.$cm.shareWechat();
      this.path=this.$route.name;
      console.log(this.path);
      this.orderNo = this.$route.params.orderNo;
      this.eduData = this.$cm.getEudcationData();
      this.nativeData = this.$cm.getNativePlace();
      this.ageRange = this.$cm.getAgeRange();
      this.zodiacs = this.$cm.getZodic();
      this.exps = this.$cm.getExperience();
      this.getStaffList();
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      SearchBar,
      ServiceType
    },
    methods: {
      myAunt(){
        this.pageStaff=1;
        this.getStaffList();
      },
      resumeAunt(){
        this.pageResume=1,
        this.getResumeStaff();
      },
//      获取我的家政员列表
      getStaffList () {
        let _this = this;
        console.log(this.pageStaff)
        console.log(this.totalPageStaff)
        _this.resumeList = [];
        _this.isStaffList = true;
        if (this.sort && this.pageStaff == 1) {
          _this.auntsList = [];
          _this.nomore = false;
        }
        if (_this.totalPageStaff < this.pageStaff && _this.totalPageStaff) {
          if (_this.pageStaff > 1) {
            _this.nomore = true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.getStaffList,
          type: "post",
          headers: _this.params,
          data: {
            pageNumber: _this.pageStaff,
            pageSize: _this.$cm.pageSize,
            orderNo: _this.orderNo,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
            staffNo: _this.staffNo,
            staffName: _this.staffName,
            experience: _this.experience
          },
          headers: _this.$cm.params,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.totalPageStaff = dataJD.total;
              _this.pageStaff = dataJD.page;
              var auntsList = [];
              if (_this.pageStaff == 1) {
                auntsList = auntsList.concat(dataJD.rows);
                _this.auntsList = auntsList;
              } else {
                _this.auntsList = _this.auntsList.concat(dataJD.rows)
              }
              if (_this.auntsList == "") {
                _this.noStaff = true;
              } else {
                _this.noStaff = false;
              }
              _this.sw = true;
              _this.sort = false;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      获取简历
      getResumeStaff(){
        let _this = this;
        console.log("hahha")
        _this.isStaffList = false;
        _this.auntsList = [];
        if (this.sort && this.pageResume == 1) {
          _this.resumeList = [];
          _this.nomore = false;
        }
        if (_this.totalPageResume < this.pageResume && _this.totalPageResume) {
          if (_this.pageResume > 1) {
            _this.nomore = true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.resume,
          headers: _this.params,
          type: "get",
          data: {
            pageNumber: _this.pageResume,
            pageSize: _this.$cm.pageSize,
            orderNo: _this.orderNo,
            status: 2,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
//            staffNo: _this.staffNo,
//            staffName: _this.staffName,
            experience: _this.experience
          },
          headers: _this.$cm.params,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.totalPageResume = dataJD.total;
              _this.pageResume = dataJD.page;
              var resumeList = [];
              if (_this.pageResume == 1) {
                resumeList = resumeList.concat(dataJD.rows);
                _this.resumeList = resumeList;
              } else {
                _this.resumeList = _this.resumeList.concat(dataJD.rows)
              }
              var lists = dataJD.rows;
              if (lists.length > 0) {
                _this.noStaff = false;
              } else {
                _this.noStaff = true;
              }
              _this.sw = true;
              _this.sort = false;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      sortAunt(opts){
        this.$nextTick(() => {
          console.log(opts)
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
          this.sort = true;
          this.pageResume = 1;
          this.pageStaff = 1;
          this.totalPageStaff = "";
          this.totalPageResume = "";
          if (this.isStaffList) {
            this.getStaffList();
          } else {
            this.getResumeStaff();
          }
        })
      },
      //      清除搜索结果
      clearSort(){
        this.$nextTick(() => {
          this.age = "";
          this.zodiac = "";
          this.state = "";
          this.serviceType = "";
          this.education = "";
          this.experience = "";
          this.nativePlace = "";
          this.sort = true;
          this.pageResume = 1;
          this.pageStaff = 1;
          this.totalPageStaff = "";
          this.totalPageResume = "";
          if (this.isStaffList) {
            this.getStaffList();
          } else {
            this.getResumeStaff();
          }
        })
      },
      //      搜索
      search(obj){
        console.log(obj)
        this.staffName = obj.name;
        this.staffNo = obj.id;
        if (this.isStaffList) {
          this.getStaffList();
        } else {
          this.getResumeStaff();
        }
      },
//      更换阿姨
      changeStaff(){
        let _this = this;
        var staffId = _this.picked;
        console.log(staffId)
        if (_this.$cm.isEmpty(staffId)) {
          this.$vux.toast.text('请选择家政员')
          return;
        }
        var isLocalStaff = "";
        if (_this.isStaffList) {
          isLocalStaff = "1";
        } else {
          isLocalStaff = "0";
        }
        $.ajax({
          url: window.global_config.changeStaff,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo, staffId: staffId, isLocalStaff: isLocalStaff},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.$router.go(-1)
                console.log(data.msg);
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      handleScroll () {
        // 判断是否滚动到底部
        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        this.$nextTick(()=>{
          if(this.path.indexOf("replaceAunt")!=-1){
            if(a<30&&a>=0){
              if(this.sw){
                this.sw=false;
                if (this.isStaffList) {
                  this.pageStaff++,
                  this.getStaffList();
                } else {
                  this.pageResume++,
                  this.getResumeStaff();
                }
              }
            }
          }
        })
      },
    },
  }
</script>
