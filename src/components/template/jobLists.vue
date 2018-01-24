<template>
  <div>
    <ServiceType :opts="opts" @sortJob="sortJob" :class="sortBarFixed == true ? 'isFixed' :''"></ServiceType>
    <ul class="job-lists" v-show="!noStaff">
      <router-link class="job-item" :to="{name:'jobRelease', params:{jobId:item.id}}" tag="li"
                   v-for="(item,index) in jobsList" :data-id="item.id" :key="index">
        <img src="../../assets/img/icons/soldout.png" alt="" class="sold-out" v-show="item.status==0">
        <div class="dib service mr30" :style="item.serviceStyle">
          <p>{{item.serviceTypeValue}}</p>
          <div>{{item.serviceMoldValue}}</div>
        </div>
        <div class="order-detail dib mt5">
          <div class="line01">
            <h4 class="f34 dib">{{item.positionName}} <img src="../../assets/img/icons/urgent.png" class="urgent"
                                                           v-show="item.emsSign==1"></h4>
            <div class="time f26 g8 dib">{{item.modifyTime|formateTime}}</div>
          </div>
          <div class="mt30 lin02">
            <p class="f34 price-unit">{{item.salary}}{{item.salaryTypeValue}}</p>
            <div class="address g8 f26">
              {{item.serviceProvinceValue}}-{{item.serviceCityValue}}-{{item.serviceAreaValue}}
            </div>
          </div>
        </div>
      </router-link>
    </ul>
    <load-more :show-loading="false" v-show="nomore" tip="我是有底线的" background-color="transparent"></load-more>
    <div class="noStaff" v-show="noStaff">
      暂无内容~
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .weui-loadmore_line{
    margin-top:-1.5rem!important;
  }
  .noStaff{
    background: url("../../assets/img/noCtn.png")no-repeat center 2rem!important;
    background-size: 1.68rem 1.57rem!important;
    padding-top:3.8rem!important;
    height:5rem!important;
  }
  @import '../../assets/css/common';
  .job-lists {
    margin-top: .3rem;
    /*padding: 0 .3rem;*/
    .job-item {
      background: #ffffff;
      margin: .24rem 0;
      position: relative;
      &:not(:last-child) {
        /*border-bottom: 1px solid #efeff4;*/
      }
      .sold-out {
        width: .75rem;
        height: .75rem;
        position: absolute;
        right: 0;
        top: 0;
      }
      padding: .24rem .3rem;
      display: flex;
      .service {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.12rem;
        width: 1.12rem;
        height: 1.12rem;
        color: #ffffff;
        text-align: center;
        p {
          margin-top: .3rem;
          font-size: .24rem;
          text-shadow: .04rem .04rem .05rem rgba(0, 0, 0, .28);
        }
        div {
          font-size: .2rem;
          margin-top: .12rem;
        }
      }
      .order-detail {
        flex-grow: 1;
        .line01 {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          h4 {
            width: 4rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            /*font-size: 0;*/
            .urgent {
              width: .3rem;
              height: .3rem;
              margin-left: .1rem;
              margin-top: .02rem;
            }
          }
        }
        .lin02 {
          .line01;
          .price-unit {
            font-size: .34rem;
            color: #ff5f58;
          }
          .address {
            display: inline-block;
          }
        }
      }
      &:last-child {
        margin-bottom: 2rem;
      }
    }
  }
