<template>
  <div id="orderDetails">
    <HeadView :modifyInfo="modifyInfo" :orderNo="orderNo" status="7"></HeadView>
    <Detail :reserve="reserve" :member="member" :service="service" :staff="staff"
            :source="$route.params.source" class="isProcess"></Detail>
    <div class="btn-wrapper mt60" v-show="reserve.ORDER_STATUS=='01'">
      <button class="btn-bottom btn-white mr30" @click="isCancelShow=true">放弃订单</button>
      <!--<button class="btn-bottom btn-fill">生成订单</button>-->
      <router-link :to="{name:'paymentOrder',params:{orderNo:orderNo}}" class="btn-bottom btn-fill">生成订单</router-link>
    </div>
    <div class="btn-wrapper mt60" v-show="reserve.ORDER_STATUS=='02'">
      <button class="btn-bottom btn-fill btn-block noClick" disabled>已处理</button>
    </div>
    <div class="btn-wrapper mt60" v-show="reserve.ORDER_STATUS=='03'">
      <button class="btn-bottom btn-fill btn-block noClick" disabled>已取消</button>
    </div>
    <!--取消弹出层-->
    <div class="mask" @touchmove.prevent v-show="isCancelShow" v-cloak></div>
    <div class="layer confirm" id="cancelLayer" v-show="isCancelShow" v-cloak>
      <p class="mt50">
        确定放弃订单么？
      </p>
      <div class="button_box mt30">
        <button class="btn-fill cancel mr30" @click="isCancelShow=false">取消</button>
        <button class="btn-default submit" @click="confirmCancel">确定</button>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";

  #orderDetails {
    .detail-list {
      padding: .36rem .3rem 0;
      background: #ffffff;
      font-size: .3rem;
      .detail-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: .3rem;
        &:last-child {
          margin-bottom: .4rem;
        }
        .online {
          width: 1.36rem;
          height: .36rem;
          position: absolute;
          right: 0;
        }
        /*line-height: .6rem;*/
        h5 {
          color: #888;
          width: 1.47rem;
        }
        .describe {
          color: #333;
        }
        .cost {
          color: #ff5f58;
        }
        .phone {
          position: absolute;
          right: 0;
          width: .64rem;
          height: .64rem;
        }
      }

    }
    .detail-info {
      padding: .3rem;
      background: #ffffff;
      font-size: .3rem;
      .detail-info-item {
        .avatar {
          width: 1.48rem;
          height: 1.81rem;
        }
        .info-r {
          position: relative;
          .detail-desc {
            color: #a9a9a9;
          }
          .chart {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }

  #service-addr {
    h5 {
      align-self: flex-start;
    }
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import BtnBottom from "@/components/template/btnBottom"
  import Detail from "@/components/template/detailContent.vue"

  export default{
    data(){
      return {
        src: require("@/assets/img/icons/phone.png"),
        avatar: require("@/assets/img/photo.png"),
        contentLf: "放弃订单",
        contentRt: "生成订单",
        orderNo: "",
        reserve: {},
        member: {},
        service: {},
        staff: {},
        orderStatus: "",
        source:"",
        isCancelShow: false,
        modifyInfo:true,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    components: {
      HeadView,
      BtnBottom,
      Detail
    },
    created(){
      this.$cm.shareWechat();
      this.fetchData();
    },
    methods: {
      fetchData(){
        let _this = this;
        _this.orderNo = _this.$route.params.orderNo
//        _this.source = _this.$route.params.source
        _this.orderStatus = _this.$route.params.orderStatus;
        console.log(_this.orderNo, _this.orderStatus)
        //        获取预约信息
        _this.getReserve();
        //        客户信息获取
        _this.getReserveMember();
//        服务信息获取
        _this.getReserveService();
//        获取阿姨信息
        _this.getReserveStaff();
      },
      getReserve(){
//        获取预约信息
        let _this = this;
        $.ajax({
          url: window.global_config.getReserve,
          type: "post",
          data: {orderNo: _this.orderNo},
          dataType: "json",
          headers: _this.params,
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              _this.reserve = data.jsonData;
              if(data.jsonData.ORDER_STATUS=="02"||data.jsonData.ORDER_STATUS=="03"){
                _this.modifyInfo=false;
              }else {
                _this.modifyInfo=true;
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      getReserveMember(){
//        客户信息获取
        let _this = this;
        $.ajax({
          url: window.global_config.getReserveMember,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var dataJD = data.jsonData;
              _this.member = data.jsonData;
              _this.member.mobileHref = "tel:" + dataJD.memberMobile;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      getReserveService(){
        let _this = this;
        $.ajax({
          url: window.global_config.getReserveService,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              _this.service = data.jsonData;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      getReserveStaff(){
        let _this = this;
        $.ajax({
          url: window.global_config.getReserveStaff,
          type: "post",
          headers: _this.params,
          data: {orderNo: _this.orderNo},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data.msg)
              _this.staff = data.jsonData;
            } else {
              _this.$cm.checkAuth(data.code);
              console.log(data.msg);
            }
          }
        });
      },
      confirmCancel(){
        let _this = this;
        _this.isCancelShow = false;
//        确认取消
        $.ajax({
          url: window.global_config.updateReserve,
          type: "post",
          headers: _this.params,
          data: {
            'orderNo': _this.orderNo
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              console.log(data);
              _this.$router.push({name: 'order', params: {orderId:3}})
            } else {
              console.log(data.msg);
            }
          }
        });
      }
    },
    props: ['ordersList', 'queryStatus',]
  }
</script>
