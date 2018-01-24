<template>
  <div id="order-inprocess">
    <div v-if="$route.meta.navShow">
      <HeadView :noshadow="noShadow" :modifyInfo="modifyInfo" :orderNo="orderNo" :status="orderStatus">
      </HeadView>
      <div class="order-status" v-show="isStatusShow">
        <router-link class="status-link" :to="{name:'payment',params:{orderNo:orderNo}}">
          <h4 class="mt40">{{orderStatus|toText}}</h4>
          <div class="lin2">
            <span v-show="orderStatus=='02'">安排家政员</span>
            <span v-show="orderStatus=='01'">需付款：{{payInfo.orderDeposit|money}}元</span>
            <span v-show="orderStatus=='03'">需付款：{{payInfo.orderBalance|money}}元</span>
            <span v-show="orderStatus=='06'">需退款：{{payInfo.orderDeposit|money}}元</span>
            <span v-show="orderStatus=='04'">已付款：{{(payInfo.orderDeposit+payInfo.orderBalance)|money}}元</span>
            <a><span>支付详情</span></a>
          </div>
        </router-link>
        <div class="dib pass" v-show="orderStatus=='02'" @click="interviewLayer">
          <p>面试</p>
          <p class="mt10">通过</p>
        </div>
        <div class="dib pass" v-show="orderStatus=='01'&&orderSource=='01'" @click="payLayer(1)">
          <p>完成</p>
          <p class="mt10">支付</p>
        </div>
        <div class="dib pass" v-show="orderStatus=='03'&&orderSource=='01'" @click="payLayer(2)">
          <p>完成</p>
          <p class="mt10">支付</p>
        </div>
      </div>
      <Detail :priceshow="isprice" :order="order" :member="member" :service="service" :staff="staff"
              :source="$route.params.source" :staffShow="staffShow" :orderStatus="orderStatus" :class="[isInProcess ? 'isProcess': 'noProcess']" ></Detail>
      <div class="btn-wrapper mt60" v-show="isInProcess">
        <router-link :to="{name:'release',params:{orderNo:orderNo}}" class="btn-block btn-fill"
                     v-if="order.isPublishedJob==0&&orderStatus!='03'&&orderStatus!='06'">发布需求
        </router-link>
        <router-link to class="btn-block btn-fill noClick" v-else-if="order.isPublishedJob==1">需求已发布</router-link>
      </div>
      <LayerTemplate :isInterview.sync="isInterview" :isPayment.sync="isPayment"
                     @interview="passInterview" @payment="completePay"></LayerTemplate>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";



  #order-inprocess {
    .order-status {
      display: flex;
      height: 1.6rem;
      .status-link {
        color: #ffffff;
        padding-right: .2rem;
        display: inline-block;
        background: #0080ff;
        flex: 1;
        h4 {
          position: relative;
          font-size: .34rem;
          padding-left: .96rem;
          &:before {
            content: '';
            width: .38rem;
            height: .38rem;
            position: absolute;
            left: .3rem;
            top: -.02rem;
            background: url("../../../assets/img/icons/clock.png") no-repeat center;
            background-size: contain;
          }
        }
        .lin2 {
          font-size: .26rem;
          margin-top: .20rem;
          padding-left: .96rem;
          a {
            float: right;
            span {
              opacity: .83;
            }
            position: relative;
            padding-right: .34rem;
            &:after {
              content: "";
              width: .14rem;
              height: .26rem;
              position: absolute;
              right: 0;
              opacity: 1 !important;
              background: url("../../../assets/img/icons/arrowwh.png") no-repeat center;
              background-size: contain;
            }
          }
        }
      }
      .pass {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background: #6fb7ff;
        font-size: .34rem;
        width: 1.68rem;
      }
    }
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import Detail from "@/components/template/detailOrderContent.vue"
  import BtnBottom from "@/components/template/btnBottom"
  import Payment from "@/components/Order/lists/payment/paymentDetail.vue"
  import {mapGetters, mapActions, mapState} from 'vuex'
  import LayerTemplate from 'components/template/layerTemplate'

  export default{
    data(){
      return {
        noShadow: true,
        contentLf: "发布需求",
        contentRt: "分享订单",
        content: "发布需求",
        isprice: true,
        navShow: true,
        modifyInfo: true,
        order: {},
        member: {},
        service: {},
        staff: {},
        payInfo: {},
        orderStatus: "",
        isInProcess: true,
        isStatusShow: true,
        staffShow: true,
        orderNo: "",
        orderSource: "",
        isInterview: false,
        isPayment: false,
        paymentType:"",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    components: {
      HeadView,
      Detail,
      BtnBottom,
      Payment,
      LayerTemplate
    },
    created () {
      this.$cm.shareWechat();
      this.orderNo = this.$route.params.orderNo
//      this.orderStatus = this.$route.params.orderStatus
      this.orderSource = this.$route.params.source
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData(){
        let _this = this;
        //					订单详情
        _this.orderInfo();
//       已完成 状态
        if (_this.orderStatus == '04') {
          _this.isInProcess = false;
          _this.modifyInfo = false;
        }
//        带尾款
        if (_this.orderStatus == '03' || _this.orderStatus == '06') {
          _this.isInProcess = false;
          _this.modifyInfo = false;
        }
//        已取消状态
        if (_this.orderStatus == '05') {
          _this.isInProcess = false;
          _this.modifyInfo = false;
          _this.isStatusShow = false;
          _this.noShadow = false;
          _this.isprice = false;
        }
        console.log(_this.orderNo)

        //        客户信息获取
        _this.orderMemberInfo();
//        服务信息获取
        _this.orderServiceInfo();
//        获取阿姨信息
        _this.orderStaffInfo();
        //        支付详情
        _this.orderPayInfo();

      },
      orderInfo(){
//        获取预约信息
        let _this = this;
        $.ajax({
          url: window.global_config.orderInfo,
          type: "post",
          data: {orderNo: _this.orderNo},
          dataType: "json",
          async: false,
          headers: _this.params,
          success: function success(data) {
            if (data.success) {
              _this.order = data.jsonData;
              _this.orderStatus=data.jsonData.orderStatus;
              _this.$store.dispatch('orderInfo', _this.order)
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      orderMemberInfo(){
//        客户信息获取
        let _this = this;
        $.ajax({
          url: window.global_config.orderMemberInfo,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              _this.member = dataJD;
              _this.member.mobileHref = "tel:" + dataJD.memberMobile;
              _this.$store.dispatch('memberInfo', _this.member)
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      orderServiceInfo(){
        let _this = this;
        $.ajax({
          url: window.global_config.orderServiceInfo,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              _this.service = data.jsonData;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      orderStaffInfo(){
        let _this = this;
        $.ajax({
          url: window.global_config.orderStaffInfo,
          type: "post",
          headers: _this.params,
          async: false,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              _this.staff = data.jsonData;
              if (_this.$cm.isEmpty(_this.staff)) {
                _this.staffShow = false;
              } else {
                _this.staffShow = true;
              }
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
              _this.payInfo = data.jsonData;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      面试弹窗
      interviewLayer(){
        let _this = this;
        if (!_this.staffShow || _this.$cm.isEmpty(_this.staff)) {
          this.$vux.toast.text('请添加家政员')
          return;
        } else {
          _this.isInterview = true;
        }
      },
//     面试通过
      passInterview(){
        let _this = this;
        $.ajax({
          url: window.global_config.passInterview,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo, staffId: _this.staff.staffId},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              _this.orderStatus = "03";
              console.log(_this.orderStatus)
              _this.$router.push({
                name: 'process',
                params: {orderNo: _this.orderNo, source: _this.orderSource, orderStatus: _this.orderStatus}
              })
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      本地完成支付
      completePay(){
        let _this = this;
        let type=_this.paymentType;
        $.ajax({
          url: window.global_config.depositPayment,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo, type:type},
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                if (type == 1) {
                  _this.orderStatus = "02";
                } else if (type == 2) {
                  _this.orderStatus = "04"
                }
                _this.$router.push({
                  name: 'process',
                  params: {orderNo: _this.orderNo, source: _this.orderSource, orderStatus: _this.orderStatus}
                })
                console.log(data.msg);
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
//支付弹窗
      payLayer(type){
        this.isPayment=true;
        this.paymentType=type;
      },

    },
    props: ['ordersList', 'queryStatus',]
  }
</script>
