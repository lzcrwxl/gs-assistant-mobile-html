<template>
  <div id="order">
    <div v-if="$route.meta.showOrders">
      <h3>我的订单
          <router-link :to="{name:'createOrder'}">创建订单</router-link>
      </h3>
      <div class="order-content" style="height:11rem">
        <tab :line-width=2 active-color='#0080ff' v-model="index" defaultColor="#343434" :class="isFixedSort == true ? 'isFixed' :''">
          <tab-item class="vux-center" :selected="index === idx" v-for="(item, index) in list2"
                    @on-item-click="change"
                    :key="index">{{item}}
          </tab-item>
        </tab>
        <div ref="wrapper">
          <div class="wrapper">
            <ServiceType :opts="opt" @sortJob="sortJob" v-show="queryStatus!='detail'" id="sort" @tabFix="tabFix" :class="isFixedSort == true ? 'isFixedSort' :''"></ServiceType>
            <swiper v-model="index" :height="height" :show-dots="false" @on-index-change="onIndexChange"
                    @on-get-height="onHeightChange" ref="swiper">
              <swiper-item v-for="(item, index) in list2" :key="index">
                <div class="tab-swiper vux-center">
                  <keep-alive>
                    <OrderLists :ordersList="ordersList" :status="status" :noStaff="noStaff"></OrderLists>
                  </keep-alive>
                </div>
                <load-more :show-loading="false" v-show="nomore" tip="我是有底线的"
                           background-color="transparent"></load-more>
              </swiper-item>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
    <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/order";

</style>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, LoadMore} from 'vux'
  import OrderLists from "@/components/Order/lists/orderLists.vue"

  import Bscroll from 'better-scroll'

  import ServiceType from "../template/serviceType"
  //  import OrderLists from "./lists/orderLists"
