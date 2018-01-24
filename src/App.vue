<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <!-- <header>
       <div class="avatarBar">
         <div class="avatarWrapper fix mr30">
         </div>
         <div class="dib mt20">
           <h4 class="f34">张三</h4>
           <p class="f30 mt20">130 0000 0000</p>
         </div>
       </div>
       <div class="wechatshop-bar">
         <span class="f30 ml30 shop-name">家策家政（徐汇店）</span>
         <router-link to="" class="r"><span>我的微店</span></router-link>
       </div>
     </header>
     <section>
       <div class="container">
         <h3>我的订单</h3>
         <ul class="order-lists">
           <li class="order-item">
             <div class="num">0</div>
             <div class="order-status">新订单</div>
           </li>
           <li class="order-item">
             <div class="num">0</div>
             <div class="order-status">处理中</div>
           </li>
           <li class="order-item">
             <div class="no-online">暂未上线</div>
             <div class="order-status">需售后</div>
           </li>
         </ul>
       </div>
       <div class="container">
         <h3>更多功能</h3>
         <ul class="order-lists more-function">
           <li class="order-item">
             敬请期待...
           </li>
           <li class="order-item">
           </li>
           <li class="order-item">
           </li>
         </ul>
       </div>
     </section>-->
    <router-view></router-view>
    <div class="push"></div>
    <FooterView v-show="footerShow"></FooterView>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import FooterView from '@/components/Footer/footerView.vue'
  import {Loading} from 'vux'

  export default {
    name: 'app',
    computed: mapState({
      footerShow: state => state.footerShow,
      isLoading: state => state.isLoading
    }),
    /*  mounted(){
     let path = this.$route.path.substring(1);
     this.footerChange(path);
     },*/
    components: {
      FooterView,
      Loading
    },
    watch: {
      $route(to){
        let path = this.$route.path.substring(1);
        this.showHome(path);
        this.footerChange(path);
        this.hideHead(path);
        console.log(this.$route.meta)
        console.log(this.$route.name)
        console.log(this.$route.params.orderId)
//        this.headCtn(path)
//      this.getCourseName();
      }
    },
    mounted(){
      // select提示样式更改
      $("select").change(function(){
        if ($(this).val()=="") {
          $(this).addClass("grey_i");
        }else{
          $(this).removeClass("grey_i");
        }
      });
    },
    methods: {
      showHome(path){
        if (path.indexOf('home') != -1) {
//          console.log(path)
//          this.$store.dispatch('showHome')
        }
      },
      footerChange(path){
        console.log(path)
        if (path.indexOf('detailInfo') != -1 || path.indexOf('inprocess') != -1|| path.indexOf('modifyAunt') != -1||path.indexOf('detail') != -1||path.indexOf('login') != -1 ||path.indexOf('landPage') != -1 ) {
          this.$store.dispatch('hideFooter')
          console.log(path)
        } else {
          this.$store.dispatch('showFooter')
        }
      },
      hideHead(path){
        if (path.indexOf('detailInfo') != -1) {
          console.log(path);
          this.$store.dispatch('hideHeader', {name: '家政员详情',link:"/aunt/modifyAunt"},)
        } else if (path.indexOf('detail') != -1||path.indexOf("inprocess")!=-1) {
          this.$store.dispatch('hideHeader', {name: '订单详情'})
        } else if (path.indexOf('modifyAunt') != -1){
          this.$store.dispatch('hideHeader', {name: '编辑家政员信息',link:"/aunt/detailInfo",text:"保存"},)
        }else {
          this.$store.dispatch('showHeader')
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" scoped>
  /*@import "./assets/css/home";*/
</style>
