<template>
  <div id="jobRelease">
    <HeadView></HeadView>
    <div class="jobReleaseContent">
      <DetailTemplate :jItems="jItems">

      </DetailTemplate>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import HeadView from "components/Header/headView"
  import DetailTemplate from 'components/template/detailCtnTemplate'
  export default{
    components: {
      HeadView,
      DetailTemplate
    },
    created () {
      this.$cm.shareWechat();
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    data(){
      return {
        jItems: {},
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    methods: {
      fetchData () {
        let _this = this;
        let jobId = this.$route.params.jobId;
        console.log(jobId)
        _this.jobDetailData(jobId);
      },
//      职位详情
      jobDetailData(jobId){
        let _this = this;
        var req = {
          url: window.global_config.jobsList + "/" + jobId,
          methods: 'get',
          headers: _this.$cm.params
        }
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.jItems = dataJD;
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.jobsList + "/" + jobId,
          type: "get",
          headers: _this.params,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              let dataJD = data.jsonData;
              _this.jItems = dataJD;
              console.log(dataJD)
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
    }
  }
</script>
