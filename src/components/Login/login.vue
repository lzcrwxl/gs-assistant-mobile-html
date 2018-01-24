<template>
  <div id="login" class="fix" :style="note">
    <!--<form>-->
    <ul class="info-enter">
      <li class="info-list">
        <h5 class="txt">登陆账号</h5>
        <div class="rtInfo">
          <input type="text" placeholder="请输入登录账号" class="baseInput" id="username" name="loginAccount"
                 @blur="blur($event)" v-model.trim="account" @keyup="checkInput" value="22">
        </div>
      </li>
      <li class="info-list">
        <h5 class="txt">登陆密码</h5>
        <div class="rtInfo">
          <input type="password" placeholder="请输入密码" class="baseInput" name="password" @blur="blur($event)"
                 v-model.trim="psw" @keyup="checkInput" >
        </div>
      </li>
      <li class="info-list lc-code">
        <h5 class="txt">图形码</h5>
        <div class="rtInfo">
          <input type="text" placeholder="右侧图形码" class="mdInput" name="captcha" @blur="blur($event)"
                 v-model.trim="captcha" @keyup="checkInput" >
          <img src="../../assets/img/code.png" alt="" class="rtBox" @click="getCaptcha">
        </div>
      </li>
      <li class="info-list">
        <h5 class="txt">验证码</h5>
        <div class="rtInfo">
          <input type="text" placeholder="短信验证码" class="mdInput" @blur="blur($event)" v-model.trim="sms" name="smsCode"
                 @keyup="checkInput" >
          <button class="rtBox smsBtn" @click="getSms" :disabled="!isClickAble" :class="{noClickAble:!isClickAble}">{{smsMsg}}</button>
        </div>
      </li>
    </ul>
    <p class="lc-validation"></p>
    <div class="mt100 btn-login">
      <button class="btn-big btn-fill" @click="login" :disabled="!isLogin" :class="{noClick:!isLogin}">登录并绑定账号</button>
      <p class="f26">
        <router-link to="/landPage">了解家策门店助手</router-link>
      </p>
    </div>
    <!--</form>-->
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .noClickAble{
    background: #efefef!important;
    color: #888!important;
  }
  .noClick {
    opacity: .5 !important;
  }

  #login {
    padding: 3.18rem .3rem 0;
    background: url("../../assets/img/logo.png") no-repeat center .98rem;
    background-size: 5.3rem 1.13rem;
    background-color: #f5f5fa;
    .info-enter {
      .info-list {
        background: #ffffff;
        width: 100%;
        height: .98rem;
        line-height: .98rem;
        border-radius: .08rem;
        padding: 0 .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 1px;
        }
        .txt {
          font-size: .34rem;
          color: #888;
          width: 1.8rem;
        }
        .rtInfo {
          display: flex;
          justify-content: space-between;
          flex: auto;
          align-items: center;
          input {
            font-size: .3rem;
          }
          .rtBox {
            width: 2rem;
            height: .72rem;
            border-radius: .04rem;
          }
        }
      }

    }
  }

  .baseInput {
    width: 100%;
  }

  .mdInput {
    width: 2.6rem;
  }

  .smsBtn {
    font-size: .28rem;
    color: #0080ff;
    background: #deefff;
  }

  .btn-login {
    margin-bottom: 2.2rem;
    p {
      text-align: center;
      margin-top: .45rem;
      a {
        color: #0080ff;
      }
    }
  }

  .lc-validation {
    color: red;
    font-size: .24rem;
    padding: 0 .2rem;
    height: .5rem;
    line-height: .5rem;
  }
