<template>
  <div id="interview">
    <HeadView></HeadView>
    <div class="resumeCtn">
      <DetailTemplate :jItems="jItems">
          <span class="grapProgress">
              待面试
          </span>
      </DetailTemplate>
      <AuntBoxTemplate :jItems="jItems" :staffInfo="staffInfo" :match="match" :orderNo="orderNo"></AuntBoxTemplate>
      <SourceTemplate :sourceInfo="sourceInfo"></SourceTemplate>
      <AuntFooter :sourceInfo="sourceInfo" ></AuntFooter>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .auntSource{
    margin: .24rem 0;
    padding:0 .3rem;
    font-size: .3rem;
    background: #ffffff;
    h6{
      height: .88rem;
      line-height: .88rem;
      color: #0080ff;
      border-bottom:1px solid #efeff4;
    }
    p{
      color: #888;
      padding:.3rem 0;
    }
  }
  .cancelBox{
    .auntSource;
    h6{
      color: #333;
    }
  }
</style>
<script>
  import HeadView from "components/Header/headView"
  import DetailTemplate from 'components/template/detailCtnTemplate'
  import AuntBoxTemplate from 'components/template/auntBoxTemplate'
  import SourceTemplate from 'components/template/auntSourceTemplate'
  import AuntFooter from 'components/template/auntFooterTemplate'

  export default{
    components: {
      HeadView,
      DetailTemplate,
      AuntBoxTemplate,
      SourceTemplate,
      AuntFooter
    },
    data(){
      return{
        sourceInfo:{},
        jItems: {},
        staffInfo:{},
        jobInfo:{},
        match:"",
        orderNo:""
      }
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
    methods:{
      fetchData () {
        let _this=this;
        let resumeId = this.$route.params.resumeId;
        console.log(resumeId)
        _this.resumeDetailData(resumeId);
      },
//      简历详情
      resumeDetailData(resumeId){
        let _this=this;
        var req = {
          url: window.global_config.resumeDetail + "/" + resumeId,
          methods: 'get',
          headers: _this.$cm.params
        }
        $.ajax({
          url: window.global_config.resumeDetail + "/" + resumeId,
          type: "get",
          headers: _this.$cm.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                let dataJD = data.jsonData;
                _this.orderNo=dataJD.orderNo
                _this.match=dataJD.match;
                _this.jItems = dataJD.jobInfo;
                _this.staffInfo = dataJD.staffInfo;
                var mobile="tel:"+dataJD.contactPhone;
                var contactName=dataJD.contactName.substr(0,1)+"老师"
                _this.sourceInfo = {
                  resumeTenantName:dataJD.resumeTenantName,
                  contactName:contactName,
                  contactPhone:dataJD.contactPhone,
                  remarks:dataJD.remarks,
                  mobile:mobile,
                  orderStatus:dataJD.jobInfo.orderStatus,
                  orderNo:dataJD.orderNo
                };
                console.log(dataJD)
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.match=dataJD.match;
            _this.jItems = dataJD.jobInfo;
            _this.staffInfo = dataJD.staffInfo;
            var mobile="tel:"+dataJD.contactPhone;
            var contactName=dataJD.contactName.substr(0,1)+"老师"
            _this.sourceInfo = {
              resumeTenantName:dataJD.resumeTenantName,
              contactName:contactName,
              contactPhone:dataJD.contactPhone,
              remarks:dataJD.remarks,
              mobile:mobile,
              orderStatus:dataJD.jobInfo.orderStatus,
              orderNo:dataJD.orderNo
            };
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
      }
    }
  }
</script>
