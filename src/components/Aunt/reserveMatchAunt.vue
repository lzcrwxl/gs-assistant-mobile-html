<template>
  <div id="replaceAunt">
    <header>
      <div class="header">
        <h3>
          <a href="javascript:history.back(-1)" class="back"></a>
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
      <ServiceType :opts="opt" :eduData="eduData" :nativeData="nativeData" :exps="exps" :ageRange="ageRange" :zodic='zodiacs'
                   @sortJob="sortAunt" @clearSort="clearSort"></ServiceType>
    </header>
    <div class="replaceContainer">
      <ul class="replaceLists" v-show="!noStaff">
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
                <div class="replacePrice"><em>￥</em>{{item.servicePrice}} <span class="unit f20">{{item.unitValue}}</span></div>
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
  import NoStaff from 'components/template/noCtnTemplate'

  export default{
    data(){
      return {
        opt: [
          {name: '经验', href: "#sortExperience", isChecked: false},
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
        exps:[],
        nativePlace: "",
        age: "",
        zodiac: "",
        state: "",
        searchTxt:"",
        staffNo:"",
        staffName:"",
        page:1,
        orderNo:"",
        experience:"",
        noStaff:false,
        sw:true,
        totalPage:"",
        sort:false,
        nomore:false,
        path:"",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
      this.path=this.$route.name;
      console.log(this.path)
      this.orderNo=this.$route.params.orderNo;
      this.fetchData()
      this.orderNo=this.$route.params.orderNo;;
      this.eduData = this.$cm.getEudcationData(this.params);
      this.nativeData = this.$cm.getNativePlace(this.params);
      this.ageRange = this.$cm.getAgeRange(this.params);
      this.zodiacs = this.$cm.getZodic(this.params);
      this.exps = this.$cm.getExperience(this.params);
    },
    mounted(){
    },
    watch:{
      isAunt:function(){
        if(this.isAunt){

        }
      },
      rReserve:function () {
        if(this.rReserve){

        }
      },
      $route(to, from){
        console.log(from);
        console.log(to);
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      SearchBar,
      ServiceType,
      HeadView,
      NoStaff
    },
    methods: {
      fetchData(){
        this.$store.dispatch('hideHeader')
        let _this=this;
        if(this.sort&&this.page==1){
          _this.auntsList=[];
          _this.nomore=false;
        }
        console.log("page:"+_this.page)
        if(_this.totalPage<this.page&&_this.totalPage){
          if(_this.page>1){
            _this.nomore=true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.getReserveStaffList,
          type: "post",
          data: {
            pageNumber: _this.page,
            pageSize: _this.$cm.pageSize,
            orderNo:_this.orderNo,
            serviceItemCode:_this.code,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
            staffNo:_this.staffNo,
            staffName:_this.staffName,
            experience:_this.experience
          },
          headers: _this.params,
          dataType: "json",
          success: function success(data) {
            if(data.success){
               var dataJD=data.jsonData;
              _this.totalPage=dataJD.total;
              _this.page=dataJD.page;
              var auntsList=[];
              if(_this.page==1){
                auntsList=auntsList.concat(dataJD.rows);
                _this.auntsList =auntsList;
              }else {
                _this.auntsList=_this.auntsList.concat(dataJD.rows)
              }
              if(_this.auntsList==""){
                _this.noStaff=true;
              }else {
                _this.noStaff=false;
              }
              console.log(data.msg);
              _this.sw=true;
              _this.sort=false;
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
        if(_this.$cm.isEmpty(staffId)){
          this.$vux.toast.text('请选择家政员')
          return;
        }
        $.ajax({
          url: window.global_config.updateStaff,
          type: "get",
          headers: _this.params,
          data: {staffId:staffId,orderNo:_this.orderNo},
          dataType: "json",
          async:false,
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                var dataBD={

                };
                var dataJD=data.jsonData.jobInfo;
//                _this.$emit('update:isAunt', false)
//                _this.$emit('getAuntInfo', dataBD,dataJD,_this.picked)
                _this.$router.go(-1);
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
          this.experience = $("#sortExperience p.service-on").data("code");
          this.sort=true;
          this.picked="";
          this.page=1;
          this.totalPage="";
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
          this.sort=true;
          this.page=1;
          this.totalPage="";
          this.picked="";
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
//        this.$emit('update:isAunt', false)
      },
      handleScroll () {
        // 判断是否滚动到底部
        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        if(this.path.indexOf("reserveAunt")!=-1){
          if(a<30&&a>=0){
            if(this.sw){
              this.sw=false;
              this.page++;
              this.fetchData();
            }
          }
        }
      },
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    props:["isAunt","code",'rReserve']
  }
</script>
