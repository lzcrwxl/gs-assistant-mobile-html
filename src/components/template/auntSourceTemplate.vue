<template>
  <div class="auntSource">
    <h6>家政员来源</h6>
    <p>{{sourceInfo.resumeTenantName}}，{{sourceInfo.contactName}}，{{sourceInfo.contactPhone}}</p>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .auntSource{
    margin: .24rem 0;
    padding:0 .3rem;
    font-size: .3rem;
    background: #ffffff;
    h6{
      height: .88rem;
      line-height: .88rem;
      color: #0080ff;
      border-bottom:1px solid #efeff4;
    }
    p{
      color: #888;
      padding:.3rem 0;
    }
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
    props:['sourceInfo']
  }
</script>
