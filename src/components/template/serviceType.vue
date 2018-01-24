<template>
  <div :class="sortBarFixed == true ? 'isFixed' :''">
    <div class="mask" @touchmove.prevent v-show="isMask" @click.stop.prevent="closeMask"></div>
    <div class="jlb-filter clearfix" :class="isMask == true&&sortBarFixed==true ? 'isFixed' :''">
      <div class="sort">
        <a class="sortType" v-for="(item,index) in opts" :key="index"
           @click.stop.prevent="sort(index,$event)" :href="item.href"
           :class="[currentIdx==index&&item.isChecked==true?'type-on':'']"><span>{{item.name}}</span>
          <img :src="src.up" v-if="currentIdx==index&&item.isChecked==true"/>
          <img :src="src.down" v-else/>
        </a>
      </div>
      <!--服务工种-->
      <div class="sortCondition dn" id="sortService">
        <p @click.stop.prevent="checkType(index,$event,types)" v-for="(type,index) in types" :key="index"
           :class="[serviceIdx==index?'service-on':'']" :data-code="type.code" :data-sort="type.sort">
          {{type.serviceType}}
          <img :src="src.checked" v-show="serviceIdx==index"/>
        </p>
      </div>
      <!--经验-->
      <div class="sortCondition dn" id="sortExperience">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in expUpdate" :key="index"
           :class="[expIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="expIdx==index"/>
        </p>
      </div>
      <!--订单来源-->
      <div class="sortCondition dn" id="sortSource">
        <p @click.stop.prevent="checkType(index,$event,orderSource)" v-for="(item,index) in orderSource" :key="index"
           :class="[sourceIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="sourceIdx==index"/>
        </p>
      </div>
      <!--学历-->
      <div class="sortCondition dn" id="sortEducation">
        <input type="hidden" name="education">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in eduUpdate" :key="index"
           :class="[eduIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="eduIdx==index"/>
        </p>
      </div>
      <!--籍贯-->
      <div class="sortCondition dn" id="sortNative">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in nativeUpdate" :key="index"
           :class="[nativeIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="nativeIdx==index"/>
        </p>
      </div>
      <!--订单状态-->
      <div class="sortCondition dn" id="sortOrderStatus">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in orderStatus" :key="index"
           :class="[orderStatusIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="orderStatusIdx==index"/>
        </p>
      </div>
      <!--简历箱状态-->
      <div class="sortCondition dn" id="sortResumeStatus">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in rStatus" :key="index"
           :class="[rStatusIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort"
           v-if="isprocess?index<3:index>=3">
          {{item.name}}
          <img :src="src.checked" v-show="rStatusIdx==index"/>
        </p>
      </div>
      <!--简历箱全部状态-->
      <div class="sortCondition dn" id="sortRStatusAll">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in rStatusAll" :key="index"
           :class="[rsAllIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}
          <img :src="src.checked" v-show="rsAllIdx==index"/>
        </p>
      </div>
      <!--价格预算-->
      <div class="sortCondition sortPrice dn" id="sortPrice">
        <div class="price_tab">
          <ul id="salaryType">
            <li :class="[salaryUnit==index?'active':'']" v-for="(item,index) in income" :data-code="item.id"
                @click="changSalaryUnit(index)">{{item.value}}
            </li>
            <!--<li>按天</li>-->
            <!--<li>按小时</li>-->
          </ul>
        </div>
        <div class="price_content_box">
          <div class="price_content" v-for="(item,index) in income" v-show="index==salaryUnit">
            <p data-code="" @click="changSalaryValue">全部<img src=""/></p>
            <p :data-code="m.id" v-for="(m,i) in item.ceList" @click="changSalaryValue">{{m.value}}<img src=""/></p>
            <!--<p data-salary="">4000-7000元<img :src="src.checked"/></p>-->
            <!--<p data-salary="">7000-10000元<img :src="src.checked"/></p>-->
            <!--<p data-salary="">10000-15000元<img :src="src.checked"/></p>-->
            <!--<p data-salary="">15000元以上<img :src="src.checked"/></p>-->
          </div>
          <!--<div class="price_content dn">
            <p class="mf-on" data-sercode="">全部<img :src="src.checked"/></p>
            <p data-salary="" v-for="(m,i) in income[1].ceList">200元以下<img :src="src.checked"/></p>
            &lt;!&ndash;<p data-salary="">200-500元<img :src="src.checked"/></p>
            <p data-salary="">500-800元<img :src="src.checked"/></p>
            <p data-salary="">800-100元<img :src="src.checked"/></p>
            <p data-salary="">1000元以上<img :src="src.checked"/></p>&ndash;&gt;
          </div>
          <div class="price_content dn">
            <p class="mf-on" data-sercode="">全部<img :src="src.checked"/></p>
            <p data-salary="">60元以下<img :src="src.checked"/></p>
            <p data-salary="">60-90元<img :src="src.checked"/></p>
            <p data-salary="">90-120元<img :src="src.checked"/></p>
            <p data-salary="">120-150元<img :src="src.checked"/></p>
            <p data-salary="">150元以上<img :src="src.checked"/></p>
          </div>-->
        </div>
      </div>
      <!--地区选择-->
      <div class="sortCondition area_sp dn" id="sortArea">
        <input type="hidden" name="serviceProvice" value="">
        <input type="hidden" name="serviceCity" value="">
        <div id="area_sp">
          <div class="provice">
            <ul>
              <li v-for="(item,index) in proviceData" :data-code="item.areaCode" @click="selectProvice">
                {{item.areaName}}
              </li>
            </ul>
          </div>
          <div class="city" v-show="isCity">
            <ul>
              <li v-for="(item,index) in cityData" :data-code="item.areaCode"
                  @click.stop.prevent="checkType(index,$event)">{{item.areaName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--更多-->
      <div class="sortCondition dn" id="sortMore">
        <div class="more_list" id="sortAge">
          <h1>年龄</h1>
          <ul>
            <li @click="sortMore" v-for="(item,index) in ageRange" :data-code="item.code">{{item.value}}</li>
            <!--<li data-age="2">29-39岁</li>-->
            <!--<li data-age="3">39-49岁</li>-->
            <!--<li data-age="4">50岁以上</li>-->
          </ul>
        </div>
        <div class="more_list" id="sortZodiac">
          <h1>属相</h1>
          <ul>
            <li v-for="(item,index) in zodic" :data-code="item.code" @click="sortMore">{{item.name}}</li>
            <!--<li data-age="2">牛</li>
            <li data-age="3">虎</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>
            <li data-age="4">兔</li>-->
          </ul>
        </div>
        <div class="more_list" id="sortState">
          <h1>上下架</h1>
          <ul>
            <li data-code="1" @click="sortMore">上架</li>
            <li data-code="0" @click="sortMore">下架</li>
          </ul>
        </div>
        <div class="button_box">
          <button class="clear btn-default" @click="clear">清除</button>
          <button class="confirm btn-fill" @click="confirm">确定</button>
        </div>
      </div>
      <!--业务员-->
      <div class="sortCondition dn" id="sortStaff">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in tenatsUsers" :key="index"
           :class="[staffIdx==index?'service-on':'']" :data-code="item.id" :data-sort="item.sort">
          {{item.loginName}}<img v-show="staffIdx==index" :src="src.checked"/></p>
      </div>
      <!--是否上架-->
      <div class="sortCondition dn" id="sortStatus">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in jobStatus" :key="index"
           :class="[statusIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.name}}<img v-show="statusIdx==index" :src="src.checked"/></p>
      </div>
      <!--年龄要求-->
      <div class="sortCondition dn" id="sortAgeRange">
        <p @click.stop.prevent="checkType(index,$event)" v-for="(item,index) in ageUpdate" :key="index"
           :class="[ageIdx==index?'service-on':'']" :data-code="item.code" :data-sort="item.sort">
          {{item.value}}
          <img :src="src.checked" v-show="ageIdx==index"/>
        </p>
      </div>

      <!--刷新日期-->
      <!--<div class="sortCondition dn" id="sortDate">
        <input type="date">
      </div>-->
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .price_content{
    p{
      img{
        display: none;
      }
    }
  }
  .jlb-filter {
    z-index: 90;
    background: #ffffff;
    border-bottom: 2px solid #E6E6E6;
    position: relative;
    padding: .16rem .3rem;
    font-size: .26rem;
    .sort {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .sortType {
        box-sizing: border-box;
        display: block;
        width: 1.6rem;
        line-height: .56rem;
        height: .56rem;
        border: 1px solid #efeff4;
        background-color: #efeff4;
        text-align: center;
        border-radius: .12rem;
        font-size: .26rem;
        color: #4c4c4c;
        img {
          margin-left: .2rem;
          vertical-align: middle;
          width: .12rem;
          height: .06rem;
        }
      }

    }
    #sortNative{
      height: 6rem;
      overflow: auto;
    }
    .sortCondition {
      position: absolute;
      padding: 0 .3rem;
      background-color: #FFFFFF;
      left: 0;
      top: 0.9rem;
      width: 100%;
      box-sizing: border-box;
      /*display: none;*/
      z-index: 100;
      p {
        height: .88rem;
        border-bottom: 1px solid #F0F0F0;
        line-height: .88rem;
        position: relative;
        img {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -.09rem;
          width: .26rem;
          height: .18rem;
          /*display: none;*/
        }
      }
      .price_tab {
        border-bottom: 1px solid #F0F0F0;
        ul {
          display: flex;
          display: -webkit-flex;
          li {
            flex: 1;
            text-align: center;
            height: .88rem;
            line-height: .88rem;
            color: #4c4c4c;
            font-size: .26rem;
            border-bottom: 3px solid transparent;
            margin-bottom: -2px;
          }
          .active {
            border-bottom: 3px solid @blue;
            margin-bottom: -2px;
          }
        }
      }
    }
    /**地区选择*!*/
    .area_sp {
      height: 8rem;
      padding: 0;
      #area_sp {
        display: flex;
        height: 100%;
        display: -webkit-flex;
        .provice {
          background-color: #fafafa;
          li {
            padding-left: .3rem;
            border-bottom: 1px solid #fafafa;
          }
        }
        .city {
          background-color: #fff;
          padding: 0 .3rem 0 .2rem;
          li {
            border-bottom: 1px solid #F0F0F0;
          }
        }
        div {
          overflow-y: auto;
          flex: 1;
          box-sizing: border-box;
          ul {
            width: 100%;
            li {
              height: .88rem;
              line-height: .88rem;
              font-size: .24rem;
            }
          }
          /*display: none;*/
        }
      }
    }

    #sortMore {
      .more_list {
        border-bottom: 1px solid #efefef;
        padding-bottom: 0.22rem;
        h1 {
          color: #4c4c4c;
          font-size: .26rem;
          padding: .3rem 0;
        }
        ul {
          /*display: flex;*/
          /*justify-content: space-between;*/
          /*flex-wrap: wrap;*/
          overflow: hidden;
          margin-right: -.3rem;
          li {
            text-align: center;
            float: left;
            height: .56rem;
            line-height: .56rem;
            width: 1.6rem;
            font-size: .26rem;
            border: 1px solid #f7f7fa;
            border-radius: .12rem;
            margin-right: .16rem;
            margin-bottom: .18rem;
            background: #f7f7fa;
            color: #888888;
          }
        }
      }
    }
  }

  .area-on {
    color: @blue !important;
    background-color: #fff !important;
  }

  .mf-on {
    color: @blue !important;
    border-color: @blue !important;
  }

  .type-on {
    .mf-on;
    background: #ffffff !important;
  }

  /*工种选择*/
  .service-on {
    color: @blue !important;
  }
