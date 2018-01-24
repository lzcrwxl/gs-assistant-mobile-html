<template>
  <div class="btn-wrapper mt60">
    <button class="btn-block btn-fill">{{btn}}</button>
    <!--<button class="btn-bottom btn-white">{{btnlf}}</button>-->
    <!--<button class="btn-bottom btn-fill">{{btnrt}}</button>-->
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
  export default{
    props:['btnlf','btnrt','btn']
  }
</script>
