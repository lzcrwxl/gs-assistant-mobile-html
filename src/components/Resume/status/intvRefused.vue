<template>
  <div id="intvCompleted">
    <HeadView></HeadView>
    <div class="resumeCtn">
      <DetailTemplate :jItems="jItems">
          <span class="grapProgress">
              已拒绝
          </span>
      </DetailTemplate>
      <AuntBoxTemplate :jItems="jItems" :staffInfo="staffInfo" :match="match" :orderNo="orderNo"></AuntBoxTemplate>
      <div class="cancelBox">
        <h6>取消理由</h6>
        <p>{{sourceInfo.remarks}}</p>
      </div>
    <!--  <div class="auntFooter">
        <router-link to="" class="btn-smer btn-grey">原始订单</router-link>
        &lt;!&ndash;<button class="btn-smer btn-fill mobileBtn"><span>王老师</span></button>&ndash;&gt;
      </div>-->
      <AuntFooter :sourceInfo="sourceInfo"></AuntFooter>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";
  .auntFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .24rem;
    height: .98rem;
    padding: 0 .3rem;
    background: #ffffff;
    border-top: 1px solid #d7d7d7;
  }
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
//  import SourceTemplate from 'components/template/auntSourceTemplate'
//  import RefusedTemplate from 'components/template/auntRefusedTemplate'
  import AuntFooter from 'components/template/auntFooterTemplate'

  export default{
    components: {
      HeadView,
      DetailTemplate,
      AuntBoxTemplate,
//      SourceTemplate,
//      RefusedTemplate,
      AuntFooter
    },
    data(){
      return {
        jItems: {},
        sourceInfo:{},
        staffInfo:{},
        jobInfo:{},
        match:"",
        orderNo:""
      }
    },
    created () {
      this.$cm.shareWechat();
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        let _this=this;
        let resumeId = this.$route.params.resumeId;
        console.log(resumeId)
        _this.resumeDetailData(resumeId);
      },
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
                  orderNo:dataJD.orderNo,
                  status:3
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
              orderNo:dataJD.orderNo,
              status:3
            };
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
      }
    }
  }
</script>
