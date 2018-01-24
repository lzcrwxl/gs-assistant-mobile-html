<template>
  <div id="inProcess">
    <OrderLists :route="inprocess"></OrderLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import OrderLists from "@/components/Order/lists/orderLists.vue"
  export default{
    data(){
      return{
        inprocess:"inprocess"
      }
    },

    components: {
      OrderLists,
    },
    props:['lists']
  }
</script>
