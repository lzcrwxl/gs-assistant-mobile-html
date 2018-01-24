<template>
  <div id="grapAvailable">
    <GrapLists :status="available">
      <span class="grapTxt">已有 <em>0</em> 人抢单</span>
    </GrapLists>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .grapTxt{
    float: right;
    color: #51a2fe;
  }
</style>
<script>
  import GrapLists from "@/components/Grap/grapLists.vue"

  export default{
    data(){
      return{
        available:"available"
      }
    },
    components: {
      GrapLists,
    },
  }
</script>
