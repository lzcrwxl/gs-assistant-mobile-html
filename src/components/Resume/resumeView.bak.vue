<template>
  <div id="resumeBox">
    <!--<div class="mask"></div>-->
    <div v-if="$route.meta.isResumeLists">
      <HeadView></HeadView>
      <section>
        <div class="search-bar">
          <input type="text" maxlength="40" placeholder="订单编号" class="search" @keyup="search" v-model="orderNo">
        </div>
        <ServiceType :opts="opt" :eduData="eduData" :ageRange="ageRange"  @sortJob="sortAunt"></ServiceType>
        <ul class="aunt-lists">
          <router-link class="aunt-item" :to="{name:item.link,params:{resumeId:item.id,staffId:item.resumeTenantStaffId}}" tag="li" v-for="(item,index) in resumeList" :key="index" v-show="!noStaff">
            <img :src="item.staffInfo.headImage" alt="" class="photo">
            <div class="dib aunt-info">
              <h4 class="mt10">{{item.staffInfo.staffName}}<span class="ml30 f26">{{item.staffInfo.serviceTypeValue}}</span></h4>
              <span class="auntStatus" :class="{'pending':item.status==1}">
              {{item.status|status}}
            </span>
              <p class="aunt-detail"><span>{{item.staffInfo.age}}岁 </span>| <span>属{{item.staffInfo.zodiacValue}} </span>| <span>{{item.staffInfo.nativePlaceValue}}人 </span>| <span>{{item.staffInfo.constellationValue}} </span>| <span>{{item.staffInfo.educationValue}}</span>
              </p>
              <div class="aunt-price"><em>￥</em>{{item.staffInfo.price}} <span class="unit f20">{{item.staffInfo.unitValue}} </span></div>
            </div>
          </router-link>
          <!--<router-link class="aunt-item" :to="{name:'intCompleted'}" tag="li">
            <img src="../../assets/img/photo.png" alt="" class="photo">
            <div class="dib aunt-info">
              <h4 class="mt10">张晓丽 <span class="ml30 f26">月嫂</span></h4>
              <span class="auntStatus">
              已处理
            </span>
              <p class="aunt-detail"><span>30岁 </span>| <span>属羊 </span>| <span>黑龙江人 </span>| <span>处女座 </span>| <span>本科及以上</span>
              </p>
              <div class="aunt-price"><em>￥</em>10,888 <span class="unit f20">元/26天</span></div>
            </div>
          </router-link>
          <router-link class="aunt-item" :to="{name:'intCancelled'}" tag="li">
            <img src="../../assets/img/photo.png" alt="" class="photo">
            <div class="dib aunt-info">
              <h4 class="mt10">张晓丽 <span class="ml30 f26">月嫂</span></h4>
              <span class="auntStatus">
              已取消
            </span>
              <p class="aunt-detail"><span>30岁 </span>| <span>属羊 </span>| <span>黑龙江人 </span>| <span>处女座 </span>| <span>本科及以上</span>
              </p>
              <div class="aunt-price"><em>￥</em>10,888 <span class="unit f20">元/26天</span></div>
            </div>
          </router-link>
          <router-link class="aunt-item" :to="{name:'interview'}" tag="li">
            <img src="../../assets/img/photo.png" alt="" class="photo">
            <div class="dib aunt-info">
              <h4 class="mt10">张晓丽 <span class="ml30 f26">月嫂</span></h4>
              <span class="auntStatus">
              待面试
            </span>
              <p class="aunt-detail"><span>30岁 </span>| <span>属羊 </span>| <span>黑龙江人 </span>| <span>处女座 </span>| <span>本科及以上</span>
              </p>
              <div class="aunt-price"><em>￥</em>10,888 <span class="unit f20">元/26天</span></div>
            </div>
          </router-link>
          <router-link class="aunt-item" :to="{name:'refused'}" tag="li">
            <img src="../../assets/img/photo.png" alt="" class="photo">
            <div class="dib aunt-info">
              <h4 class="mt10">张晓丽 <span class="ml30 f26">月嫂</span></h4>
              <span class="auntStatus">
              已拒绝
            </span>
              <p class="aunt-detail"><span>30岁 </span>| <span>属羊 </span>| <span>黑龙江人 </span>| <span>处女座 </span>| <span>本科及以上</span>
              </p>
              <div class="aunt-price"><em>￥</em>10,888 <span class="unit f20">元/26天</span></div>
            </div>
          </router-link>-->
        </ul>
        <load-more :show-loading="false" v-show="nomore" tip="我是有底线的" background-color="transparent"></load-more>
        <div class="noStaff" v-show="noStaff">
          暂无内容~
        </div>
      </section>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/aunt";

