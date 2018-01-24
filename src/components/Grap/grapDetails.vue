<template>
  <div id="grapDetails">
    <LayerTemplate :isBalanceShow.sync="isBalanceShow" :deposit="resumeDeposit" :num="num"></LayerTemplate>
    <div class="grapContainer">
      <!--<div class="grapHeader">
        <div class="headTop">
          <h4>
            <span class="f30 mr30">
            正在寻找
            </span>育儿嫂 - 住家
          </h4>
          <span class="grapProgress">
              {{processTxt}}
            </span>
        </div>
        <ul class="headBottom">
          <li class="bottomInfo">
            <p>20分钟前</p>
            <p class="lin02">发布时间</p>
          </li>
          <li class="bottomInfo">
            <p>5000元/月</p>
            <p class="lin02">价格预算</p>
          </li>
          <li class="bottomInfo">
            <p>29-39岁</p>
            <p class="lin02">年龄要求</p>
          </li>
        </ul>
      </div>-->
      <DetailTemplate :jItems="jItems">
          <span class="grapProgress">
              {{dataJD.status|status}}
          </span>
      </DetailTemplate>
      <!--<div class="grapSection">
        <div class="grapWrapper">
          <h5>需求详情</h5>
          <ul class="demandLists ovh">
            <li class="demandItem">
              <h6 class="demandLeft">
                服务区域
              </h6>
              <div class="demandRight">
                上海市-徐汇区-城区
              </div>
            </li>
            <li class="demandItem">
              <h6 class="demandLeft">
                服务时间
              </h6>
              <div class="demandRight">
                2017-11-01 至 2017-11-29
              </div>
            </li>
            <li class="demandItem">
              <h6 class="demandLeft">
                技能要求
              </h6>
              <div class="demandRight">
                辅食制作、智力早教、小儿推拿、宝宝带睡
              </div>
            </li>
          </ul>
        </div>
        <div class="grapWrapper">
          <h5>职位要求</h5>
          <ul class="demandLists ovh">
            <li class="demandItem g8">
              辅食、早教、年龄小于50岁，会普通话，好沟通，性格开朗，喜欢小孩，育儿经验3年以上
            </li>
          </ul>
        </div>
      </div>-->
    </div>
    <div class="myAunt" v-show="isMyAunt">
      <h3>我的家政员</h3>
      <AuntPannel :jobInfo="jItems" :baseInfo="baseInfo"></AuntPannel>
    </div>
    <div class="grapSection cancelBox" v-show="dataJD.status==3||dataJD.status==5">
      <div class="grapWrapper">
        <h5>取消理由</h5>
        <ul class="demandLists ovh">
          <li class="demandItem g8">
            {{dataJD.remarks}}
          </li>
        </ul>
      </div>
    </div>
    <div class="f34 footer" v-show="dataJD.status!=3" :class="{'btn-wrapper':isGrapOrder}">
      <div>
        <span v-if="dataJD.status==1||$route.params.status==6">{{footTxt}}</span>
        <span v-else>{{jItems.jobTenantName}}</span>
      </div>
      <button class="btn-fill btn-smer" @click="grapOrder($event)" v-show="isGrapOrder" :data-id="jItems.tenantUserId">
        极速抢单
      </button>
      <div v-show="$route.params.status!=6">
        <span class="clock" v-if="dataJD.status==1">{{h}}:{{m}}:{{s}}</span>
        <a :href="jItems.contactPhoneHref" class="btn-fill btn-smer mobileBtn" v-else><span v-if="!!jItems.contactName">{{jItems.contactName.substr(0,1)+"老师"}}</span></a>
      </div>
    </div>
    <toast v-model="isToast" type="text" width="26em" :time="4000" class="toast">这是您本人订单，请到我的订单中处理</toast>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";

  .weui-toast__content {
    line-height: 1rem;
  }

  #grapDetails {
    display: flex;
    flex-flow: column;
    min-height: 100%;
  }

  /*div.push 写法*/
  .wrapper {
    flex: 1;
  }

  .footer {
    /*position: fixed;*/
    border-top: 1px solid #d7d7d7;
    /*bottom: 0;*/
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .26rem;
    height: .98rem;
    line-height: .98rem;
    background: #ffffff;
    color: #bcbcbc;
    padding: 0 .3rem;
    font-size: .26rem;
    .clock {
      font-size: .3rem;
      color: #49494a;
      padding-left: .4rem;
      background: url("../../assets/img/icons/clockdark.png") no-repeat left center;
      background-size: .31rem;
    }
  }

  .mobileBtn {
    span {
      display: inline-block;
      padding-left: .4rem;
      background: url("../../assets/img/icons/mobile.png") no-repeat left center;
      background-size: .26rem .25rem;
    }
  }

  .grapHeader {
    color: #ffffff;
    background: @blue;
    .headTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.6rem;
      line-height: 1.6rem;
      padding-left: .3rem;
      h4 {
        display: inline-block;
        font-family: STHeiti;
        font-size: .34rem;
      }
      .grapProgress {
        box-sizing: border-box;
        display: inline-block;
        line-height: .6rem;
        padding-left: .1rem;
        width: 1.4rem;
        height: .6rem;
        text-align: center;
        background: #73b9ff;
        border-top-left-radius: .6rem;
        border-bottom-left-radius: .6rem;
      }
    }
    .headBottom {
      width: 100%;
      /*display: flex;*/
      .bottomInfo {
        text-align: center;
        font-size: .26rem;
        display: inline-block;
        width: 33.33333%;
        position: relative;
        &:not(:last-child):after {
          position: absolute;
          right: 0;
          top: .1rem;
          content: '';
          width: 1px;
          height: .48rem;
          background: #d5d5d5;
        }
        p {
          margin-bottom: .2rem;
        }
        .lin02 {
          color: #c8e4ff;
          margin-bottom: .3rem;
        }
      }
    }
  }

  .grapSection {
    font-size: .3rem;
    .grapWrapper {
      margin: .24rem 0;
      padding: 0 .3rem;
      background: #ffffff;
      h5 {
        height: .88rem;
        line-height: .88rem;
        border-bottom: 1px solid #efeff4;
      }
      .demandLists {
        padding-top: .2rem;
        .demandItem {
          font-size: .3rem;
          line-height: .48rem;
          margin-bottom: .2rem;
          .demandLeft {
            float: left;
            width: 1.5rem;
            color: #888;
          }
          .demandRight {
            padding-left: 1.5rem;
            display: block;
          }
        }
      }
    }
  }

  .cancelBox {
    ul {
      padding: .3rem 0 !important;
      li {
        margin-bottom: 0 !important;
      }
    }
  }

  .myAunt {
    background: #ffffff;
    margin-top: .24rem;
    h3 {
      border-bottom: 1px solid #efeff4;
      height: .88rem;
      line-height: .88rem;
      padding: 0 .3rem;
      font-size: .3rem;
      color: @blue;
    }
  }

