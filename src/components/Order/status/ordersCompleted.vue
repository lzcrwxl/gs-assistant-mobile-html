<template>
  <div id="completed">
    <OrderLists :route="complete"></OrderLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import OrderLists from "@/components/Order/lists/orderLists.vue"
  export default{
    data(){
      return{
        complete:"complete"
      }
    },
    components: {
      OrderLists,
    },
  }
</script>
