<template>
  <div id="cancelled">
    <OrderLists :route="cancelled"></OrderLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import OrderLists from "@/components/Order/lists/orderLists.vue"
  export default{
    data(){
      return{
        cancelled:"cancelled"
      }
    },
    components: {
      OrderLists,
    },
  }
</script>
