<template>
  <div id="jobs">
    <div v-show="$route.meta.isJobLists">
      <Layer :isRefresh.sync="isRefresh" :count="count"></Layer>
      <header>
        <h3>
          <!--跳转客户端页面-->
          <a :href="link" class="my-release">我的发布</a>
          职位发布
          <button @click="refreshJobs"></button>
        </h3>
        <div class="banner-wrapper">
          <img src="../../assets/img/banner.png" alt="">
        </div>
        <!--<ServiceType :opts="opts"></ServiceType>-->
      </header>
      <section>
        <JobLists @getIds="getIds" @toUrl="toUrl"></JobLists>
      </section>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/jobs";

  .tab-filter {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: .16rem .3rem;
    select {
      width: 1.6rem;
      height: .56rem;
      //appearance:none;
      //-moz-appearance:none;
      //-webkit-appearance:none;
      border: none;
      border-radius: .12rem;
      line-height: .56rem;
      padding-left: .16rem;
      font-size: .26rem;
      color: #4c4c4c;
      option {
        font-size: .26rem;
        color: #4c4c4c;
      }
      background-position: 1.3rem center;
    }
  }
</style>
<script>
  import Layer from "../template/layerTemplate.vue"
  import ServiceType from "../template/serviceType.vue"
  import JobLists from "components/template/jobLists"
  export default{
    data(){
      return {
        opts:[
          {name:'服务工种',href:"#sortService",isChecked:false},
          {name:'业务员',href:"#sortStaff",isChecked:false},
          {name:"是否上架",href:"#sortStatus",isChecked:false},
          {name:"刷新日期",href:"#sortDate",isChecked:false},
        ],
        strId:"",
        isRefresh:false,
        count:"",
        link:"",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    components: {
      ServiceType,
      JobLists,
      Layer
    },
    created () {
      this.$cm.shareWechat();
    },
    methods:{
      refreshJobs(){
        let _this=this;
        $.ajax({
          url:window.global_config.refresh,
          type: "post",
          headers: _this.params,
          data: {
            jobIds:_this.strId
          },
          dataType: "json",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                _this.isRefresh=true;
                _this.count=data.jsonData;
                console.log(data.msg);
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code);
              console.log(data.msg);
            }
          }
        });
      },
      getIds:function (ids) {
        this.strId=ids;
      },
      toUrl(url){
        this.link=url;
      }
    }
  }
</script>