</style>
<script>
  import {Toast, Group, XSwitch, XButton} from 'vux'
  import AuntPannel from '@/components/template/auntPannelTemplate'
  import HeadView from "components/Header/headView"
  import DetailTemplate from 'components/template/detailCtnTemplate'
  import AuntBoxTemplate from 'components/template/auntBoxTemplate'
  import AuntFooter from 'components/template/auntFooterTemplate'
  import SourceTemplate from 'components/template/auntSourceTemplate'
  import LayerTemplate from 'components/template/layerTemplate'

  export default{
    data(){
      return {
        position: 'default',
        showPositionValue: false,
        processTxt: "",
        isGrapOrder: false,
        isInprocess: false,
        isMyAunt: false,
        footTxt: "订单处理后，可看到所属家政公司",
        isCancel: false,
        isCompleted: false,
        isInprocess: "",
        sourceInfo: {},
        jItems: {},
        staffInfo: {},
        jobInfo: {},
        match: "",
        jobId: "",
        status: "",
        dataJD: {},
        baseInfo: {},
        isToast: false,
        h: "",
        m: "",
        s: "",
        num: "",
        resumeDeposit: "",
        money: "",
        isBalanceShow: false,
        orderNo: "",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    methods: {
      fetchData () {
        let _this = this;
        let jobId = this.$route.params.jobId;
        _this.jobId = this.$route.params.jobId;
        let status = this.$route.params.status;
        this.status = this.$route.params.status;
        console.log(jobId, status)
        if (status == 6) {
//          可抢单
          _this.jobDetailData(jobId);
          this.isGrapOrder = true
          this.isMyAunt = false
        } else {
          this.isMyAunt = true;
          this.processData();
          var st = _this.dataJD.status;
          console.log(st);
          if (st == 2 || st == 4 || st == 5) {
            this.isCompleted = true;
          }
        }
      },
      grapOrder (e) {
        let _this = this;
//        抢单
        var userId = localStorage.getItem('uid')
//        this.$vux.toast.text('这是您本人订单，请到我的订单中进行处理','3000')

        if (userId == _this.jItems.tenantUserId) {
          _this.isToast = true;
//          this.$vux.toast.text('这是您本人订单，请到我的订单中进行处理','3000')
        } else {
          _this.orderNo = _this.jItems.orderNo;
          //      获取发布信息
          _this.getReleaseInfo()
        }
      },
      getReleaseInfo(){
        let _this = this;
        var req = {
          url: window.global_config.releaseJob,
          methods: 'get',
          headers: _this.$cm.params
        }
        /*this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
         let dataJD = data.jsonData;
         console.log(dataJD)
         _this.num = dataJD.resumeTotalNum - dataJD.resumeUsedNum;
         _this.money = dataJD.balance - dataJD.resumeDeposit;
         _this.resumeDeposit=dataJD.resumeDeposit;
         if (_this.num < 1 && _this.money < 100) {
         _this.isBalanceShow = true;
         return;
         } else {
         _this.isBalanceShow = false;
         _this.$router.push({name: 'matchAunt', params: {orderNo: _this.orderNo, jobId: _this.jobId}})
         }
         }
         }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.releaseJob,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                let dataJD = data.jsonData;
                console.log(dataJD)
                _this.num = dataJD.resumeTotalNum - dataJD.resumeUsedNum;
                _this.money = dataJD.balance - dataJD.resumeDeposit;
                _this.resumeDeposit = dataJD.resumeDeposit;
                if (_this.num < 1 && _this.money < 0) {
                  _this.isBalanceShow = true;
                  return;
                } else {
                  _this.isBalanceShow = false;
                  _this.$router.push({name: 'matchAunt', params: {orderNo: _this.orderNo, jobId: _this.jobId}})
                }
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      showPosition (position) {
        this.position = position
        this.showPositionValue = true
      },

      //      职位详情
      jobDetailData(jobId){
        let _this = this;
        var req = {
          url: window.global_config.jobsList + "/" + jobId,
          methods: 'get',
          headers: _this.$cm.params
        }
        $.ajax({
          url: window.global_config.jobsList + "/" + jobId,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                let dataJD = data.jsonData;
                _this.jItems = dataJD;
                if (_this.$route.params.status == 6) {
                  _this.dataJD.status = dataJD.usedNum + "/" + dataJD.totalNum
                }
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
        /*this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
         let dataJD = data.jsonData;
         _this.jItems = dataJD;
         if (_this.$route.params.status == 6) {
         _this.dataJD.status = dataJD.usedNum + "/" + dataJD.totalNum
         }
         }
         }).catch((err) => console.log(err))*/
      },
//      处理中详情
      processData(){
        var _this = this;
        var req = {
          url: window.global_config.resumeDetail + "/" + _this.jobId,
          methods: 'get',
          headers: _this.$cm.params
        }
        /*this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
         _this.dataJD = data.jsonData;
         _this.dataJD.mobileHref = "tel:" + _this.dataJD.contactPhone;
         _this.baseInfo = data.jsonData.staffInfo;
         _this.jItems = _this.dataJD.jobInfo;
         _this.jItems.contactPhoneHref="tel:"+_this.jItems.contactPhone
         if (_this.dataJD.status == 1) {
         var date = _this.dataJD.applyDate;
         var _applyDate = new Date(date);
         var DateNow = _this.$cm.getNowTime();
         console.log(DateNow);
         if ((DateNow - _applyDate) < 24 * 3600000 && (DateNow - _applyDate) > 0) {
         _this.countdown(_applyDate, DateNow);
         } else {
         _this.dataJD.status = 5;
         }
         }
         }
         }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.resumeDetail + "/" + _this.jobId,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.dataJD = data.jsonData;
                _this.dataJD.mobileHref = "tel:" + _this.dataJD.contactPhone;
                _this.baseInfo = data.jsonData.staffInfo;
                _this.jItems = _this.dataJD.jobInfo;
                _this.jItems.contactPhoneHref = "tel:" + _this.jItems.contactPhone
                if (_this.dataJD.status == 1) {
                  var date = _this.dataJD.applyDate;
                  var _applyDate = _this.newDate(date);
                  var DateNow = _this.$cm.getNowTime();
                  if ((DateNow - _applyDate) < 24 * 3600000 && (DateNow - _applyDate) > 0) {
                    _this.countdown(_applyDate, DateNow);
                  } else {
                    _this.dataJD.status = 5;
                  }
                }
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      newDate(strdate) {
        var arr = strdate.split(/[- : \/]/);
        var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        return date;
      },
//      倒计时
      countdown(applyDate, DateNow){
        let _this = this;
        var afterDate = applyDate.getTime() + 24 * 3600000;
        var DateNow = DateNow.getTime();
        var myTime = window.setInterval(function () {
          if ((afterDate - DateNow) < 24 * 3600000 && (afterDate - DateNow) > 0) {
//            var applyTime = new Date(24 * 3600000 - (DateNow - applyDate)).Format("hh:mm:ss");
//            var dt1 = afterDate.Format('yyyy-MM-dd hh:mm:ss');
//            var dt2 = DateNow.Format('yyyy-MM-dd hh:mm:ss');
//            var regTime = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2}:\d{1,2})/g;
            var interval = Math.abs(afterDate-DateNow) / 1000;
            _this.h = Math.floor(interval / 3600);
            _this.m = Math.floor(interval % 3600 / 60);
            _this.s = Math.floor(interval % 3600 % 60);
            if (_this.m <= 9) _this.m = '0' + _this.m;
            if (_this.s <= 9) _this.s = '0' + _this.s;
            DateNow = DateNow+ 1000;
          } else {
            _this.fetchData();
//            window.location.reload();
//            console.log(DateNow);
          }
        }, 1000);
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    components: {
      Toast,
      Group,
      XSwitch,
      XButton,
      AuntPannel,
      HeadView,
      DetailTemplate,
      AuntBoxTemplate,
      AuntFooter,
      SourceTemplate,
      LayerTemplate
    },
  }
</script>