</style>
<script>
  import ServiceType from "components/template/serviceType.vue"
  import {LoadMore} from 'vux'

  export default{
    data(){
      return {
        jobsList: [],
        backgroundObj: {
          red: {
            backgroundImage: "url(" + require("@/assets/img/red.png") + ")",
          },
          green: {
            backgroundImage: "url(" + require("@/assets/img/green.png") + ")",
          },
          blue: {
            backgroundImage: "url(" + require("@/assets/img/blue.png") + ")",
          },
        },
        opts: [
          {name: '服务工种', href: "#sortService", isChecked: false},
          {name: '业务员', href: "#sortStaff", isChecked: false},
          {name: "是否上架", href: "#sortStatus", isChecked: false},
//          {name:"刷新日期",href:"#sortDate",isChecked:false},
        ],
        serviceType: "",
        queryUserId: "",
        jobStatus: "",
        serviceType: "",
        sortStatus: "",
        page:1,
        xHeight:"",
        fHeight:"",
        phoneH:"",
        jTop:"",
        scrolled: false,
        sortBarFixed:false,
        noStaff:false,
        sw:true,
        totalPage:"",
        sort:false,
        rowNum:6,
        nomore:false,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created(){
      this.fetchData();
    },
    components: {
      ServiceType,
      LoadMore
    },
    methods: {
      fetchData(){
        let _this = this;
        this.processData();
      },
      processData(){
        let _this=this;
        if(this.sort&&this.page==1){
          _this.jobsList=[];
          _this.nomore=false;
        }
        console.log(_this.totalPage)
        console.log(_this.page)
        if(_this.totalPage<_this.page&&_this.totalPage){
          if(_this.page>1){
            _this.nomore=true;
          }
          return;
        }

        $.ajax({
          url: window.global_config.jobsList,
          type: "get",
          headers: _this.params,
          data: {
            onlySelf: 1,
            visualExtend: 0,
            serviceType: _this.serviceType,
            queryUserId: _this.queryUserId,
            jobStatus:  _this.sortStatus,
            page: _this.page,
            rowNum:_this.rowNum,
//            modifyTime:modifyTime
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              console.log(data)
              let dataJD = data.jsonData;
              _this.totalPage=dataJD.total;
              _this.toUrl=dataJD.toUrl;
              _this.$emit('toUrl',_this.toUrl)
              _this.jobsList = _this.jobsList.concat(dataJD.rows);
              if(_this.jobsList==""){
                _this.noStaff=true;
                _this.nomore=false;
              }else {
                var strId=[]
                _this.noStaff=false;
                for (var idx in _this.jobsList) {
                  var objs = _this.jobsList[idx];
                  var id=objs.id;
                  strId.push(id);
                  var obj = objs.serviceTypeValue;
                  if (obj == "月嫂" || obj == "育儿嫂") {
                    objs.serviceStyle = _this.backgroundObj.red
                  } else if (obj == "保姆" || obj == "钟点工" || obj == "家庭管家") {
                    objs.serviceStyle = _this.backgroundObj.green
                  } else if (obj == "医院护工" || obj == "老人陪护") {
                    objs.serviceStyle = _this.backgroundObj.blue
                  }
                }
                var strIds=strId.toString();
//                console.log(strIds);
                _this.$emit("getIds",strIds)
              }
              _this.sw=true;
              _this.sort=false;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      sortJob(opts){
        let _this = this;
        console.log(opts)
        this.$nextTick(function () {
          _this.serviceType = $("#sortService p.service-on").data("code");
          _this.queryUserId = $("#sortStaff p.service-on").data("code");
          _this.sortStatus = $.trim($("#sortStatus p.service-on").data("code"));
          _this.sort=true;
          _this.page=1;
          _this.totalPage="";
          _this.processData();
        })
      },
      handleScroll () {
        // 判断是否滚动到底部
        // 设置一个开关来避免重负请求数据
        this.scrolled = window.scrollY > 0;
/*        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(document.querySelector('.jlb-filter')){
          var offsetTop = document.querySelector('.jlb-filter').offsetTop
          if (scrollTop > offsetTop) {
            this.sortBarFixed = true
          } else {
            this.sortBarFixed = false
          }
        }*/

        var a=$(document).height()-$(window).height()-$(window).scrollTop();
        if(a<30&&a>=0){
          if(this.sw){
            this.sw=false;
            this.page++;
            this.processData();
          }
        }
      },
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
      this.fHeight=$(".jlb-filter").outerHeight();
      this.jTop = document.querySelector('.jlb-filter').offsetTop;
      this.phoneH = $(window).height();
    },
  }
</script>