</style>
<script>
  export default{
    data(){
      return {
        src: {
          up: require('assets/img/icons/up.png'),
          down: require('assets/img/icons/down.png'),
          checked: require('assets/img/icons/hook.png'),
        },
        params:{
          token:localStorage.getItem('token'),
        },
        routname: "",
        currentIdx: null,
        currentStatus: false,
        sortBarFixed: false,
        tabBarFixed: false,
        itemIdx: null,
        sourceIdx: 0,
        serviceIdx: 0,
        staffIdx: "",
        statusIdx: "",
        orderStatusIdx: 0,
        eduIdx: 0,
        nativeIdx: 0,
        prIdx: 0,
        ageIdx: 0,
        isCity: false,
        rStatusIdx: 0,
        rsAllIdx: 0,
        salaryUnit: 0,
        sortBarFixed: false,
        types: [
          {code: '', serviceType: "全部", sort: "服务工种"}
        ],
        isMask: false,
        staffIdx: "",
        showTypes: false,
        showUp: false,
        tenatsUsers: [
          {loginName: "全部", sort: "业务员"}
        ],
        jobStatus: [
          {name: '全部', sort: "是否上架"},
          {name: '下架', code: "  0"},
          {name: '上架', code: "1"},
        ],
        orderSource: [
          {name: '全部', code: "", sort: "订单来源"},
          {name: '网络订单', code: "02"},
          {name: '本地订单', code: "01"},
        ],
        orderStatus: [
          {name: '全部', code: "", sort: "订单状态"},
          {name: '待定金', code: "01"},
          {name: '待面试', code: "02"},
          {name: '待尾款', code: "03"},
          {name: '待退款', code: "06"},
        ],
        rStatus: [
          {name: '全部', code: "12", sort: "订单状态"},
          {name: '待确认', code: "1"},
          {name: '待面试', code: "2"},
          {name: '全部', code: "35", sort: "订单状态"},
          {name: '已拒绝', code: "3"},
          {name: '已取消', code: "5"},
        ],
        rStatusAll: [
          {name: '全部', code: "", sort: "订单状态"},
          {name: '待处理', code: "1"},
          {name: '待面试', code: "2"},
          {name: '已拒绝', code: "3"},
          {name: '已完成', code: "4"},
          {name: '已取消', code: "5"},
        ],
        optsOrigin: this.opts,
        proviceData: [
          {areaName: '全部', code: "", sort: "服务区域"},
        ],
        cityData: [],
        pText: "",
        eduDataNew: [
          {name: "不限", sort: "学历"}
        ],
        nativeDataNew: [
          {name: "不限", sort: "籍贯"}
        ],
        ageDataNew: [
          {value: "全部", sort: "年龄要求"}
        ],
        expDataNew: [
          {name: "全部", sort: "经验"}
        ],
        expIdx: 0,
        tabFix: false
      }
    },
    created () {
      this.routname = this.$route.name || "";
      console.log(this.routname)
      if (this.routname == 'order' || this.routname == 'grap') {
        this.tabFix = true;
      } else {
        this.tabFix = false;
      }
      this.fetchData()
    },
    props: {
      opts: {
        type: Array,
        default: function () {
          return [
            {name: '服务工种', href: "#sortService", isChecked: false},
            {name: '业务员', href: "#sortStaff", isChecked: false},
            {name: "订单状态", href: "#sortOrderStatus", isChecked: false},
            {name: "服务区域", href: "#sortArea", isChecked: false},
          ]
        }
      },
      eduData: {
        type: Array,
        default: function () {
          return []
        }
      },
      nativeData: {
        type: Array
      },
      ageRange: {
        type: Array
      },
      zodic: {
        type: Array
      },
      pRange: {
        type: Array
      },
      isprocess: {
        type: Boolean
      },
      income: {
        type: Array
      },
      exps: {
        type: Array
      }
    },
    computed: {
      eduUpdate: function () {
        if (this.eduData) {
          let _this = this;
          var newData = this.eduDataNew.concat(_this.eduData);
          return newData;
        }
      },
      nativeUpdate: function () {
        if (this.nativeData) {
          let _this = this;
          var newData = this.nativeDataNew.concat(_this.nativeData);
          return newData;
        }
      },
      ageUpdate: function () {
        if (this.ageRange) {
          let _this = this;
          var newData = this.ageDataNew.concat(_this.ageRange);
          return newData;
        }
      },
      expUpdate: function () {
        if (this.exps) {
          let _this = this;
          var newData = this.expDataNew.concat(_this.exps);
          return newData;
        }
      },
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
//      筛选
      sort(idx, e){
        let _this = this;
        $(".jlb-filter").css('z-index', 101)
        e.preventDefault;
        var href = $(e.currentTarget).attr('href');
        if ($(href).css("display") == "none") {
          _this.isMask = true;
          $(href).show().siblings(".sortCondition").hide();
          if (this.tabFix) {
            this.$emit('tabFix', true)
            this.sortBarFixed = false;
          } else {
            this.sortBarFixed = true;
          }
        } else {
          $(href).hide()
          _this.isMask = false;
          if (this.tabFix) {
            this.$emit('tabFix', false)
          }
          this.sortBarFixed = false;
          $(".jlb-filter").css('z-index', 90)
        }
        $.each(_this.opts, function (i, v) {
          if (i != idx) {
            v.isChecked = false;
          } else {
            v.isChecked = !v.isChecked;
          }
        })
        _this.currentIdx = idx;
      },
      checkType(idx, e, param){
        let _this = this;
        var self = $(e.target);
        var href = "#" + self.parents(".sortCondition").attr("id");
        if (this.tabFix) {
          this.$emit('tabFix', false)
          this.sortBarFixed = false;
        } else {
          this.sortBarFixed = false;
        }
        this.isMask = false;
        $(".jlb-filter").css('z-index', 90)
        var code = self.data('code');
        var sort = self.data('sort') || "";
        console.log(code, sort);
        if (href == "#sortService") {
          this.serviceIdx = idx;
        } else if (href == "#sortStaff") {
          this.staffIdx = idx;
        } else if (href == "#sortStatus") {
          this.statusIdx = idx;
        } else if (href == "#sortSource") {
          this.sourceIdx = idx;
        } else if (href == "#sortOrderStatus") {
          this.orderStatusIdx = idx;
        } else if (href == '#sortArea') {
          if (param) {
            sort = "服务区域";
          } else {
            sort = this.pText.trim();
          }
          self.addClass("area-on").siblings().removeClass("area-on");

        } else if (href == "#sortEducation") {
          this.eduIdx = idx;
        } else if (href == "#sortNative") {
          this.nativeIdx = idx;
        } else if (href == "#sortAgeRange") {
          this.ageIdx = idx;
        } else if (href == "#sortResumeStatus") {
          this.rStatusIdx = idx;
        } else if (href == "#sortRStatusAll") {
          this.rsAllIdx = idx;
        } else if (href = "#sortExperience") {
          this.expIdx = idx;
        }
        var text = self.text();
        $(href).hide();
        $.each(this.opts, function (i, v) {
          if (v.href == href) {
            v.isChecked = false;
            console.log(i);
            if (code != "" && code != undefined) {
              v.name = text;
            } else {
              v.name = sort;
            }
          }
        })
        this.$emit('sortJob', _this.opts);
      },
      fetchData(){
        this.getServiceType();
        this.getTenatsUserListSel();
        var plist = this.$cm.getAreaData()
        this.proviceData = this.proviceData.concat(plist);
      },
//      服务工种
      getServiceType(){
        let _this = this;
        var req = {
          url: window.global_config.getServiceType,
          methods: 'get',
          headers: _this.params
        }
        /*this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
         let dataJD = data.jsonData;
         console.log(data.msg)
         _this.types = _this.types.concat(dataJD);
         }
         }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.getServiceType,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                let dataJD = data.jsonData;
                console.log(data.msg)
                _this.types = _this.types.concat(dataJD);
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
//      切换薪资单位
      changSalaryUnit(i){
        this.salaryUnit = i;
      },
//      业务员
      getTenatsUserListSel(){
        let _this = this;
        var req = {
          url: window.global_config.getTenatsUserListSel,
          methods: 'get',
          headers: _this.$cm.params
        }
        /*this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
         let dataJD = data.jsonData;
         console.log(data.msg)
         _this.tenatsUsers = _this.tenatsUsers.concat(dataJD);
         }
         }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.getTenatsUserListSel,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                let dataJD = data.jsonData;
                console.log(data.msg)
                _this.tenatsUsers = _this.tenatsUsers.concat(dataJD);
              } else {
                console.log(data.msg);
              }
            } else {
              alert("service"+data.code)
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      closeMask(e){
        console.log(e)
        this.isMask=false;
        $(".sortCondition").hide();
        if (this.tabFix) {
          this.$emit('tabFix', false)
        } else {
          this.sortBarFixed = false
        }
        $.each(this.opts, function (i, v) {
            v.isChecked = false;
        })
      },
//      省市选择
      selectProvice(e){
        var self = $(e.target)
        var pcode = self.data("code") || "";
        console.log(pcode);
        this.pText = self.text();
        self.addClass("area-on").siblings().removeClass("area-on");
        $(".city .area-on").removeClass('area-on');
        if (pcode != "" & pcode != undefined) {
          var code = {
            pcode: pcode
          }
          this.isCity = true;
          $(".city").show();
          var ccode = this.$cm.getCityData(code);
          var all = [{areaName: '全部', code: ""}];
          this.cityData = all.concat(ccode);
          console.log(this.cityData);
        } else {
          console.log(this.pText);
          if (this.pText.trim() == "全部") {
            this.checkType(0, e, "provice")
            this.isCity = false;
          }
        }
      },
//更多筛选
      sortMore(e){
        var self = $(e.target);
        self.addClass('mf-on').siblings('.mf-on').removeClass('mf-on');
      },
//      清除筛选
      clear(e){
        let _this = this;
        $("#sortMore ul li").removeClass("mf-on");
        $(".sortCondition p").removeClass("service-on");
        $(".sortCondition p img").hide();
        this.isMask = false;
        this.sortBarFixed = false;
        $(".jlb-filter").css('z-index', 90)
        $("#sortMore").hide();
        this.currentIdx = null;
        _this.optsOrigin = [
          {name: '工种', href: "#sortService", isChecked: false},
          {name: '学历', href: "#sortEducation", isChecked: false},
          {name: "籍贯", href: "#sortNative", isChecked: false},
          {name: "更多", href: "#sortMore", isChecked: false},
        ],
          this.$emit('clearSort', _this.optsOrigin);
      },
//      确认筛选
      confirm(e){
        let _this = this;
        var self = $(e.target)
        console.log(self)
        this.isMask = false;
        _this.sortBarFixed = false;
        $(".jlb-filter").css('z-index', 90)
        this.currentIdx = null;
        $("#sortMore").hide();
        this.$nextTick(() => {
          this.$emit('sortJob', _this.opts);
        })
      },
//      选择薪资价格
      changSalaryValue(e){
        var self = $(e.target)
//        $(".price_content").find('img').hide();
        self.addClass('service-on').siblings('.service-on').removeClass('service-on')
        self.parent(".price_content").siblings().children('.service-on').removeClass('service-on')
        self.children('img').attr('src', this.src.checked).show().parent().siblings().children('img').attr('src', "").hide().parents('.price_content').siblings().find('img').attr('src', "").hide();
        this.isMask = false;
        if (this.tabFix) {
          this.$emit('tabFix', false)
          this.sortBarFixed = false;
        } else {
          this.sortBarFixed = false;
        }

        $(".jlb-filter").css('z-index', 90)
        this.currentIdx = null;
        var href = "#" + self.parents(".sortCondition").attr("id");
        $(href).hide()
        var text = $(".price_tab .active").text();
        if (self.hasClass('service-on')) {
          console.log(text)
        }
        $.each(this.opts, function (i, v) {
          if (v.href == href) {
            v.isChecked = false;
            console.log(i);
            v.name = text;
          }
        })
        this.$emit('sortJob', this.opts);
      },
      handleScroll () {
        // 判断是否滚动到底部
        // 设置一个开关来避免重负请求数据
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (document.querySelector('.vux-tab')) {
          var offsetTabTop = document.querySelector('.vux-tab').offsetTop;
          var offsetTop = document.querySelector('.jlb-filter').offsetTop;
          if (this.tabFix) {
            if (scrollTop > offsetTabTop) {
              this.tabBarFixed = true
              this.$emit('tabFix', true)
            } else {
              this.$emit('tabFix', false)
              this.tabBarFixed = false
            }
          } else {
            if (scrollTop > offsetTop) {
              this.sortBarFixed = true
            } else {
              this.sortBarFixed = false
            }
          }
        } else if (document.querySelector('.jlb-filter')) {
          var offsetTop = document.querySelector('.jlb-filter').offsetTop
          if (scrollTop > offsetTop) {
            this.sortBarFixed = true
          } else {
            this.sortBarFixed = false
          }
        }
      },
    },
    watch: {},
  }
</script>
