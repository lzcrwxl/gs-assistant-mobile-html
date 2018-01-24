<template>
  <div id="replaceAunt">
    <header>
      <div class="header">
        <h3>
          <a @click="close" class="back"></a>
          选择配单家政员
        </h3>
        <a class="confirm" @click="checkGrapOrder">确认</a>
      </div>
      <div>
        <div class="search-bar">
          <input type="text" maxlength="40" placeholder="搜索（家政员姓名、编号）" class="search" @keyup="search" v-model="searchTxt">
        </div>
        <!--<SearchBar @keyup.enter="search" v-model="searchTxt"></SearchBar>-->
      </div>
      <ServiceType :opts="opt" :eduData="eduData" :nativeData="nativeData" :ageRange="ageRange" :zodic='zodiacs'
                   @sortJob="sortAunt" @clearSort="clearSort"></ServiceType>
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
                <h6 class="f30 mt10">{{item.staffName}}
                <span>{{item.serviceItems}}</span>
                </h6>
                <p class="replaceDetail">{{item.age}}岁&nbsp;|&nbsp;属{{item.zodiac}}&nbsp;|&nbsp;{{item.nativePlace}}人&nbsp;|&nbsp;处女座&nbsp;|&nbsp;{{item.education}}
                </p>
                <div class="replacePrice"><em>￥</em>{{item.servicePrice}} <span class="unit f20">{{item.unitValue}}</span></div>
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
  @blue:#0080ff;
  header{
    h3{
      position: relative;
      height:.88rem;
      line-height: .88rem;
      background: #ffffff;
      font-size: .34rem;
      text-align: center;
      box-shadow: 0px 5px 10px rgba(10,126,227,.11);
      z-index: 10;
      position: relative;
      a{
        position: absolute;
        right: .3rem;
        color: @blue;
        font-size: .3rem;
      }
    }
  }
  .back{
    position: absolute;
    left:0;
    padding-left:.2rem;
    padding-right: .2rem;
    width: .2rem;
    height: 100%;
    background: url("/static/img/back.png")no-repeat center;
    background-size: .2rem auto;
  }
  .search-bar{
    border-bottom: 1px solid #efeff4;
    height: .88rem;
    background: #ffffff;
    line-height: .88rem;
    text-align: center;
    .search{
      width: 6.9rem;
      height: .56rem;
      background: #efeff4;
      background-image: url("../../assets/img/icons/search.png");
      background-size: .31rem;
      background-repeat: no-repeat;
      background-position: .19rem center;
      font-size: .24rem;
      border-radius: .12rem;
      padding:0 .65rem;
      position: relative;
    }
  }
  .header {
    position: relative;
    .confirm {
      position: absolute;
      float: right;
      right: .3rem;
      top:.3rem;
      font-size: .3rem;
      color: @blue;
      z-index: 999;
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
          .auntRtBox{
            vertical-align: bottom;
            display: inline-block;
            margin-left: .3rem;
            h6{
              /*width: 4.3rem;*/
              span{
                margin-left: .3rem;
                font-size: .22rem;
                color: #6b6b6b;
              }
              /*overflow: hidden;*/
              /*text-overflow: ellipsis;*/
              /*white-space: nowrap;*/
            }
            .replaceDetail{
              margin:.3rem 0;
              color: #a9a9a9;
              font-size: .20rem;
            }
            .replacePrice{
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

  export default{
    data(){
      return {
        opt: [
          {name: '工种', href: "#sortService", isChecked: false},
          {name: '学历', href: "#sortEducation", isChecked: false},
          {name: "籍贯", href: "#sortNative", isChecked: false},
          {name: "更多", href: "#sortMore", isChecked: false},
        ],
        picked:"",
        auntsList:[],
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
        searchTxt:"",
        staffNo:"",
        staffName:"",
        searchTxt:"",
        page:1,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
      this.eduData = this.$cm.getEudcationData();
      this.nativeData = this.$cm.getNativePlace();
      this.ageRange = this.$cm.getAgeRange();
      this.zodiacs = this.$cm.getZodic();
    },
    mounted(){
    },
    watch:{
      isAunt:function(){
        if(this.isAunt){
          this.fetchData()
        }
      },
      rReserve:function () {
        if(this.rReserve){

        }
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      SearchBar,
      ServiceType,
      HeadView
    },
    methods: {
      fetchData(){
        this.$store.dispatch('hideHeader')
        let _this=this;
        console.log(_this.reserve)
        $.ajax({
          url: window.global_config.getCreateStaffList,
          type: "post",
          data: {
            pageNumber: _this.page,
            pageSize: _this.$cm.pageSize,
            serviceItemCode:_this.code,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
            staffNo:_this.staffNo,
            staffName:_this.staffName
          },
          headers: _this.params,
          dataType: "json",
          success: function success(data) {
            if(data.success){
               var dataJD=data.jsonData;
              _this.auntsList=dataJD.rows;
              console.log(data);
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      检查是否可抢单
      checkGrapOrder(){
        let _this=this;
        var staffId=_this.picked;
        var orderNo=this.$route.params.orderNo;;
        var jobId=this.$route.params.jobId;;
        console.log(orderNo)
        if(_this.$cm.isEmpty(staffId)){
          this.$vux.toast.text('请选择家政员')
          return;
        }
        $.ajax({
          url: window.global_config.staffInfo,
          type: "get",
          headers: _this.params,
          data: {staffId:staffId},
          dataType: "json",
          async:false,
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                var dataBD=data.jsonData.baseInfo;
                var dataJD=data.jsonData.jobInfo;
                _this.$emit('update:isAunt', false)
                _this.$emit('getAuntInfo', dataBD,dataJD,_this.picked)
//                _this.$router.go(-1);
//                _this.$router.push({name: 'createOrder',params:{dataDB:dataBD,dataJD:dataJD,staffId:staffId}})
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
          this.fetchData();
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
          this.nativePlace = "";
          this.fetchData();
        })
      },
      //      搜索
      search(){
        var txt=this.searchTxt;
        var regTxt=/^[Ss0-9]+$/;
        if(regTxt.test(txt)){
          this.staffNo=txt;
          this.staffName="";
        }else {
          this.staffName=txt;
          this.staffNo="";
        }
        this.fetchData();
      },
      close(){
        this.$emit('update:isAunt', false)
      }
    },
    props:["isAunt","code",'rReserve']
  }
</script>
