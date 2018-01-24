<template>
  <div id="grap">
    <HeadView :status="status"></HeadView>
    <div class="order-content" v-if="$route.meta.grapTitle">
      <!-- <div class="order-tab">
         <a v-for="(item,index) in list" :key="item.id" :class="{'tab-active':(selected==index)}"
            @click.stop.prevent="change(index)">{{item.text}}</a>
       </div>-->
      <tab :line-width=2 active-color='#0080ff' v-model="index" defaultColor="#343434" :class="isFixedSort == true ? 'isFixed' :''">
        <tab-item class="vux-center" :selected="index === idx" v-for="(item, index) in list2" @on-item-click="change"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <div ref="wrapper">
        <div class="wrapper">
          <ServiceType :opts="opt" @sortJob="sortOrder" :pRange="pRange" :ageRange="ageRange" :isprocess="isprocess"
                       :income="income" @tabFix="tabFix" :class="isFixedSort == true ? 'isFixedSort' :''"></ServiceType>
          <swiper v-model="index" :height="height" :show-dots="false" @on-index-change="onIndexChange" ref="swiper">
            <swiper-item v-for="(item, index) in list2" :key="index">
              <div class="tab-swiper vux-center">
                <keep-alive>
                  <GrapLists :jobsList="jobsList" :status="status" :noStaff="noStaff">
                  </GrapLists>
                </keep-alive>
              </div>
              <load-more :show-loading="false" v-show="nomore" tip="我是有底线的" background-color="transparent"></load-more>
            </swiper-item>
          </swiper>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/common";
  .weui-loadmore{
    margin-top:0.5rem!important;
  }
  .vux-swiper {
  }

  .vux-tab-item {
    font-size: .3rem !important;
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import ServiceType from "../template/serviceType"
//  import item0 from "./status/grapAvailable.vue"
//  import item1 from "./status/grapInprocess.vue"
//  import item2 from "./status/grapCompleted.vue"
//  import item3 from "./status/grapCancelled.vue"
  import GrapLists from "@/components/Grap/grapLists.vue"

  import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,LoadMore} from 'vux'
  const list = () => ['可抢单', '处理中', '已完成', '已取消']


  export default{
    data(){
      return {
        list: [
          {text: '可抢单'},
          {text: '处理中'},
          {text: '已完成'},
          {text: '已取消'},
        ],
        noStaff: false,
//        selected: 0,
        currentView: "item0",
        currentIdx:"",
        showOrders: true,
        opt: [],
        idx: Number,
        index: Number,
        list2: list(),
        jobsList: [],
        status: "",
        backgroundObj: {
          red: {
            backgroundColor: '#fb787e',
          },
          green: {
            backgroundColor: "#4ccab4",
          },
          blue: {
            backgroundColor: "#74a6e3",
          },
        },
        height: "9rem",
        pRange: [],
        withOutSelf: "",
        serviceType: "",
        salaryType: "",
        salaryRange: "",
        age: "",
        serviceProvince: "",
        serviceCity: "",
        isprocess: true,
        sortBarFixed: false,
        page: 1,
        xHeight: "",
        fHeight: "",
        phoneH: "",
        jTop: "",
        sw: true,
        totalPage: "",
        sort: false,
        nomore:false,
        from:"",
        isChange:false,
        isFixedSort:false,
        grapNo:"",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.$cm.shareWechat();
//      var idx = this.$route.query.idx || "";
//      console.log("idx:"+idx);
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()

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
        this.currentIdx = index;
      },
      tabFix(isFix){
        if(isFix){
          this.isFixedSort=true;
        }else {
          this.isFixedSort=false;
        }
      },
      handleScroll () {
//        this.scrolled = window.scrollY > 0;
//        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var scTotal = scrollTop + this.phoneH;
        var totalTop = this.jTop + this.xHeight;
//        console.log(this.phoneH,scrollTop,this.jTop);
        var a = totalTop - scTotal;
        if (a < 50&&a>=0) {
          if (this.sw) {
            this.sw = false;
            this.page++;
            this.isChange=false;
            if (this.currentIdx == 0) {
              this.grapAvailableData()
            } else {
              this.grapStatusData();
            }
          }
        }
      },
      onIndexChange(index){
        this.isChange=true;
        console.log("sw" + index)
        this.currentIdx = index;
        this.withOutSelf = "";
        this.serviceType = "";
        this.salaryType = "";
        this.salaryRange = ""
        this.age = "";
        this.serviceProvince = "";
        this.$cm.clearValue();
        console.log(this.from)
        this.grapOrders();
      },
      fetchData(){
        this.grapNo = this.$route.query.grapNo || "";

        console.log(this.grapNo);
        if(this.grapNo!=""){
          this.index = parseInt(this.grapNo);
          this.currentIdx = parseInt(this.grapNo);
        }else {
          this.index = 0;
        }
        this.pRange = this.$cm.getPriceRange();
        this.ageRange = this.$cm.getAgeRange();
        this.income = this.$cm.getServiceIncome();
        this.grapOrders()
      },
//      可抢单列表
      grapAvailableData(){
        console.log(this.currentIdx);
        let _this = this;
        if (this.sort && this.page == 1) {
          _this.jobsList = [];
          _this.nomore=false;
        }
        console.log(_this.totalPage)
        if (_this.totalPage < this.page && _this.totalPage) {
          if(_this.page>1){
            console.log(_this.page)
            _this.nomore=true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.jobsList,
          type: "get",
          headers: _this.params,
          data: {
            page: _this.page,
            rowNum:_this.$cm.pageSize,
            isApplyable: 1,
            jobStatus: 1,
            withOutSelf: _this.withOutSelf,
            serviceType: _this.serviceType,
            salaryType: _this.salaryType,
            age: _this.age,
            serviceProvince: _this.serviceProvince,
            serviceCity: _this.serviceCity,
            salaryRange: _this.salaryRange
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                let dataJD = data.jsonData;
                _this.totalPage = dataJD.total;
                var jobList=[]
                if(_this.page==1){
                  jobList=jobList.concat(dataJD.rows);
                  _this.jobsList =jobList;
                }else {
                  _this.jobsList = _this.jobsList.concat(dataJD.rows);
                }
                if (_this.jobsList == "") {
                  _this.noStaff = true;
                  _this.nomore=false;
                } else {
                  _this.noStaff = false;
                  for (var idx in _this.jobsList) {
                    var objs = _this.jobsList[idx];
                    var obj = objs.serviceTypeValue;
                    if (obj == "月嫂" || obj == "育儿嫂") {
                      objs.serviceStyle = _this.backgroundObj.red
                    } else if (obj == "保姆" || obj == "钟点工" || obj == "家庭管家") {
                      objs.serviceStyle = _this.backgroundObj.green
                    } else if (obj == "医院护工" || obj == "老人陪护") {
                      objs.serviceStyle = _this.backgroundObj.blue
                    }
                  }
                  _this.status = 6;
                  _this.loadHeight();
                  _this.sw = true;
                }
                this.sort = false;
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
//      处理中，已完成，已取消列表
      grapStatusData(){
        let _this = this;
        if (this.sort && this.page == 1) {
          _this.jobsList = [];
        }
        if (_this.totalPage < this.page && _this.totalPage!="") {
          if(_this.page>1){
            _this.nomore=true;
          }
          return;
        }
        $.ajax({
          url: window.global_config.apply,
          type: "get",
          headers: _this.params,
          data: {
            page: _this.page,
            rowNum: _this.$cm.pageSize,
            status: _this.status,
            serviceType: _this.serviceType,
            salaryType: _this.salaryType,
            age: _this.age,
            serviceProvince: _this.serviceProvince,
            serviceCity: _this.serviceCity,
            salaryRange: _this.salaryRange
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                var dataJD = data.jsonData;
                console.log(dataJD)
                _this.totalPage = dataJD.total;
//                _this.jobsList = [];
                var temp = dataJD.rows;
                if (temp == "") {
                  _this.noStaff = true;
                  _this.nomore=false;
                } else {
                  _this.noStaff = false;
                  var jobList=[]
                  for (var idx in temp) {
                    var objs = temp[idx].jobInfo;
                    var statusGrap = temp[idx].status;
                    var grapId = temp[idx].id;
                    objs.statusGrap = statusGrap;
                    objs.id = grapId;
                    var obj = objs.serviceTypeValue;
                    if (obj == "月嫂" || obj == "育儿嫂") {
                      objs.serviceStyle = _this.backgroundObj.red
                    } else if (obj == "保姆" || obj == "钟点工" || obj == "家庭管家") {
                      objs.serviceStyle = _this.backgroundObj.green
                    } else if (obj == "医院护工" || obj == "老人陪护") {
                      objs.serviceStyle = _this.backgroundObj.blue
                    }
                    if(_this.page==1){
                      jobList=jobList.concat(objs);
                      console.log(_this.jobsList);
                      _this.jobsList =jobList;
                      console.log(objs);
                    }else {
                      _this.jobsList =_this.jobsList.concat(objs);
                    }
                  }
                  _this.sw = true;
                }
                _this.loadHeight();
                this.sort = false;
//            简历状态
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
      //      加载高度
      loadHeight(){
        let _this = this;
        _this.$nextTick(() => {
//          console.log(height)
          if(_this.$refs.swiper){
            var e = this.$refs.swiper.$el;
            var i = this.$refs.swiper.current;
          // DOM 现在更新了
            // `this` 绑定到当前实例
            var el = $(e).find(".vux-swiper-item").eq(i).find(".grapLists");
            var h = el.height();
            var dH=document.documentElement.clientHeight;
            var jlbH=$(".jlb-filter").outerHeight();
            var h3H=$("h3").outerHeight();
            var vtabH=$(".vux-tab").outerHeight();
            var fH=$("#footer").outerHeight();
            var diff=dH-jlbH-h3H-vtabH;
            var tototH=jlbH+h3H+vtabH+fH;
            console.log(diff,tototH);
            var t=diff-tototH;
            console.log(h)

            if (h > diff) {
              _this.$refs.swiper.xheight = h + 100 + "px";
              this.xHeight = h + 100;
            }else if(h<=diff&&h>t){
              _this.$refs.swiper.xheight = h + 300 + "px";
              this.xHeight = h + 300;
            } else {
              _this.$refs.swiper.xheight = diff-100+"px";
//              _this.$refs.swiper.xheight = _this.height;
            }
          }
        })
      },
//      筛选订单
      sortOrder(opts){
        console.log(this.currentIdx);
        console.log(opts);
        this.$nextTick(() => {
          this.serviceType = $("#sortService p.service-on").data("code");
          this.education = $("#sortEducation p.service-on").data("code");
          this.nativePlace = $("#sortNative p.service-on").data("code");
          this.age = $("#sortAgeRange p.service-on").data("code");
          this.serviceProvince = $(".provice li.area-on").data("code");
          this.serviceCity = $(".city li.area-on").data("code");
          var status = $("#sortResumeStatus p.service-on").data("code");
          if ($(".price_content p.service-on").length > 0) {
            this.salaryType = $("#salaryType li.active").data("code");
            this.salaryRange = $(".price_content p.service-on").data("code");
          } else {
            this.salaryType = ""
            this.salaryRange = ""
          }
          this.sort = true;
          this.page = 1;
          this.totalPage = "";
          if (status) {
            this.status = status;
          }
          if (this.currentIdx == 0) {
            this.grapAvailableData();
          } else if (this.currentIdx == 1) {
            this.grapStatusData();
          } else if (this.currentIdx == 2) {
            this.status = 4;
            this.grapStatusData();
          } else if (this.currentIdx == 3) {
            this.grapStatusData();
          }
        })
      },
//      抢单
      grapOrders(){
        this.page = 1;
        this.jobsList = [];
        if (this.currentIdx == 0) {
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '价格预算', href: "#sortPrice", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
            {name: "年龄要求", href: "#sortAgeRange", isChecked: false},
          ],
            this.grapAvailableData();
        } else if (this.currentIdx == 1) {
          this.status = 12;
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '价格预算', href: "#sortPrice", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
            {name: "订单状态", href: "#sortResumeStatus", isChecked: false},
          ],
            this.isprocess = true;
          this.grapStatusData();
        } else if (this.currentIdx == 2) {
          this.status = 4;
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '价格预算', href: "#sortPrice", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
          ],
            this.grapStatusData();
        } else if (this.currentIdx == 3) {
          this.status = 35;
          this.opt = [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '价格预算', href: "#sortPrice", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
            {name: "订单状态", href: "#sortResumeStatus", isChecked: false},
          ],
            this.isprocess = false;
          this.grapStatusData();
        }
      }
    },
    watch: {
      $route(to, from){
        this.from=from;
        console.log(from)
        this.fetchData(from)
      }
    },
    components: {
      ServiceType,
      HeadView,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      GrapLists,
      LoadMore
    },
    props: ['']
  }
</script>
