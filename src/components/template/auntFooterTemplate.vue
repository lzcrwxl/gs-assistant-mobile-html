<template>
  <div class="auntFooter">
    <router-link :to="href" class="btn-smer btn-grey">原始订单</router-link>
    <a :href="sourceInfo.mobile" class="btn-smer btn-fill mobileBtn" v-if="sourceInfo.status!=3"><span>{{sourceInfo.contactName}}</span></a>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .auntFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .24rem;
    height: .98rem;
    padding: 0 .3rem;
    background: #ffffff;
    border-top: 1px solid #d7d7d7;
  }
</style>
<script>
  export default{
    data(){
      return {
        orderStatus:""
      }
    },
    computed: {
      href: function () {
        var orderStatus=this.sourceInfo.orderStatus;
        var orderNo=this.sourceInfo.orderNo;
        console.log(this.sourceInfo)
        var href = "";
        if(orderStatus=='01'||orderStatus=='02'||orderStatus=='03'||orderStatus=='06'){
          href={name:'order',params:{orderId:1},query:{orderNo:orderNo}}
        }else if(orderStatus=='04'){
          href={name:'order',params:{orderId:2},query:{orderNo:orderNo}}
        }else if(orderStatus=='05'){
          href={name:'order',params:{orderId:3},query:{orderNo:orderNo}}
        }
        return href;
      }
    },
    props:['sourceInfo']
  }
</script>
