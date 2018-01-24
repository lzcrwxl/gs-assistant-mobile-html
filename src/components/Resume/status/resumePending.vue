<template>
  <div id="resumePending">
    <div class="mask" @touchmove.prevent v-show="isLayer"></div>
    <div class="layer" id="reasonTips" v-show="isLayer">
      <h1>拒绝理由</h1>
      <div class="reasonLists">
        <label>
          <input type="radio" class="rdoDot" name="reason"  value="0" >该家政员不合适，下次合作
        </label>
        <label>
          <input type="radio" class="rdoDot" name="reason" value="1" >刚找到匹配的家政员，下次合作
        </label>
        <label>
          <input type="radio" class="rdoDot" name="reason"  value="2">其他
        </label>
        <label>
          <input type="text" class="customReason" placeholder="不超过20个字" maxlength="20" v-model="remarks">
        </label>
      </div>
      <div class="button_box mt30">
        <button class="btn-fill cancel" @click="cancel">取消</button>
        <button class="btn-default submit" @click="refuse">提交</button>
      </div>
    </div>
    <HeadView></HeadView>
    <div class="resumeCtn">
      <DetailTemplate :jItems="jItems">
          <span class="grapProgress">
              待处理
          </span>
      </DetailTemplate>
      <!--<div class="auntBox">
        <h4>投递的家政员</h4>
        <AuntTemplate></AuntTemplate>
        <div class="aunt-bar">
          &lt;!&ndash;<hr>&ndash;&gt;
          <hr>
          <span class="percentage">
            匹配度  <em>75%</em>
          </span>
          <span class="r f24 barTxt">完善家政员信息可以提高匹配度</span>
        </div>
      </div>-->
      <AuntBoxTemplate :jItems="jItems" :staffInfo="staffInfo" :match="match" :orderNo="orderNo"></AuntBoxTemplate>
      <div class="auntFooter btn-wrapper">
        <router-link :to="{name:'order',params:{orderId:1},query:{orderNo:orderNo}}" class="btn-smer btn-grey">原始订单</router-link>
        <div>
          <button class="btn-smer btn-white mr15" @click="isLayer=true">拒绝</button>
          <button class="btn-smer btn-fill" @click="pass" :disabled="noClickAble" :class="{'noClick':noClickAble}">通过</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";
  .auntBox{
    margin-bottom: 2rem;
  }
  #reasonTips{
    padding:0 .44rem;
    h1{
      padding:.6rem 0 .3rem 0;
      color: #4d4d4d;
      font-size: .30rem;
    }
    .reasonLists{
      font-size: .26rem;
      color: #a8a8a8;
      label{
        display: block;
        line-height: .7rem;
        overflow: hidden;
      }
      .customReason{
        width: 100%;
        height: .54rem;
        border-radius: .08rem;
        border: 1px solid #d6d6d6;
        padding:0 .2rem;
        margin-left: .6rem;
        width: 4.64rem;
      }
      .rdoDot{
        margin-right: .3rem;
      }
    }
  }
  .cancel{
    margin-right: .4rem;
  }
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
</style>
<script>
  import HeadView from "components/Header/headView"
  import DetailTemplate from 'components/template/detailCtnTemplate'
  import AuntTemplate from 'components/template/auntPannelTemplate'
  import AuntBoxTemplate from 'components/template/auntBoxTemplate'
  export default{
    data(){
      return{
        isLayer:false,
        jItems: {},
        staffInfo:{},
        jobInfo:{},
        match:"",
        resumeId:"",
        jobId:"",
        remarks:"",
        staffId:"",
        orderNo:"",
        picked:"",
        noClickAble:false,
      }
    },
    components: {
      HeadView,
      DetailTemplate,
      AuntTemplate,
      AuntBoxTemplate,

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
      cancel(){
        this.isLayer=false;
      },
      fetchData () {

        let _this=this;
        let resumeId = this.$route.params.resumeId;
        this.resumeId = this.$route.params.resumeId;
        this.staffId = this.$route.params.staffId;
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
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.match=dataJD.match;
            _this.jItems = dataJD.jobInfo;
            _this.jobId=dataJD.jobId;
            _this.orderNo=dataJD.orderNo;
            _this.staffInfo = dataJD.staffInfo;
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
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
                _this.jobId=dataJD.jobId;
                _this.orderNo=dataJD.orderNo;
                _this.staffInfo = dataJD.staffInfo;
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
      },
      pass(){
        let _this=this;
        _this.noClickAble=true;
        $.ajax({
          url: window.publicPath+"/api/job/"+_this.jobId+"/resume/"+_this.resumeId,
          type: "post",
          headers: _this.$cm.params,
          data: JSON.stringify({
            status:"2"
          }),
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
//                _this.$vux.toast.text("已通过")
                _this.$vux.toast.show({
                  text: '已通过',
                  onShow () {
                    console.log('Plugin: I\'m showing')
                  },
                  onHide () {
                    _this.noClickAble=false;
                    _this.$router.push({ name: 'interview', params: {resumeId:_this.resumeId,staffId:_this.staffId}})
                  }
                })
                /*setTimeout(function(){
                  _this.$router.push({ name: 'interview', params: {resumeId:_this.resumeId,staffId:_this.staffId}})
                },2100);*/
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      refuse(){
        let _this=this;
        var remarks="";
        if($("input[name='reason']:checked").length<1){
          _this.$vux.toast.text("请选择拒绝理由")
          return;
        }else if($("input[name='reason']:checked").val()==2 && $(".customReason").val().trim()==""){
          _this.$vux.toast.text("请填写拒绝理由")
          return;
        }

        if($("input[name='reason']:checked").val()==0 ||$("input[name='reason']:checked").val()==1){
          remarks = $("input[name='reason']:checked").parent().text();
        }else if($("input[name='reason']:checked").val()==2){
          remarks = $(".customReason").val();
        }
        console.log(remarks);

        $.ajax({
          url: window.publicPath+"/api/job/"+_this.jobId+"/resume/"+_this.resumeId,
          type: "post",
          headers:_this.$cm.params,
          data: JSON.stringify({
            status:"3",
            remarks:remarks
          }),
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                _this.$router.push({ name: 'refused', params: {resumeId:_this.resumeId,staffId:_this.staffId}})
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      }
    }
  }
</script>
