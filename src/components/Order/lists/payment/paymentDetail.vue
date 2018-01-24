<template>
  <div id="payment">
    <HeadView></HeadView>
    <div class="payment-detail">
      <div class="payment-container">
        <div class="payment-title">
          <p class="g8 title-price">订单价格:<i class="">{{order.amount+order.serviceCharge|money}}元</i></p>
          <p class="f26 gc">阿姨价格{{order.amount||0}}元+服务费{{order.serviceCharge||0}}元</p>
        </div>
        <ul class="payment-pannel">
          <li>
            <i :class="[payInfo.idepositOver=='02'?'dot':'dotDark']"></i>
            <div class="payment-status card deposit">支付定金<span class="price">{{payInfo.orderDeposit}}元</span>
            </div>
          </li>
          <li class="mb30">
            <div class="payment-info">
              <div class="line"></div>
              <em class="f26 g8" v-show="depositShow" :class="{'pending':dPending}">{{payInfo.deposit}} <i v-show="!dPending">（{{payInfo.depositDate}}）</i></em>
            </div>
          </li>
          <li>
            <i :class="[payInfo.isInterview=='02'?'dot':'dotDark']"></i>
            <div class="payment-status interview deposit">预约面试<span class=" price">安排家政员</span></div>
          </li>
          <li class=" mb30">
            <div class="payment-info">
              <div class="line"></div>
              <em class="f26 g8" v-show="interviewShow" :class="{'pending':iPending}">{{payInfo.interview}} <i v-show="!iPending">（{{payInfo.passViewDate}}）</i></em>
            </div>
          </li>
          <li>
            <i :class="[payInfo.balanceOver=='02'?'dot':'dotDark']"></i>
            <div class="payment-status interview deposit">支付尾款<span class="price" v-show="balanceShow">{{payInfo.orderBalance}}元</span>
            </div>
          </li>
          <li>
            <div class="payment-info">
              <em class="f26 g8" v-show="balanceShow" :class="{'pending':bPending}">{{payInfo.balance}} <i v-show="!bPending">({{payInfo.balanceDate}})</i></em>
            </div>
          </li>
        </ul>
      </div>
      <!--<div class="contract mt30">
        <div class="dib f34">
          合同
          <span class="ml20 desc">上传合同让双方更安心</span>
        </div>
        <button class="btn-md btn-fill">查看合同</button>
      </div>-->
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../../assets/css/common";

  #payment {
    font-size: .3rem;
    .payment-detail {
      color: #333;
      margin: .3rem;
      font-size: .34rem;
      .payment-title {
        padding: .46rem .46rem 0;
        .title-price {
          font-size: .26rem;
          i {
            margin-left: .2rem;
            color: #ff5f58;
            font-size: .34rem;
          }
        }
        p {
          margin-bottom: .44rem;
        }
      }
      .payment-pannel {
        /*background: #ffffff;*/
        border-radius: .08rem;
        padding: .4rem .3rem;
        padding-bottom: 0.2rem;
        li {
          position: relative;
          font-size: .34rem;
          .payment-status {
            z-index: 9999;
            padding-top: .1rem;
            font-size: .3rem;
            height: .5rem;
            padding-left: .8rem;
          }
          .payment-info {
            position: relative;
            margin-left: .24rem;
            padding-left: .56rem;
            height: .84rem;
            line-height: .6rem;
            /*border-left: 1px solid #888888;*/
            span {
              display: inline-block;
              width: 1.4rem;
            }
          }
          .interview {
            /*background: url(../../../../assets/img/dotdark.png) no-repeat;*/
            /*background-size: .39rem;*/
            /*background-position:.05rem 0;*/
          }
          .card {
            /*   background: url(../../../../assets/img/dotlight.png) no-repeat;
               background-size: .39rem;
               background-position: .05rem 0;*/
          }
        }
      }
      .dot {
        z-index: 999;
        position: absolute;
        left: .05rem;
        top: 0.05rem;
        width: .39rem;
        height: .39rem;
        background: url(../../../../assets/img/dotlight.png) no-repeat;
        background-size: contain;
      }
      .dotDark {
        .dot;
        background: url(../../../../assets/img/dotdark.png) no-repeat;
        background-size: contain;
      }
      .contract {
        height: 1.2rem;
        line-height: 1.2rem;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem 0 .16rem;
        .desc {
          font-size: .26rem;
          color: #adadad;
        }
      }
    }
  }

  .pending {
    color: #ff5f58;
  }

  .line {
    position: absolute;
    left: 0;
    z-index: 1;
    top: -.15rem;
    width: 1px;
    height: 1.6rem;
    background: #c1c1c1;
  }

  .payment-container {
    min-height: 4rem;
    background: url("../../../../assets/img/paybdg.png") no-repeat;
    background-size: cover;
  }

  .price {
    font-size: .26rem;
    margin-left: .5rem;
    /*color: #ff913e;*/
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  export default{
    data(){
      return {
        orderNo: "",
        order: {},
        payInfo: {},
        depositShow:true,
        interviewShow:true,
        balanceShow:true,
        dPending:false,
        iPending:false,
        bPending:false,
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
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.orderNo = this.$route.params.orderNo
        console.log(this.orderNo)
        //        支付详情
        //					订单详情
        this.orderInfo();
        this.orderPayInfo();
      },
      orderInfo(){
//        获取预约信息
        let _this = this;
        $.ajax({
          url: window.global_config.orderInfo,
          type: "post",
          data: {orderNo: _this.orderNo},
          dataType: "json",
          headers: _this.params,
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              _this.order = data.jsonData;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      orderPayInfo(){
        let _this = this;
        $.ajax({
          url: window.global_config.orderPayInfo,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var dataJD = data.jsonData;
              _this.payInfo = dataJD;
              var orderStatus=_this.order.orderStatus;
              console.log(orderStatus)
              if(orderStatus=='06'){
                _this.payInfo.idepositOver='01';
                _this.payInfo.isInterview='01';
                _this.payInfo.balanceOver='01';
                _this.payInfo.deposit = "待退款"
                _this.interviewShow=false;
                _this.balanceShow=false;
                _this.dPending=true;

              }else {
                if (dataJD.idepositOver == "01" && dataJD.isInterview == "01" && dataJD.balanceOver == "01") {
                  _this.payInfo.deposit = "未支付"
                  _this.interviewShow=false;
                  _this.balanceShow=false;
                  _this.dPending=true;

                } else if (dataJD.idepositOver == "02" && dataJD.isInterview == "01" && dataJD.balanceOver == "01") {
                  _this.payInfo.deposit = "已支付";
                  _this.payInfo.interview = "未通过";
                  _this.balanceShow=false;
                  _this.iPending=true;

                } else if (dataJD.idepositOver == "02"&&dataJD.isInterview == "02"&&dataJD.balanceOver == "01"){
                  _this.payInfo.deposit = "已支付";
                  _this.payInfo.interview = "已通过";
                  _this.payInfo.balance = "待支付";
                  _this.bPending=true;
                } else if (dataJD.idepositOver == "02"&&dataJD.isInterview == "02"&&dataJD.balanceOver == "02"){
                  _this.payInfo.deposit = "已支付";
                  _this.payInfo.interview = "已通过";
                  _this.payInfo.balance = "已支付";
                }
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
    },
    components: {
      HeadView,
    },
  }
</script>