//  import item0 from "./status/newOrders.vue"
//  import item1 from "./status/ordersInProcess.vue"
//  import item2 from "./status/ordersCompleted.vue"
//  import item3 from "./status/ordersCancelled.vue"

  const list = () => ['新订单', '处理中', '已完成', '已取消']

  export default{
    data(){
      return {
        list: [
          {text: '新订单'},
          {text: '处理中'},
          {text: '已完成'},
          {text: '已取消'},
        ],
        idx: Number,
        currentView: null,
        showOrders: true,
        opt: [
          {name: '服务工种', href: "#sortService", isChecked: false},
          {name: '订单来源', href: "#sortSource", isChecked: false},
          {name: "订单状态", href: "#sortOrderStatus", isChecked: false},
          {name: "服务区域", href: "#sortArea", isChecked: false},
        ],
        list2: list(),
        index: Number,
        ordersList: [],
        currentIdx: "",
        queryStatus: "",
        status: "",
        height: "9rem",
        serviceItemCode: "",
        orderSource: "",
        orderStatus: "",
        serviceProvince: "",
        page: 1,
        xHeight: "",
        fHeight: "",
        phoneH: "",
        jTop: "",
        scrolled: false,
        sortBarFixed: false,
        noStaff: false,
        sw: true,
        totalPage: "",
        sort: false,
        orderNo: "",
        i: 0,
        nomore: false,
        hc: "",
        from:"",
        isFixedSort:false,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData();
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
      if (document.querySelector('.jlb-filter')) {
        this.fHeight = $(".jlb-filter").outerHeight();
        this.jTop = document.querySelector('.jlb-filter').offsetTop;
      }
      this.phoneH = $(window).height();
    },
    methods: {
      change(index){
//        this.selected = index;
//        this.currentView = 'item' + index;
        this.currentIdx = index;
      },
      onIndexChange(index){
        console.log(this.i)
        console.log("onIdx")
        console.log(index)
        this.currentIdx = index;
        console.log(this.from)
        var orderId=this.$route.params.orderId
        console.log(orderId);
        if (this.i == 0 && index != 0&&orderId!=0) {
          this.i++;
        } else {
          this.orderNo = "";
          this.i++;
          this.processData();
        }
      },
      onHeightChange(height){
        console.log(height)
//        this.height=height;
      },
      hideHead(path){
        if (path.indexOf('home') != -1) {
          console.log(path)
          this.showOrders = true
        } else {
          this.showOrders = false
        }
      },
      tabFix(isFix){
       /* if(this.ordersList.length!=4){
          if(isFix){
            this.isFixedSort=true;
          }else {
            this.isFixedSort=false;
          }
        }*/
        if(isFix){
          this.isFixedSort=true;
        }else {
          this.isFixedSort=false;
        }
      },
      modifyCtn(from, to){
        if (from.indexOf('detail') != -1 && to.indexOf('modifyOrder') != -1) {
          console.log(from, to)
          this.$store.dispatch('modifyCtn', {priceShow: false})
        } else {
          this.$store.dispatch('modifyCtn', {priceShow: true})
        }
      },
      fetchData(from){
        let currentId = this.$route.params.orderId;
        this.orderNo = this.$route.query.orderNo || "";
        console.log(this.orderNo);
        this.index = parseInt(currentId);
        this.currentIdx = parseInt(currentId)
        this.processData();
      },
      processData(){
        console.log(this.ordersList)
        //        重置页面
        this.page = 1;
        this.ordersList = [];
        this.queryStatus = "";
        this.serviceItemCode = "";
        this.orderSource = "";
        this.orderStatus = "";
        this.serviceProvince = "";
        this.serviceCity = "";
        this.$cm.clearValue();
        if (this.currentIdx == 0) {
          this.queryStatus = "detail";
          this.status = "detail"
          this.opt = [];
          this.newReserveData();
        } else if (this.currentIdx == 1) {
          this.queryStatus = "process";
          this.status = 'process'
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '订单来源', href: "#sortSource", isChecked: false},
            {name: "订单状态", href: "#sortOrderStatus", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
          ];
          this.inprocessData()
        } else if (this.currentIdx == 2) {
          this.queryStatus = "finish";
          this.status = 'process';
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '订单来源', href: "#sortSource", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
          ];
          this.inprocessData()
        } else if (this.currentIdx == 3) {
          this.queryStatus = "cancel";
          this.status = 'process'
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '订单来源', href: "#sortSource", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
          ];

          this.inprocessData()
        }

      },
      //      新订单
      newReserveData(){
        let _this = this;
        if (_this.totalPage < this.page && _this.totalPage) {
          if (_this.page > 1) {
            _this.nomore = true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.getReserveOrdersList,
          type: "post",
          headers: _this.params,
          data: {
            pageNumber: _this.page,
            pageSize: _this.$cm.pageSize,
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              console.log(data);
              let dataJD = data.jsonData;
              _this.totalPage = dataJD.total;
              var odersList=[];
              if(_this.page==1){
                odersList=odersList.concat(dataJD.rows);
                _this.ordersList =odersList;
              }else {
                _this.ordersList = _this.ordersList.concat(dataJD.rows);
              }
              if (_this.ordersList == "") {
                _this.noStaff = true;
                _this.nomore=false;
              } else {
                _this.noStaff = false;
                for (var i in _this.ordersList) {
                  _this.ordersList[i].orderSource = "02";
                }
                _this.ordersList = _this.$cm.classifyColor(_this.ordersList);
                console.log(_this.ordersList);
                _this.sw = true;
              }
              _this.loadHeight();
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      处理中数据
      inprocessData(){
//        筛选搜索
        let _this = this;
        if (this.sort && this.page == 1) {
          _this.ordersList = [];
          _this.nomore = false;
        }
        console.log(_this.totalPage);
        console.log(this.page)
        if (_this.totalPage < this.page && _this.totalPage) {
          if (_this.page > 1) {
            console.log(_this.page)
            _this.nomore = true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.ordersList,
          type: "post",
          headers:_this.params,
          data: {
            pageNumber: _this.page,
            pageSize:_this.$cm.pageSize,
            queryStatus: _this.queryStatus,
            serviceItemCode: _this.serviceItemCode,
            orderSource: _this.orderSource,
            orderStatus: _this.orderStatus,
            serviceProvince: _this.serviceProvince,
            serviceCity: _this.serviceCity,
            orderNo: _this.orderNo
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              let dataJD = data.jsonData;
              _this.totalPage = dataJD.total;
              var temp = dataJD.rows;
              if (temp == "") {
                _this.noStaff = true;
                _this.nomore=false;
              } else {
                _this.noStaff = false;
                var odersList=[];
                if(_this.page==1){
                  odersList=odersList.concat(_this.$cm.classifyColor(temp));
                  _this.ordersList =odersList;
                }else {
                  _this.ordersList = _this.ordersList.concat(_this.$cm.classifyColor(temp))
                }
                _this.sw = true;
              }
              _this.loadHeight();
              _this.sort = false;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      加载高度
      loadHeight(){
        let _this = this;
        _this.$nextTick(()=> {
          if(_this.$refs.swiper){
            var e = this.$refs.swiper.$el;
            // DOM 现在更新了
            // `this` 绑定到当前实例
            var i = this.$refs.swiper.current;
            var el = $(e).find(".vux-swiper-item").eq(i).find(".order-lists");
            var h = el.height();
            var dH=document.documentElement.clientHeight;
            var jlbH=$(".jlb-filter").outerHeight();
            var h3H=$("h3").outerHeight();
            var vtabH=$(".vux-tab").outerHeight();
            var fH=$("#footer").outerHeight();
            var diff=dH-jlbH-h3H-vtabH;
            var tototH=jlbH+h3H+vtabH+fH;
//            console.log(diff,tototH);
            var t=diff-tototH;
//            console.log(h);

            if (h > diff) {
              _this.$refs.swiper.xheight = h + 100 + "px";
              this.xHeight = h + 100;
            }else if(h<=diff&&h>t){
              _this.$refs.swiper.xheight = h + 300 + "px";
              this.xHeight = h + 300;
            }else {
              _this.$refs.swiper.xheight = diff-100+"px";
            }
          }
        })
      },
//      筛选
      sortJob(opts){
        let _this = this;
        console.log(opts);
        _this.opts = opts;
        this.$nextTick(function () {
          _this.serviceItemCode = $("#sortService p.service-on").data("code");
          _this.orderSource = $("#sortSource p.service-on").data("code");
          _this.orderStatus = $("#sortOrderStatus p.service-on").data("code");
          _this.serviceProvince = $(".provice li.area-on").data("code");
          _this.serviceCity = $(".city li.area-on").data("code");
          this.sort = true;
          this.page = 1;
          this.totalPage = "";
          _this.inprocessData();
        })
      },
      handleScroll () {
        // 判断是否滚动到底部
        // 设置一个开关来避免重负请求数据
        this.scrolled = window.scrollY > 0;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var scTotal = scrollTop + this.phoneH;
        var totalTop = this.jTop + this.xHeight;
        var a = totalTop - scTotal;
        var dH=document.documentElement.clientHeight;
        var jlbH=$(".jlb-filter").outerHeight();
        var h3H=$("h3").outerHeight();
        var vtabH=$(".vux-tab").outerHeight();
//        console.log(jlbH,vtabH,dH,h3H)

//        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        if (a < 50 &&a >= 0) {
          if (this.sw) {
            this.sw = false;
            this.page++;
            if (this.currentIdx == 0) {
              this.newReserveData()
            } else {
              this.inprocessData();
            }
          }
        }
      },
    },
    watch: {
      $route(to, from){
        console.log(from.name, to.name);
        let path = this.$route.path.substring(1);
        this.hideHead(path);
        this.modifyCtn(from.name, to.name);
        this.ordersList = [];
        this.fetchData(from)
        this.from=from.name;
      }
    },

    components: {
      ServiceType,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      OrderLists,
      LoadMore,
    },
    props: ['orderId']
  }
</script>
