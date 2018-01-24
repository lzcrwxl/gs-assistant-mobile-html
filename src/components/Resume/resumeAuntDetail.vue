<template>
  <div id="auntResume">
    <HeadView :resumeId="resumeId" :staffId="staffId"></HeadView>
    <AuntDetailTemplate></AuntDetailTemplate>
    <router-link :to="{name:'rmDetails',params:{resumeId:resumeId,staffId:staffId}}" class="return">
      返回简历详情
    </router-link>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .return{
    border-top:1px solid #e5e5e5;
    position: fixed;
    bottom:0;
    width: 100%;
    display: block;
    text-align: center;
    height: .96rem;
    line-height: .96rem;
    background: #f7f7fa;
    font-size: .34rem;
    color: #4d4d4d;
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import AuntDetailTemplate from "@/components/template/auntDetailTemplate"
  import { querystring } from 'vux'

  export default{
    data(){
      return {
        staffId:"",
        resumeId:"",
      }
    },
    created(){
      var url=window.location.href.split("?")[1];
      var url01=window.location.href.split("?")[0];
      var result=querystring.parse(url);
      var resumeId=result.resumeId;
      this.staffId = this.$route.params.staffId;
      this.resumeId= this.$route.query.resumeId||resumeId;
      console.log(url01)
      console.log(result)
      this.$cm.shareWechat();
    },
    components: {
      HeadView,
      AuntDetailTemplate
    }
  }
</script>
