<template>
  <div id="home">
    <header>
      <div class="avatarBar">
        <div class="avatarWrapper fix mr30">
          <img :src="info.headImgUrl" alt="">
        </div>
        <div class="dib mt20">
          <h4 class="f34">{{info.userName}}</h4>
          <p class="f30 mt20">{{info.mobile}}</p>
        </div>
      </div>
      <div class="wechatshop-bar">
        <span class="f30 ml30 shop-name">{{info.storeName}}</span>
        <!--<router-link :to="info.toUrl" class="r"><span>我的微店</span></router-link>-->
        <a :href="info.toUrl" class="r"><span>我的微店</span></a>
      </div>
    </header>
    <section>
      <div class="container">
        <h3>我的订单</h3>
        <ul class="order-lists">
          <router-link class="order-item" to="/order/0" tag="li">
            <div class="num">{{info.reserveOrderCount}}</div>
            <div class="order-status">
              新订单
            </div>
          </router-link>
          <router-link class="order-item" to="/order/1" tag="li">
            <div class="num">{{info.orderCount}}</div>
            <div class="order-status">
              处理中
            </div>
          </router-link>
          <li class="order-item">
            <div class="no-online">暂未上线</div>
            <div class="order-status">需售后</div>
          </li>
        </ul>
      </div>
      <div class="container">
        <h3>更多功能</h3>
        <ul class="order-lists">
          <router-link to="/aunt" class="order-item" tag="li">
            <div class="num">{{info.tenantsStaffCount}}</div>
            <div class="order-status">
              家政员
            </div>
          </router-link>
          <router-link to="/job" class="order-item" tag="li">
            <div class="num">{{info.tenantJobCount}}</div>
            <div class="order-status">
              职位招聘
            </div>
          </router-link>
          <router-link to="/resume" class="order-item" tag="li">
            <div class="num">{{info.TenantJobResumeCount}}</div>
            <div class="order-status">
              简历箱
            </div>
          </router-link>
          <!--<router-link class="order-item" to="" tag="li">
            <div class="num">0</div>
            <div class="order-status">
              职位招聘
            </div>
          </router-link>
          <router-link class="order-item" to="" tag="li">
            <div class="num">0</div>
            <div class="order-status">
              简历箱
            </div>
          </router-link>-->
        </ul>
      </div>
    </section>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/home";
</style>
<script>
  export default{
    data(){
      return {
        functions: [
          {num: 10, name: "家政员", link: "/aunt"},
          {num: 5, name: "职位招聘", link: "/b"},
          {num: 100, name: "简历箱", link: "/resume"}
        ],
        orders: [
          {num: 10, name: "新订单", orderId: "0", link: "order"},
          {num: 5, name: "处理中", orderId: "1", link: "order"},
//          {num:"暂未上线",name:"需售后",link:"/order"},
        ],
        info: ""
      }
    },
    created(){
      var token =localStorage.getItem("token")|| this.$cm.getUrlParam("token");
      var uid01 = localStorage.getItem("uid");
      var uid = "";
      if (uid01 != "null" && uid01) {
        uid = uid01;
      } else {
        uid = this.$cm.getUrlParam("uid");
      }
      if (token) {
        localStorage.setItem('token', token)
        if (uid == null || uid == "" || uid == "null") {
          this.$router.push({path: '/login'})
        } else {
          localStorage.setItem('uid', uid)
        }
      } else {
        this.$cm.auth();
      }
    },
    methods: {
      fetchData(){
        let _this = this;
        var token = {
          token: localStorage.getItem('token')
        }
        $.ajax({
          url: window.global_config.mainPageData,
          type: "post",
          data: {},
          headers: token,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.info = dataJD;
              console.log(data.msg);
              _this.$cm.shareWechat();
            } else {
              if (data.code === 20002) {
                localStorage.clear();
                _this.$cm.auth();
              } else if (data.code === 20004 || data.code === 999010) {
                localStorage.setItem("uid","");
                _this.$router.push({path: '/login'})
//                window.location.href="http://m.jiacer.com/#/login";
              }
            }
          }
        });
      },
    },
    mounted(){
      this.fetchData()
    },
  }
</script>
