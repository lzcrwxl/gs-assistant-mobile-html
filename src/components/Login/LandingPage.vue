<template>
  <div id="landingPage" :style="note">
    <router-link to="/login" class="btn-bigger btn-fill btnLink">启用我的帮手</router-link>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  #landingPage{
    position: relative;
    background-image: url("../../assets/img/landingPage.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 24.57rem;
    width: 100%;
    .btnLink{
      position: absolute;
      bottom:.4rem;
      left:.3rem;
      font-size: .48rem;
    }
  }
</style>
<script>
  import wx from 'weixin-js-sdk';

  export default{
    name:"landPage",
    data(){
      return{
        note: {
          backgroundImage: "url(" + require("../../assets/img/landingPage.png") + ")",
          backgroundRepeat: "no-repeat",
        },
      }
    },
    created(){
      this.$cm.shareWechat();
      var token=localStorage.getItem('token');
      var uid=localStorage.getItem('uid');
      if(this.$cm.isEmpty(token)){
        this.$cm.auth()
      }else if (!this.$cm.isEmpty(uid)){
        this.$router.push('home')
      }
//      this.shareWechat();
    },
    methods:{
    }
  }
</script>
