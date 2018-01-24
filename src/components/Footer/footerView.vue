<template>
  <footer id="footer" v-if="$route.meta.footShow">
   <router-link to="/home" @click.native="homeSel" :class="[isHome?'homeActive':'home']">首页</router-link>
   <router-link :to="{name:'order', params: { orderId:1}}" @click.native="orderSel" :class="[isOrder?'orderActive':'order']">订单</router-link>
    <router-link to="/grap" @click.native="grapSel" :class="[isGrap?'grapActive':'grap']">抢单</router-link>
   <router-link to="/job" @click.native="jobSel" :class="[isJob?'jobActive':'job']">招聘</router-link>
  </footer>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
</style>
<script>
  export default{
    data(){
      return{
        isHome:true,
        isOrder:false,
        isJob:false,
        isGrap:false
      }
    },
    watch: {
      $route(to){
        let path = this.$route.path.substring(1);
//        console.log("path:"+path);
        this.showBotton(path);
//        this.footerChange(path);
//        this.headCtn(path)
//      this.getCourseName();
      }
    },
    methods:{
      homeSel:function () {
        this.isHome=true;
        this.isOrder=false;
        this.isJob=false;
        this.isGrap=false;
      },
      orderSel:function () {
        this.isHome=false;
        this.isOrder=true;
        this.isJob=false;
        this.isGrap=false;
      },
      jobSel:function () {
        this.isHome=false;
        this.isOrder=false;
        this.isJob=true;
        this.isGrap=false;
      },
      grapSel:function () {
        this.isHome=false;
        this.isOrder=false;
        this.isJob=false;
        this.isGrap=true;
      },
      showBotton(path){
        console.log(path)
        if (path.indexOf('home') !=-1) {
          this.homeSel();
        }
        if (path.indexOf('order') !=-1) {
          this.orderSel();
        }
        if (path.indexOf('job') !=-1) {
          this.jobSel();
        }
        if (path.indexOf('grap') !=-1) {
          this.grapSel();
        }
      }
    }
  }
</script>
