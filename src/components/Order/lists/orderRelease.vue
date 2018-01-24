<template>
  <div id="orderRelease">
    <!--前往充值弹出层-->
    <div class="mask" @touchmove.prevent v-show="isBalanceShow" v-cloak></div>
    <div class="layer balanceTips" v-cloak v-show="isBalanceShow">
      <h1>
        <p class="mb30">余额不足</p>
        <p>账户可用余额少于100元</p>
      </h1>
      <ul class="balanceDesc">
        <li>本月您还有{{num}}次免保证金抢单次数；</li>
        <li>超过次数，可通过冻结100元保证金继续抢单；</li>
        <li>订单完成后，冻结金额将自动返还至账户；</li>
      </ul>
      <div class="button_box">
        <button class="btn-default cancel" @click="isBalanceShow=false">取消</button>
        <router-link :to="{name:'deposit'}" class="btn-fill">前往充值</router-link>
      </div>
    </div>
    <!--<LayerTemplate :isBalanceShow.sync="isBalanceShow"></LayerTemplate>-->
    <HeadView></HeadView>
    <div class="release-ctn">
      <h4 class="f26 g8">完善并确认发布信息</h4>
      <ul class="release-lists fix">
        <li class="release-item">
          <h5>服务工种</h5>
          <div class="dib rtInfo">
            <span class="vb">{{order.serviceItemCode}} - {{order.serviceType}}</span>
            <label @click="urgent">
              <img src="../../../assets/img/icons/urgent.png" alt="" class="mr10" v-if="isurgent">
              <img src="../../../assets/img/icons/urgentno.png" alt="" class="mr10" v-else>
              加急标识
            </label>
          </div>
        </li>
        <li class="release-item">
          <h5 class="vt">服务区域</h5>
          <div class="rtInfo">
            <p class="area">
              {{member.serviceProvice|getValue}}-{{member.serviceCounty|getValue}}-{{member.serviceCity|getValue}}
            </p>
          </div>
        </li>
        <li class="release-item">
          <h5>服务时间</h5>
          <div class="dib rtInfo">
            {{service.serviceStart|formateTime}}至{{service.serviceEnd|formateTime}}
          </div>
        </li>
        <li class="release-item mt20 mb20">
          <h5>价格预算</h5>
          <div class="dib rtInfo release-input">
            <input type="text" class="intTxt" v-model="service.salary" name="salary" @blur="checkInput($event)">
            <select name="salaryType" id="" class="intSel r" v-model="service.salaryType" @blur="checkInput($event)">
              <option disabled value="">请选择</option>
              <option v-for="(item,index) in salaryRange" :value="item.id">{{item.value}}</option>
            </select>
          </div>
        </li>
        <li class="release-item mb20">
          <h5>年龄要求</h5>
          <div class="dib rtInfo">
            <select name="wageRequirements" id="" class="intSellg" v-model="service.wageRequirements"
                    @blur="checkInput($event)">
              <option disabled value="">请选择</option>
              <option :value="item.code" v-for="(item,index) in ageRange">{{item.value}}</option>
            </select>
          </div>
        </li>
        <li class="release-item ovh skills">
          <h5>技能要求</h5>
          <div class="rtInfo">
            <ul>
              <li :class="[{ pillActive: item.isChecked }]" class="skillBox" @click="toggle(item)" :key="index"
                  v-for="(item, index) in skills" :data-value="item.skillsKey">{{item.skillsValue}}
                <input type="checkbox" name="salarySkills" :value="item.skillsKey" :checked="item.isChecked">
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="release-lists mt25">
        <li class="f30 release-item">
          <p class="info_list_left">职位要求</p>
          <div class="info_list_right rel">
            <textarea name="demand" id="textMsg" placeholder="请描述职位具体信息" class="textMd" v-model="message"
                      maxlength="100"
                      @keyup="countNum" @blur="checkInput($event)">

            </textarea>
            <em class="countTips" :class="{'redTxt':message.length<10}">{{message.length}}/100</em>
          </div>
        </li>
      </ul>
      <p class="tips">本月您还有<em>{{num}}</em>次免保证金发布次数，次数不足将冻结{{jobDeposit}}元保证金</p>
      <div class="btn-wrapper02 mt50 mb30">
        <button class="btn-bottom btn-white mr30" @click="btnBack">放弃发布</button>
        <button @click="confirmRelease" class="btn-bottom btn-fill">确认发布</button>
      </div>
    </div>
    <LayerTemplate :isLeaveShow.sync="isLeaveShow"></LayerTemplate>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";

  .redTxt {
    color: red !important;
  }

  .balanceTips {
    h1 {
      padding: .36rem .45rem;
      font-size: .34rem;
      color: #62b0fd;
      background-color: #e1effc;
      background-image: url("../../../assets/img/noBalance.png");
      background-repeat: no-repeat;
      background-size: 1.2rem 1.12rem;
      background-position: 4.5rem .15rem;
      border-top-left-radius: .12rem;
      border-top-right-radius: .12rem;
    }
    .balanceDesc {
      padding: .6rem 0 .3rem .45rem;
      list-style: disc inside;
      li {
        color: #a8a8a8;
        font-size: .26rem;
        /*list-style-type:dot;*/
        &:not(:last-child) {
          margin-bottom: .38rem;
        }
      }
    }
  }

  .cancel {
    margin-right: .4rem;
  }

  .skills {
    margin-right: 0 !important;
  }

  .skillLists {
    margin-left: .27rem;
  }
  input[name='salarySkills'] {
    position: absolute;
    -moz-opacity: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0;
    z-index: 3;
    cursor: pointer;
    right: 0;
    bottom: 0;
  }
  #orderRelease {
    .release-ctn {
      h4 {
        padding: 0 .3rem;
        line-height: .88rem;
        height: .88rem;
      }
      .release-lists {
        background: #ffffff;
        padding: .34rem 0;
        .release-item {
          font-size: .3rem;
          line-height: .7rem;
          /*display: flex;*/
          /*align-items: center;*/
          /*height: .72rem;*/
          margin-left: .3rem;
          margin-right: .3rem;
          h5 {
            float: left;
            color: #888;
            width: 1.47rem;
            /*display: inline-block;*/
          }
          .rtInfo {
            position: relative;
            display: block;
            /*display: flex;*/
            /*flex-wrap: wrap;*/
            /*flex: auto;*/
            padding-left: 1.7rem;
            vertical-align: bottom;
            label {
              right: 0;
              border-left: 1px solid #efeff4;
              position: absolute;
              padding-left: .4rem;;
              font-size: .24rem;
              color: #d5d5d5;
              img {
                vertical-align: middle;
                width: .3rem;
                height: .3rem;
              }
            }
            .release-unit {
            }
          }
          .release-input {
            justify-content: space-between;
          }
        }
      }
    }
  }

  .area {
    /*line-height:.5rem!important;*/
  }

  .lfInfo {
    margin-top: .1rem;
    float: left;
    font-size: .3rem;
    width: 1.7rem;
    color: #888;
  }

  .skillBox {
    position: relative;
    font-size: .26rem;
    height: .54rem;
    display: inline-block;
    text-align: center;
    line-height: .54rem;
    border-radius: .08rem;
    border: 1px solid #888888;
    color: #888;
    &:not(:last-child) {
      margin-right: .24rem;
    }
    margin-bottom: .16rem;
  }

  .checked {
    border: 1px solid #0080ff;
    &:after {
      content: '';
      background: url("../../../assets/img/icons/chkbox.png") no-repeat;
      background-size: .23rem;
      width: .23rem;
      height: .23rem;
      position: absolute;
      right: -1px;
      bottom: -1px;
    }
  }

  .info_list_left {
    float: left;
    width: 1.3rem;
    color: #888;
    text-align: left;
  }

  .info_list_right {
    padding-left: 1.7rem;
  }

  .tips {
    color: #adadad;
    font-size: .24rem;
    line-height: .3rem;
    background: url("../../../assets/img/icons/tip.png") no-repeat center left;
    background-size: .24rem;
    margin: 0.27rem 0 .27rem .18rem;
    padding-left: .36rem;
    em {
      color: #f43430;
    }
  }

  .countTips {
    position: absolute;
    right: .1rem;
    bottom: .1rem;
    font-size: .20rem;
    color: #d5d5d5;
  }


