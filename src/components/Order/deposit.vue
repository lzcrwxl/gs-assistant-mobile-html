<template>
  <div id="deposit">
    <HeadView></HeadView>
    <div class="depositPannel ovh">
      <h1>
        可用金额
        <span class="avAmount">{{amount}}</span>
      </h1>
      <div class="depositCtn">
        <p>充值金额</p>
        <div class="dpAmount">
          ￥<input type="text" value="200" v-model="payAmount" @blur="checkAmount" id="payAmount">
        </div>
      </div>
    </div>
    <p class="tips">提示：充值金额为100元的整数</p>
    <button class="confirm" @click="recharge" :disabled="isClickAble" :class="{'noClick':isClickAble}">确认充值</button>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .noClick {
    opacity: .5 !important;
  }

  .depositPannel {
    margin: .24rem .2rem 0;
    border-radius: .04rem;
    background: #ffffff;
    min-height: 1rem;
    padding: 0 .3rem;
    h1 {
      font-size: .3rem;
      color: #6b6b6b;
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #efeff4;
      .avAmount {
        color: #333;
      }
    }
    .depositCtn {
      p {
        font-size: .3rem;
        height: 1.3rem;
        line-height: 1.3rem;
        color: #6b6b6b;
      }
      .dpAmount {
        /*line-height:2rem;*/
        font-size: .48rem;
        color: #6b6b6b;
        margin-bottom: .6rem;
      }
      input {
        font-size: .6rem;
        color: #333;
        width: 5.8rem;
      }
    }
  }

  .tips {
    font-size: .26rem;
    color: #d6d6d6;
    margin: .2rem .2rem .4rem;
  }

  .confirm {
    margin: 0 auto;
    height: .84rem;
    width: 6.9rem;
    line-height: .84rem;
    display: block;
    border-radius: .08rem;
    background: #0080ff;
    color: #ffffff;
    text-align: center;
    font-size: .34rem;
    cursor: pointer;
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  export default{
    data(){
      return {
        amount: "",
        payType: "P01",
        payAmount: "",
        isClickAble: false,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created(){
      this.$cm.shareWechat();
      this.directRightUrl();
      this.getAmount();
    },
    components: {
      HeadView,
    },
    methods: {
      getAmount(){
        let _this = this;
        $.ajax({
          url: window.global_config.info,
          type: "post",
          headers: _this.params,
          data: {},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                var dataJD = data.jsonData;
                if (dataJD.availableAmount != null) {
                  if (dataJD.availableAmount == 0) {
                    _this.amount = "0.00";
                  } else {
                    _this.amount = dataJD.availableAmount;
                  }
                }
              } else {
                _this.$cm.checkAuth(data.code)
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      directRightUrl () {
        let paths = window.location.href.split('#')
        paths[1] = paths[1] || '/'
        if (paths[0].charAt(paths[0].length - 1) !== '?') {
          paths[0] = `${paths[0]}?`
        }
        if (paths[1].charAt(0) === '!') {
          paths[1] = paths[1].substr(1)
        }
        let url = `${paths[0]}#${paths[1]}`
        if (window.location.href !== url) {
          window.location.href = url
        }
      },
      recharge(){
        this.checkAmount();
        if ($("#deposit .validation").length > 0) {
          console.log("有错误")
          return;
        }
        let _this = this;
        _this.isClickAble = true;
        $.ajax({
          url: window.global_config.recharge,
          type: "post",
          headers: _this.params,
          data: JSON.stringify({
            amount: _this.payAmount,
            payType: _this.payType,
            remarks: "商户充值"
          }),
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.weChatPay(data)
              setTimeout(() => {
                _this.isClickAble = false;
              }, 4000)
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          },
          error: function (err) {
            console.log(err);
          }
        });
      },
      weChatPay(response) {
        let _this = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId": response.jsonData.appId, //公众号名称，由商户传入
          "timeStamp": response.jsonData.timeStamp, //时间戳，自1970 年以来的秒数
          "nonceStr": response.jsonData.nonceStr, //随机串
          "package": response.jsonData.package,
          "signType": response.jsonData.signType, //微信签名方式:
          "paySign": response.jsonData.paySign //微信签名
        }, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
//            _this.$vux.toast.text('充值成功')
            _this.isClickAble = false;
//              window.history.back();
            _this.$router.go(-2);
          }
        });
      },
      checkAmount(){
        var self = $("#payAmount");
        var regNum = /^[1-9]\d*$/;
        var payAmount = this.payAmount;
        if (payAmount == "") {
          this.onError('不能为空', $("#payAmount"));
          return;
        } else if (!regNum.test(payAmount)) {
          this.onError('请填写数字', self);
          return;
        } else if (payAmount % 100 != 0) {
          this.onError('充值金额为大于100元的整数。', self);
          return;
        } else {
          this.onSuccess(self);
        }
      },
      onError (msg, self) {
        if (self.nextAll().hasClass('validation')) {
          self.nextAll('.validation').text(msg);
          return;
        }
        self.parent().append("<p class='validation' style=' color: red; font-size: .24rem; margin-top: .1rem;'>" + msg + "</p>");
      },
      onSuccess(self) {
        self.nextAll('.validation').remove();
      }
    }
  }
</script>