</style>
<script>
  import HeadView from "@/components/Header/headView"
  import {mapGetters, mapActions, mapState} from 'vuex'
  import ServiceType from "../template/serviceType"
  import {LoadMore} from 'vux'

  export default{
    data(){
      return {
        opt: [
          {name: '工种', href: "#sortService",isChecked: false},
          {name: '状态', href: "#sortRStatusAll",isChecked: false},
          {name: "年龄", href: "#sortAgeRange",isChecked: false},
          {name: "学历", href: "#sortEducation",isChecked: false},
        ],
        resumeList:[],
        eduData:[],
        ageRange:[],
        isBox:true,
        noStaff:false,
        serviceType:"",
        age:"",
        status:"",
        education:"",
        searchTxt:"",
        orderNo:"",
        sw:true,
        page:1,
        totalPage:"",
        sort:false,
        nomore:false
      }
    },
    components: {
      HeadView,
      ServiceType,
      LoadMore
    },
    created(){
      this.$cm.shareWechat();
      this.fetchData();
      this.eduData = this.$cm.getEudcationData();
      this.ageRange = this.$cm.getAgeRange();
    },
    watch: {
      $route(to, from){
        this.page=1;
        this.totalPage="";
        this.resumeList=[];
        console.log(from)
        this.fetchData()
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      fetchData(){
        let _this = this;
        console.log(_this.totalPage)
        console.log(_this.page);
        if(this.sort&&this.page==1){
          _this.resumeList=[];
          _this.nomore=false;
        }
        if(_this.totalPage<=this.page&&_this.totalPage){
          if(_this.page>1){
            _this.nomore=true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.resume,
          type: "get",
          headers: _this.$cm.params,
          data: {
            page: _this.page,
            rowNum: _this.$cm.pageSize,
            status:_this.status,
            education:_this.education,
            serviceType:_this.serviceType,
            age:_this.age,
            orderNo:_this.orderNo
          },
          dataType: "json",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                var dataJD = data.jsonData;
                _this.totalPage=dataJD.total;
                _this.page=dataJD.page
                var resumeList=[];
                if(_this.page==1){
                  resumeList=resumeList.concat(dataJD.rows);
                  _this.resumeList =resumeList;
                }else {
                  _this.resumeList=_this.resumeList.concat(dataJD.rows)
                }
                if(_this.resumeList==""){
                  _this.noStaff=true;
                }else {
                  _this.noStaff=false;
                  for(var idx in _this.resumeList){
                    var staffInfo=_this.resumeList[idx].staffInfo;
                    let status=_this.resumeList[idx].status;
                    if(status==1){
                      _this.resumeList[idx].link="pending";
                    }else if (status==2){
                      _this.resumeList[idx].link="interview";
                    }else if(status==3){
                      _this.resumeList[idx].link="refused";
                    }else if(status==4){
                      _this.resumeList[idx].link="intCompleted";
                    }else if(status==5){
                      _this.resumeList[idx].link="intCancelled";
                    }
                    var name=staffInfo.staffName;
                    if(staffInfo.sex=="01"){
                      staffInfo.staffName=name.charAt(0)+"师傅";
                    }else if(staffInfo.sex=="02"){
                      staffInfo.staffName=name.charAt(0)+"阿姨";
                    }
                  }
                }
                _this.sw=true;
                _this.sort=false;
                console.log(data.msg);
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
      sortAunt(){
        this.$nextTick(() => {
          this.serviceType = $("#sortService p.service-on").data("code");
          this.education = $("#sortEducation p.service-on").data("code");
          this.age = $("#sortAgeRange p.service-on").data("code");
          this.status=$("#sortRStatusAll p.service-on").data("code");
          this.sort=true;
          this.page=1;
          this.totalPage="";
          this.fetchData();
        })
      },
//      搜索
      search(){
        var txt=this.searchTxt;
        var regTxt=/^[0-9]+$/;
        if(regTxt.test(txt)){
          this.orderNo=txt;
        }else {
          this.staffNo="";
        }
        this.fetchData();
      },
      handleScroll () {
        // 判断是否滚动到底部
        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        if(a<30&&a>=0){
          if(this.sw){
            this.sw=false;
            this.page++;
            this.fetchData();
          }
        }
      },
    },
  }
</script>
