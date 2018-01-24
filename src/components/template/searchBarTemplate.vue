<template>
  <div class="search-bar">
    <input type="text" maxlength="40" placeholder="搜索（家政员姓名、编号）" class="search" @keyup="search"
           v-model="searchTxt">
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .search-bar{
    border-bottom: 1px solid #efeff4;
    height: .88rem;
    background: #ffffff;
    line-height: .88rem;
    text-align: center;
    .search{
      width: 6.9rem;
      height: .56rem;
      background: #efeff4;
      background-image: url("../../assets/img/icons/search.png");
      background-size: .31rem;
      background-repeat: no-repeat;
      background-position: .19rem center;
      font-size: .24rem;
      border-radius: .12rem;
      padding:0 .65rem;
      position: relative;
    }
  }
</style>
<script>
  export default{
    data(){
      return {
        searchTxt: "",
        staffNo:"",
        staffName:""
      }
    },
    methods:{
      //      搜索
      search(){
        var txt = this.searchTxt;
        var regTxt = /^[Ss0-9]+$/;
        if (regTxt.test(txt)) {
          this.staffNo = txt;
          this.staffName = "";
        } else {
          this.staffName = txt;
          this.staffNo = "";
        }
        var obj={
          name:this.staffName,
          id:this.staffNo
        }
        console.log(this.staffNo);
        this.$emit('search',obj)
      }
    },
    props:[]
  }
</script>
