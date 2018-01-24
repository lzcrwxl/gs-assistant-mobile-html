<template>
  <div id="aunt">
    <div v-if="$route.meta.showAunts">
      <div class="mask" @touchmove.prevent v-show="idCardShow"></div>
      <div class="layer" v-show="idCardShow" id="idCardTips" @touchmove.prevent>
        <p class="mb30">请登录PC端使用身份证读卡器进行添加</p>
        <div class="button_box mb15">
          <button class="btn-white" @click="idCardShow=false">我知道了</button>
        </div>
      </div>
      <div>
        <header>
          <h3>
            <a href="javascript:history.back();" class="back"></a>
            家政员列表
            <a @click="idCardShow=true ">添加家政员</a>
          </h3>
          <div class="search-bar">
            <input type="text" maxlength="40" placeholder="搜索（家政员姓名、编号）" class="search" @keyup="search" v-model="searchTxt">
          </div>
          <ServiceType :opts="opts" :eduData="eduData" :nativeData="nativeData" :ageRange="ageRange" :zodic='zodiacs'
                       @sortJob="sortAunt" @clearSort="clearSort"></ServiceType>
        </header>
        <section>
          <ul class="aunt-lists" v-show="!noStaff">
            <router-link class="aunt-item" :to="{name:'detailInfo',params:{staffId:item.staffId}}" tag="li"
                         v-for="(item,index) in auntsList" :key="index">
              <img src="../../assets/img/icons/soldout.png" alt="" class="sold-out" v-show="item.onOffShelf=='下架'">
              <img :src="item.headImage" alt="" class="photo">
              <div class="dib aunt-info">
                <h4 class="mt10">{{item.staffName}} <span class="ml30 f26">{{item.serviceItems}}</span></h4>
                <p class="aunt-detail"><span>{{item.age}}岁 </span>| <span>属{{item.zodiac}} </span>| <span>{{item.nativePlace}}人 </span>|
                  <span>{{item.constellation}} </span>| <span>{{item.education}}</span>
                </p>
                <div class="aunt-price"><em>￥</em>{{item.servicePrice}} <span class="unit f20">{{item.unitValue}}</span>
                </div>
              </div>
            </router-link>
          </ul>
          <load-more :show-loading="false" v-show="nomore" tip="我是有底线的" background-color="transparent"></load-more>
          <div class="noStaff" v-show="noStaff">
            暂无内容~
          </div>
        </section>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/aunt";

  #idCardTips {
    p {
      background: url("../../assets/img/idCard.png") no-repeat center;
      background-size: 1.67rem 1.39rem;
      padding-top: 2.26rem;
    }
    text-align: center;
    font-size: .26rem;
    color: #a8a8a8;
  }
</style>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import ServiceType from "../template/serviceType"
  import {LoadMore} from 'vux'

  export default{
    data(){
      return {
        opts: [
          {name: '工种', href: "#sortService", isChecked: false},
          {name: '学历', href: "#sortEducation", isChecked: false},
          {name: "籍贯", href: "#sortNative", isChecked: false},
          {name: "更多", href: "#sortMore", isChecked: false},
        ],
        idCardShow: false,
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
        searchTxt:"",
        staffNo:"",
        noStaff:false,
        staffName:"",
        sort:false,
        totalPage:"",
        path:"",
        page:1,
        sw:true,
        pageSize:5,
        nomore:false,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    computed: mapState({
      headerShow: state => state.headerShow
    }),
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    created () {
      this.$cm.shareWechat();
      this.path=this.$route.name;
      this.fetchData();
      this.eduData = this.$cm.getEudcationData();
      this.nativeData = this.$cm.getNativePlace();
      this.ageRange = this.$cm.getAgeRange();
      this.zodiacs = this.$cm.getZodic();
    },
    watch:{
      $route(to,from){
        let path = this.$route.path;
        console.log(from);
        console.log(this.$route.name)
      }
    },
   /* beforeRouteEnter (to, from, next) {
//      console.log(from);
    },*/
    methods: {
      fetchData(){
        this.quertStaff();
      },
      quertStaff(){
        let _this = this;
        if(this.sort&&this.page==1){
          _this.auntsList=[];
          _this.nomore=false;
        }
        if(_this.totalPage<this.page&&_this.totalPage){
          if(_this.page>1){
            console.log(_this.page)
            _this.nomore=true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.queryStaff,
          type: "get",
          headers: _this.params,
          data: {
            pageNumber: _this.page,
            pageSize: _this.pageSize,
            serviceItemCode: _this.serviceType,
            education: _this.education,
            nativePlace: _this.nativePlace,
            age: _this.age,
            zodiac: _this.zodiac,
            onOffShelf: _this.state,
            staffNo:_this.staffNo,
            staffName:_this.staffName
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              let dataJD = data.jsonData;
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
              _this.sw=true;
              _this.sort=false;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      sortAunt(opts){
        this.$nextTick(() => {
          this.opts = opts;
          if ($("#sortAge ul li.mf-on").length > 0) {
            this.age = $("#sortAge ul li.mf-on").data("code");
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
          this.sort=true;
          this.page=1;
          this.totalPage="";
          this.quertStaff();
        })
      },
//      清除搜索结果
      clearSort(){
        this.$nextTick(() => {
          this.opts=[
            {name: '工种', href: "#sortService", isChecked: false},
            {name: '学历', href: "#sortEducation", isChecked: false},
            {name: "籍贯", href: "#sortNative", isChecked: false},
            {name: "更多", href: "#sortMore", isChecked: false},
          ],
          this.age = "";
          this.zodiac = "";
          console.log(this.zodiac);
          this.state = "";
          this.serviceType = "";
          this.education = "";
          this.nativePlace = "";
          this.sort=true;
          this.page=1;
          this.totalPage="";
          this.quertStaff();
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
        this.sort=true;
        this.page=1;
        this.totalPage="";
        this.quertStaff();
      },
      handleScroll () {
        // 判断是否滚动到底部
        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        this.$nextTick(()=>{
          if(this.path.indexOf("aunt")!=-1){
            if(a<30&&a>=0){
              if(this.sw){
                this.sw=false;
                this.page++;
                this.quertStaff();
              }
            }
          }
        })
      },
    },
    components: {
      ServiceType,
      LoadMore
    },

  }
</script>
