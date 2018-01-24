<template>
  <div id="header">
    <h3 :class="[noshadow ? 'noshadow' : '']">
      <a href="javascript:history.back();" class="back" v-if="$route.meta.isBack"></a>
      <button class="back" v-if="$route.meta.routeBack" @click="routeBack"></button>
      <button class="back" v-if="$route.meta.btnBack" @click="btnBack"></button>
      <!--返回简历列表页-->
      <router-link to="/resume" v-if="$route.meta.resumeBack" class="back"></router-link>
      <router-link to="/home" v-if="$route.meta.isBackHome" class="back"></router-link>
      <router-link to="/grap" v-if="$route.meta.pushBack" class="back"></router-link>
      <!--<router-link to="/grap" v-if="$route.meta.grapBack" class="back"></router-link>-->
      <button class="back" v-if="$route.meta.grapBack" @click="grapBack"></button>
      <button class="back" v-if="$route.meta.depositBack" @click="depositBack"></button>
      <!--{{$store.state.headerTitle}}-->
      {{$route.meta.cname}}
      <!--<router-link :to="headlink">{{headText}}</router-link>-->
      <router-link :to="{name:'modifyAunt',params:{staffId:staffId}}" v-if="$route.meta.modfyAunt" class="modify">修改信息</router-link>
      <router-link :to="{name:'modifyOrder',params:{orderNo:orderNo,status:status}}" v-if="modifyInfo" class="modify">修改信息</router-link>

      <router-link :to="{name:'rmDetails',params:{resumeId:resumeId,staffId:staffId}}" v-if="$route.meta.resumeDetailBack" class="back">
      </router-link>
      <!--<router-link to="/aunt/auntDetail">保存</router-link>-->
      <!--{{headlink}}-->
      <!--去推送-->
      <router-link to="/push" class="remind" v-if="$route.meta.isRemind">提醒</router-link>
    </h3>

    <!--回退弹出层-->
    <!--<div class="mask" @touchmove.prevent v-show="isLeaveShow" v-cloak></div>-->
    <!--<div class="layer confirm" id="cancelLayer" v-show="isLeaveShow" v-cloak>-->
      <!--<p class="mt50">-->
        <!--离开页面信息将不保存-->
      <!--</p>-->
      <!--<div class="button_box mt30">-->
        <!--<button class="btn-default mr30" @click="leave">离开</button>-->
        <!--<button class="btn-fill" @click="isLeaveShow=false">留下</button>-->
      <!--</div>-->
    <!--</div>-->
    <LayerTemplate :isLeaveShow.sync="isLeaveShow"></LayerTemplate>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  @blue:#0080ff;
  .remind{
    box-sizing: border-box;
    border-radius: .04rem;
    position: absolute;
    right: .3rem;
    top:.2rem;
    text-align: left;
    padding-left:.64rem;
    width: 1.4rem;
    height: .48rem;
    line-height: .48rem;
    border: 1px solid @blue;
    font-size: .26rem;
    color: @blue;
    background: url("../../assets/img/icons/bell.png") no-repeat;
    background-position: .25rem center;
    background-size:.26rem .27rem;
  }
  #header{
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
      .modify{
        position: absolute;
        right: .3rem;
        color: @blue;
        font-size: .3rem;
      }
    }
  }
  .noshadow{
    box-shadow: none!important;
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
</style>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import LayerTemplate from 'components/template/layerTemplate'
  import  {toggle} from 'components/mixins/toggle'
  export default{
    data(){
      return {
        isLeaveShow:false
      }
    },
    props: ['noshadow','modifyInfo','orderNo','staffId','status','resumeId'],
    computed: mapState({
      headlink: state => state.headerLink,
      headText: state => state.headerText,
    }),
    methods:{
      btnBack(){
        this.isLeaveShow=true;
      },
      depositBack(){
        this.$router.go(-2);
      },
      leave(){
        this.isLeaveShow=false;
        this.$router.push({name:'order',params:{orderId:1}})
      },
      routeBack(){
        var status=this.status;
        console.log(status)
        if(status=="01"||status=="02"||status=="03"||status=="06"){
          this.$router.push({name:'order',params:{orderId:1}})
        }else if(status=="04"){
          this.$router.push({name:'order',params:{orderId:2}})
        }else if(status=="05"){
          this.$router.push({name:'order',params:{orderId:3}})
        }else if(status==7){
          this.$router.push({name:'order',params:{orderId:0}})
        }
      },
      grapBack(){
        var status=this.status;
        console.log(status);
        if(status==35){
          this.$router.push({name:'grap',query:{grapNo:3}})
        }else if(status==4){
          this.$router.push({name:'grap',query:{grapNo:2}})
        }else if(status==6){
          this.$router.push({name:'grap',query:{grapNo:0}})
        }else if(status==12){
          this.$router.push({name:'grap',query:{grapNo:1}})
        }
      }
    },
    components:{
      LayerTemplate
    }
  }
</script>
