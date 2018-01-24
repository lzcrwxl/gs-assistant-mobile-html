<template>
  <div id="new-orders">
    <OrderLists :route="orderDetail"></OrderLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import OrderLists from "@/components/Order/lists/orderLists.vue"
  export default{
    data(){
      return{
        orderDetail:"detail"
      }
    },
    components: {
      OrderLists,
    },
  }
</script>
