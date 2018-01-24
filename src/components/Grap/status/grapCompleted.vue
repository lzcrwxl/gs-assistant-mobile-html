<template>
  <div id="grapCompleted">
    <GrapLists :status="completed"></GrapLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import GrapLists from "@/components/Grap/grapLists.vue"


  export default{
    data(){
      return{
        completed:"completed"
      }
    },
    components: {
      GrapLists,
    },
  }
</script>
