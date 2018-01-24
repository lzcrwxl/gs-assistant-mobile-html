<template>
  <div id="grapCompleted">
    <GrapLists :status="cancelled"></GrapLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import GrapLists from "@/components/Grap/grapLists.vue"

  export default{
    data(){
      return{
        cancelled:"cancelled"
      }
    },
    components: {
      GrapLists,
    },
  }
</script>
