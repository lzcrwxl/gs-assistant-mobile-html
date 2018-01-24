<template>
  <div id="grapInprocess">
    <GrapLists :status="inprocess">
      <span class="r">待确认</span>
    </GrapLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import GrapLists from "@/components/Grap/grapLists.vue"
  export default{
    data(){
      return{
        inprocess:"inprocess"
      }
    },
    components: {
      GrapLists,
    },
  }
</script>