</style>
<script>
  import HeadView from "@/components/Header/headView"
  import {mapGetters, mapActions, mapState} from 'vuex'
  import LayerTemplate from 'components/template/layerTemplate'

  export default{
    data(){
      return {
        isurgent: false,
        message: "",
        num: "",
        jobDeposit: "",
        orderNo: "",
        service: {},
        salaryRange: [],
        ageRange: [],
        isLeaveShow: false,
        money: "",
        emsSign: "02",
        isBalanceShow: false,
        chkKey: "",
        salarySkills: [],
        skills:[],
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    computed: mapState({
      order: state => state.order,
      member: state => state.member
    }),
    created(){
      this.getReleaseInfo();
      this.orderNo = this.$route.params.orderNo
      this.orderServiceInfo();
      var itemCode = this.service.serviceItemCode.split(",")[0];
      this.salaryRange = this.$cm.getSalaryRange();
      this.ageRange = this.$cm.getAgeRange();
      var params = {itemCode: itemCode, level: 1}
      this.salarySkills = this.service.salarySkills;
      this.pullSKillsData(itemCode);
//      this.skillsRange = this.$cm.getSKillsData(params, skills);
    },
    components: {
      HeadView,
      LayerTemplate
    },
    methods: {
      toggle(item){
        console.log(item)
        item.isChecked = !item.isChecked;
      },
      btnBack(){
        this.isLeaveShow = true;
      },
      urgent(){
        this.isurgent = !this.isurgent;
        if (this.isurgent == true) {
          this.emsSign = '01'
        } else {
          this.emsSign = '02'
        }
      },
      confirmRelease(){
        const _this = this;
        if (_this.$cm.isEmpty(_this.service.salary)) {
          var self = $('[name="salary"]');
          _this.$cm.onError('价格预算不能为空', self);
        }
        if (_this.$cm.isEmpty(_this.service.salaryType)) {
          var self = $('[name="salaryType"]');
          _this.$cm.onError('价格预算单位不能为空', self);
        }
        if (_this.$cm.isEmpty(_this.service.wageRequirements)) {
          var self = $('[name="wageRequirements"]');
          _this.$cm.onError('年龄要求不能为空', self);
        }
        if (_this.$cm.isEmpty(_this.message)) {
          var self = $('[name="demand"]');
          _this.$cm.onError('职位要求不能为空', self);
        } else if (_this.message < 10) {
          _this.$cm.onError('职位要求不能少于10个字', self);
        }
        if ($("#orderRelease .validation").length > 0) {
          console.log("有错误")
          return;
        }
        ;
        _this.getReleaseInfo();
        if (_this.num < 1 && _this.money < 0) {
          _this.isBalanceShow = true;
          return;
        } else {
          _this.isBalanceShow = false;
          _this.issueJob();
        }
      },
//      检查是否为空
      checkInput(e){
        console.log(e)
        if (!e.target) {
          var self = $(e)
        } else {
          var self = $(e.target)
        }
        var name = self.attr("name")
        var _this = this;
        console.log(name)
        var val = self.val()
        switch (name) {
          case "salary":
            if (_this.$cm.isEmpty(val)) {
              _this.$cm.onError('价格预算不能为空', self);
            } else {
              _this.$cm.onSuccess(self);
            }
            break;
          case "salaryType":
            var val = self.val()
            if (_this.$cm.isEmpty(val)) {
              _this.$cm.onError('价格预算单位不能为空', self);
            } else {
              _this.$cm.onSuccess(self);
            }
            break;
          case "wageRequirements":
            var ageReq = this.service.wageRequirements
            console.log(ageReq);
            if (_this.$cm.isEmpty(ageReq)) {
              _this.$cm.onError('年龄要求不能为空', self);
            } else {
              _this.$cm.onSuccess(self);
            }
            break;
          case "demand":
            var demand = this.message
            console.log(demand);
            if (_this.$cm.isEmpty(demand)) {
              _this.$cm.onError('职位要求不能为空', self);
            } else if (demand.length < 10) {
              _this.$cm.onError('职位要求不能少于10个字', self);
            } else {
              _this.$cm.onSuccess(self);
            }
            break;
          default:
            break;
        }
      },
//      统计多行文本框字数
      countNum(){
        var msg = this.message;
        console.log(msg.length);
      },
//      获取发布信息
      getReleaseInfo(){
        let _this = this;
        var req = {
          url: window.global_config.releaseJob,
          methods: 'get',
          headers: _this.$cm.params
        }
       /* this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            console.log(dataJD)
            _this.num = dataJD.jobTotalNum - dataJD.jobUsedNum;
            _this.jobDeposit = dataJD.jobDeposit;
            _this.money = dataJD.balance - dataJD.jobDeposit;
          }
        }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.releaseJob,
          type: "get",
          headers:_this.params,
          dataType: "json",
          success: function success(data) {
            let dataJD = data.jsonData;
            console.log(dataJD)
            _this.num = dataJD.jobTotalNum - dataJD.jobUsedNum;
            _this.jobDeposit = dataJD.jobDeposit;
            _this.money = dataJD.balance - dataJD.jobDeposit;
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
//      发布信息
      issueJob(){
        let _this = this;
        var salary = _this.service.salary;
        var salaryType = _this.service.salaryType;
        var skillRequirements = ""
        $("input[name='salarySkills']:checked").each(function(){
          skillRequirements += $(this).val()+",";
        })
        skillRequirements = skillRequirements.substr(0, skillRequirements.length - 1)
        console.log(skillRequirements);
        var demand = _this.message;
        var age = _this.service.wageRequirements
        $.ajax({
          url: window.global_config.jobsList,
          type: "post",
          headers: _this.params,
          data: JSON.stringify({
            age: age,
            orderNo: _this.orderNo,
            emsSign: _this.emsSign,
            salary: salary,
            salaryType: salaryType,
            skillRequirements: skillRequirements,
            demand: demand
          }),
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.$vux.toast.show({
                  text: "发布成功",
                  onHide () {
                    _this.$router.push({name: 'job'})
                  }
                })
                console.log(data.msg);
              } else {
                alert(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      //      技能要求
      pullSKillsData(itemCode){
        console.log("pull")
        let _this = this;
        $.ajax({
          url: window.global_config.getSKillsData,
          type: "post",
          headers: _this.params,
          data: {itemCode: itemCode, level: 1},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var dataJD = data.jsonData;
              var sk = _this.salarySkills;
              if (sk) {
                for (var i in dataJD) {
                  var key;
                  var temp = [];
                  for (var j in sk) {
                    key = sk[j].skillsKey;
                    if (key == dataJD[i].skillsKey) {
                      dataJD[i].isChecked = true;
                    } else if (dataJD[i].isChecked == undefined) {
                      dataJD[i].isChecked = false;
                    }
                  }
                }
              } else {
                for (var i in dataJD) {
                  dataJD[i].isChecked = false;
                }
              }
              _this.skills = dataJD;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
    }
  }
</script>
