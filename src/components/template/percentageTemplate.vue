<template>
  <div class="aunt-bar">
    <hr>
    <span class="percentage">
            匹配度  <em>75%</em>
          </span>
    <span class="r f24 barTxt">完善家政员信息可以提高匹配度</span>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .aunt-bar {
    position: relative;
    height: .88rem;
    line-height: .88rem;
    margin: 0 .3rem;
    border-top: 3px solid #e5e5e5;
    .percentage {
      font-size: .26rem;
      color: #888;
    }
    .barTxt {
      color: #d6d6d6;
    }
  }
  hr {
    width: 75%;
    position: absolute;
    top: -3px;
    left: 0;
    height: 3px;
    border-radius: 1.5px;
    border: none;
    background: #3e9dfc;
    border-top: 3px solid #3e9dfc;
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
  }
</script>