</style>
<script>
  export default{
    data(){
      return {
        account: "",
        psw: "",
        captcha: "",
        sms: "",
        isLogin: false,
        isClickAble:false,
        countDown:60,
        captchaKey:"",
        smsMsg:"获取验证码",
        note: {
          backgroundImage: "url(" + require("../../assets/img/logo.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "5.3rem 1.13rem",
          backgroundPosition:"center .98rem"
        },
      }
    },
    created () {
      this.$cm.shareWechat();
      var token = localStorage.getItem("token");
      var uid=localStorage.getItem("uid");
      if (token!=null&&token!=""&&token!="null") {
        if (uid!=null&&uid!=""&&uid!="null") {
          this.$router.push('home')
        }
      }
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getCaptcha()
    },
    methods: {
      blur(event){
        var _this = this;
        var self = $(event.target)
        //		表单验证
        var regPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;//手机号

        var name = $(event.target).attr("name");
        switch (name) {
          case "loginAccount":
            if (self.val() == "") {
              _this.onError('账号不能为空');
            } else {
              _this.onSuccess();
            }
            break;
          case "password":
            if (self.val() == "") {
              _this.onError('密码不能为空');
            } else {
              _this.onSuccess();
            }
            break;
          case "captcha":
            if (self.val() == "") {
              _this.onError('图形码不能为空');
              _this.getCaptcha()
            } else {
              _this.onSuccess();
            }
            break;
          case "smsCode":
            if (self.val() == "") {
              _this.onError('验证码不能为空');
            } else {
              _this.onSuccess();
            }
            break;
          default:
            break;
        }
      },
//      验证码
      getCaptcha(){
        let _this=this;
        $.ajax({
          url: window.global_config.getCaptcha,
          type: "get",
          data: {},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                var dataJD = data.jsonData;
                _this.captchaKey=dataJD.captchaKey;
                var img = "data:image/jpeg;base64," + dataJD.captcha;
                $(".lc-code img").attr("src", img);
                console.log(data.msg);
              } else {
                console.log(data.msg);
              }
            } else {
              console.log(data.msg);
            }
          }
        });
      },
      watch: {},
      login(){
        var token={
          token:localStorage.getItem('token')
        }
        var _this = this;
        $.ajax({
          url: window.global_config.login,
          type: "post",
          headers:token,
          data: {
            loginAccount:_this.account,
            password:_this.psw,
            captcha:_this.captcha,
            captchaKey:_this.captchaKey,
            source:"wx",
            code:_this.sms
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var userId = data.jsonData.userId;
              localStorage.setItem('uid', userId)
              _this.isLogin=false;
              setTimeout(()=>{
                _this.$router.push('home')
              },2000);
            } else {
              _this.$cm.checkAuth(data.code)
              _this.getCaptcha();
              if(data.code==100007){
                _this.psw="";
                _this.captcha="";
                _this.sms="";
              }
              _this.onError(data.msg)
              console.log(data.msg);
            }
          }
        });
      },
//      获取短信码
      getSms(){
        let _this = this;
        $.ajax({
          url: window.global_config.sendSms,
          type: "get",
          data: {
            loginAccount:_this.account,
            password:_this.psw
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                var dataJD = data.jsonData;
                _this.sendCode();
              }else {
                console.log(data.msg);
              }
            } else {
              _this.onError(data.msg);
              _this.getCaptcha();
              console.log(data.msg);
            }
          }
        });

      },
      sendCode(){
        if (this.countDown <= 0) {
          this.smsMsg="重获验证码"
          if (!this.$cm.isEmpty(this.account) && !this.$cm.isEmpty(this.psw)) {
            this.isClickAble = true;
          } else {
            this.isClickAble = false;
          }
          this.countDown = 60;
        }else {
          this.isClickAble=false;
          this.smsMsg=this.countDown+"秒";
          this.countDown--;
          console.log(this.countDown)
          setTimeout(()=> {
            this.sendCode();
          }, 1000)
        }
      },
      onError: function (msg) {
        if ($(".lc-validation").hasClass("lv_on")) {
          $(".lc-validation").text(msg);
          return;
        }
        $(".lc-validation").addClass("lv_on").text(msg);
      },
      onSuccess: function () {
        $(".lc-validation").removeClass("lv_on").text("");
      },
      checkInput(){
//        当都不为空时,可登录
        if (!this.$cm.isEmpty(this.account) && !this.$cm.isEmpty(this.sms) && !this.$cm.isEmpty(this.psw) && !this.$cm.isEmpty(this.captcha)) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
        if (!this.$cm.isEmpty(this.account) && !this.$cm.isEmpty(this.psw)) {
          if(this.countDown==60){
            this.isClickAble = true;
          }
        } else {
          this.isClickAble = false;
        }
      }
    }
  }
</script>
