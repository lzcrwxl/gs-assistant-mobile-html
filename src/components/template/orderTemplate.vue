<template>
  <div id="orderTemplate">
    <div v-show="!isAunt">
      <form id="createOrderForm">
        <div v-show="priceShow">
          <h4>订单价格<span class="f24 g8 ml20">订单价格=阿姨价格+服务费</span></h4>
          <ul class="modify-lists fix ovh">
            <li class="modify-item">
              <h5 class="modifyLfTitle mt30">阿姨价格</h5>
              <div class="modifyRtInfo">
                <input type="text" placeholder="输入整数" ref="input" class="intBase" name="amount" @blur="blur($event)"
                       v-model.number="initOrder.amount" maxlength="7">
              </div>
            </li>
            <li class="modify-item">
              <h5 class="modifyLfTitle mt30">服务费</h5>
              <div class="modifyRtInfo">
                <input type="text" placeholder="输入整数" class="intBase" value="0" name="serviceCharge"
                       v-model.number="initOrder.serviceCharge" maxlength="7" @blur="blur($event)">
              </div>
            </li>
          </ul>
        </div>
        <h4>服务信息</h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item pillContainer">
            <h5 class="modifyLfTitle">服务工种</h5>
            <div class="modifyRtInfo">
              <div name="serviceItemCode">
            <span class="pillBase modifyBox" :class="[serviceItemCode==item.code?'pillChecked':'']"
                  v-for="(item,index) in serviceTypes" :data-code="item.code" @click="toggle($event)"
                  :data-value="index">{{item.name}}</span>
              </div>
            </div>
          </li>
          <li class="modify-item serviceItem" v-show="yuesao">
            <h5 class="modifyLfTitle mt50 serviceTime">预产期</h5>
            <div class="modifyRtInfo sDate">
              <div style="" name="expectedDate">
                <group class="l">
                  <datetime v-model="initService.expectedBirth" @on-change="change" class="intMd  seDate"
                            name="expectedBirthDate" @blur="blur($event)" :readonly="checkedBorn"  @on-confirm="confirmExpDate" placeholder="请选择日期"></datetime>
                </group>
                <label class="r vb baobao">
                  <input type="checkbox" class="chkSq" name="isBabyBorn" value="1" v-model="checkedBorn"
                         @change="chkBorn">
                  宝宝已出生
                </label>
              </div>

              <!--<input type="text" v-model="expected" class="intMd" @click="expectedBirth" readonly
                     @blur="blur($event)" name="expectedBirth" :disabled="checkedBorn">-->

            </div>
          </li>
          <li class="modify-item" v-show="isServiceDefault">
            <h5 class="modifyLfTitle">服务类型</h5>
            <div class="modifyRtInfo">
              <label class="" v-for="(item,index) in serviceMold">
                <input type="radio" class="rdoDot" name="serviceType" :value="item.id" v-model="serviceType">{{item.value}}
              </label>
            </div>
          </li>
          <li class="modify-item" v-show="serviceItemCode=='04'">
            <h5 class="modifyLfTitle mt30">能否自理</h5>
            <div class="modifyRtInfo">
              <select name="selfCares" class="intBase" @blur="blur($event)">
                <option value="">请选择</option>
                <option value="01">能</option>
                <option value="02">否</option>
              </select>
            </div>
          </li>
          <li class="modify-item serviceItem">
            <h5 class="modifyLfTitle mt50 serviceTime">服务时间</h5>
            <div class="modifyRtInfo date rel">
              <div style="width: 100%;" name="serviceDate" id="serviceDate">
                <!-- <input type="text" class="intMd" @click="showStart" readonly @blur="blur($event)" name="sStart"
                        v-model="sv.start">-->
                <group class="l">
                  <datetime v-model="sv.start" @on-change="change" class="intMd seDate" name="serviceStart"
                            @blur="blur($event)" @on-confirm="confirmStartDate" placeholder="请选择日期"></datetime>
                </group>
                <span class="divide">-</span>
                <!-- <input type="text" v-model="sv.end" class="intMd" @click="showEnd" readonly @blur="blur($event)"
                        name="sEnd">-->
                <group class="r">
                  <datetime v-model="sv.end" @on-change="change" class="intMd seDate" name="serviceEnd"
                            @blur="blur($event)" @on-confirm="confirmEndDate" placeholder="请选择日期"></datetime>
                </group>
              </div>
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">客户预算</h5>
            <div class="modifyRtInfo">
              <input type="text" class="intMd" maxlength="7" placeholder="输入整数" name="salary" @blur="blur($event)"
                     v-model="initService.salary">
              <select id="" class="intMd r" name="salaryType" @blur="blur($event)"
                      v-model="salaryType">
                <!--<option value="" selected>请选择</option>-->
                <option :value="item.id" v-for="(item,index) in salaryRange">{{item.value}}</option>
              </select>
            </div>
          </li>
        </ul>
        <h4>服务要求<span class="f24 g8 ml20">更多信息可在PC端维护</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item pillContainer skillsBox">
            <h5 class="modifyLfTitle ">技能要求</h5>
            <div class="modifyRtInfo">
              <ul v-if="skills!=''">
                <li class="pillSkill skillBox" v-for="(item,index) in skills" @click="checkPill(item)"
                    :class="[{ pillActive: item.isChecked }]" name="skills"
                    :data-key="item.skillsKey">{{item.skillsValue}}
                  <input type="checkbox" name="salarySkills" :value="item.skillsKey" :checked="item.isChecked">
                </li>
              </ul>
              <p v-else class="typeText">请先选择工种</p>
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle">特殊要求</h5>
            <div class="modifyRtInfo">
              <textarea class="textMd" name="specialNeeds" v-model="initService.specialNeeds"></textarea>
            </div>
          </li>
        </ul>
        <h4>客户信息<span class="f24 g8 ml20">更多信息可在PC端维护</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">客户姓名</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="姓名" class="intBase" name="memberName" @blur="blur($event)"
                     v-model="initMember.memberName">
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">手机号码</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="11位" class="intBase" maxlength="11" name="memberMobile"
                     @blur="blur($event)"
                     v-model="initMember.memberMobile">
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">服务区域</h5>
            <div class="modifyRtInfo">
              <!--group>
                <x-address title="地址" placeholder="请选择地址" v-model="value" :list="addressData"></x-address>
              </group>-->
              <div class="intBase" id="addressBox" @click="addrShow">
                <input type="hidden" name="serviceProvice" :value="addrObj.pcode">
                <input type="hidden" name="serviceCity" :value="addrObj.ccode">
                <input type="hidden" name="serviceCounty" :value="addrObj.dcode">
                <span name="serviceProviceBox" :data-code="addrObj.pcode">{{addrObj.ptext}}</span>
                <span name="serviceCityBox" :data-code="addrObj.ccode">{{addrObj.ctext}}</span>
                <span name="serviceCountyBox" :data-code="addrObj.dcode">{{addrObj.dtext}}</span>
              </div>
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">详细地址</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="" class="intBase" name="serviceAddress" @blur="blur($event)">
            </div>
          </li>
        </ul>
        <h4>安排家政员</h4>
        <ul class="detail-info fix mb60">
          <li class="detail-info-item f0 rel">
            <input type="hidden" name="staffId" :value="staffId"/>
            <div class="dib img-box">
              <img :src="avatar" alt="" class="avatarDefault" v-if="createBtn">
              <img :src="bsInfo.headImage" alt="" v-else class="avatar">
            </div>
            <div class="info-r dib ml30 vb" v-if="!createBtn">
              <h6 class="f34 mt15">{{bsInfo.staffName}}</h6>
              <p class="f24 mt40 detail-desc"><i>{{bsInfo.age}}岁 </i>| <i>属{{bsInfo.zodiac}} </i>| <i>{{bsInfo.nativePlace}}人 </i>|
                <i>{{bsInfo.constellation}} </i>| <i>{{bsInfo.education|getValue}}</i></p>
              <p class="f30 mt30 price">{{jbInfo.price}}{{jbInfo.unitValue}}</p>
            </div>
            <!--<keep-alive>-->
            <a class="changeAunt btn-smerer btn-white" @click="createAunt" v-if="btnMsg=='create'">{{btnTxt}}</a>
            <!--</keep-alive>-->
            <!--<a class="changeAunt btn-smerer btn-white" @click="replaceAunt" v-else>更换家政员</a>-->
          </li>
        </ul>
        <h4>备注<span class="f24 g8 ml20">此处信息仅自己可见</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item">
            <textarea class="textMd" name="remark">
            </textarea>
          </li>
        </ul>
        <div class="mt20 mb20 tc">
          <a class="btn-block btn-fill" v-if="btnMsg=='create'" @click="confirmCreate">确认创建</a>
          <!--<a class="btn-block btn-fill" v-else @click="confirmUpdate">确认保存</a>-->
        </div>
      </form>
      <LayerTemplate :isServiceType.sync="isServiceType" :isAddress.sync="isAddress"
                     @confirmAddr="getAddr"></LayerTemplate>
    </div>
    <div>
      <CreateAunt v-show="isAunt" :isAunt.sync="isAunt" :code="this.serviceItemCode"
                  @getAuntInfo="getAuntInfo"></CreateAunt>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .serviceItem{
    margin: 0!important;
    position: relative;
    top:-.3rem;
  }
  .serviceTime {
    position: relative;
    top: .2rem;
  }

  .baobao {
    margin-top: .5rem;
    margin-left: .1rem;
    top: .2rem;
    position: absolute;
  }

  #addressBox {
    line-height: .88rem;
  }

  .divide {
    position: absolute;
    top: 0.3rem;
    margin-left: .1rem;
    line-height: 1rem;
  }

  .img-box {
    width: 1.48rem;
    height: 1.81rem;
    text-align: center;
    vertical-align: middle;
  }

  .avatarDefault {
    margin-top: .2rem;
    vertical-align: middle;
    width: .92rem;
    height: 1.06rem;
  }

  .seDate {
    font-size: .3rem !important;
    color: #333 !important;
    text-align: left!important;
    span.vux-cell-value {
      color: #333 !important;
    }
  }

  .date {
    position: relative;
    font-size: .3rem;
    > div {
      display: inline-block !important;
      vertical-align: middle;
      .intMd {
        padding-left: 0;
      }
    }
    .vux-no-group-title {
      margin-top: 0 !important;
    }
  }

  .sDate {
    .date;
  }

  #orderTemplate {
    h4 {
      font-size: .3rem;
      padding: 0 .3rem;
      line-height: .88rem;
      height: .88rem;
    }
    .modify-lists {
      background: #ffffff;
      .modify-item {
        margin: .24rem 0;
        padding: 0 .3rem;
        .modifyLfTitle {
          float: left;
          font-size: .3rem;
          color: #888;
        }
        .modifyRtInfo {
          padding-left: 1.5rem;
          font-size: .3rem;
          .validation {
            color: red;
            font-size: .2rem;
            margin-top: .1rem;
          }
          .modifyBox {
            background: #f2f2f6;
            margin-bottom: .14rem;
            border: 1px solid #d6d6d6;
            &:not(:nth-child(4)) {
              margin-right: .05rem;
            }
          }
        }
      }
    }
  }

  .pillContainer {
    padding-right: 0 !important;
    line-height: .54rem;
    input[type='checkbox'] {
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
  }

  .skillsBox {
    min-height: .4rem;
  }

  .skillBox {
    margin-right: .1rem;
    margin-bottom: .15rem;
  }

  .changeAunt {
    position: absolute;
    right: 0;
  }

  .price {
    color: @price;
    font-size: .26rem;
  }

</style>

<script>
  import {Datetime, Group, XButton} from 'vux'
  import {XAddress, ChinaAddressV4Data, Cell, Value2nameFilter as value2name} from 'vux'
  import {mapGetters, mapActions, mapState} from 'vuex'
  import LayerTemplate from 'components/template/layerTemplate'
  import CreateAunt from 'components/Aunt/createAunt'

  export default{
    data(){
      return {
        serviceTypes: [],
        skills: [],
        pillIndex: null,
        src: require("@/assets/img/icons/phone.png"),
        avatar: require("@/assets/img/avatarDefault.png"),
        startTime: {
          time: ''
        },
        endtime: {
          time: ''
        },
        checkedBorn: false,
        defaultTime: "00:00:00",
        value: ['天津市', '市辖区', '和平区'],
        pickerValue: "",
        yuesao: false,
        amount: "",
        serviceCharge: null,
        isServiceType: false,
        isAddress: false,
        initOrder: this.order || {},
        initMember: this.member || {},
        initService: this.service || {},
        initStaff: this.staff || {},
        serviceType: "01",
        serviceItemCode: "",
        isServiceDefault: false,
        expected: "",
        orderNo: "",
        sv: {
          start: "",
          end: ""
        },
        addressData: ChinaAddressV4Data,
        salaryRange: [],
        staffId: "",
        addrObj: {},
        bsInfo: {},
        jbInfo: {},
        btnTxt: "添加家政员",
        isAunt: false,
        serviceMold: [],
        salaryType:"01",
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    components: {
      Datetime,
      Group,
      XButton,
      LayerTemplate,
      XAddress,
      Cell,
      CreateAunt
    },
    created(){
      this.$on('bridge', () => {
        /* var intsList = $("#orderTemplate input");
         for (var i = 0; i < intsList.length; i++) {
         var int = intsList[i];
         this.blur(int)
         }*/
      });
      this.getServicesType();
      this.orderNo = this.$route.params.orderNo
//      判断是否为空对象
      if (JSON.stringify(this.initService) != "{}") {
        var obj = this.initService;
        console.log(obj)
        this.serviceType = this.initService.serviceType.split(',')[0] || "";
        this.serviceItemCode = this.initService.serviceItemCode.split(',')[0] || "";
        var start = this.$cm.formateTime(obj.serviceStart);
        var end = this.$cm.formateTime(obj.serviceEnd);
        console.log(start);
        console.log(end);
        this.sv = {
          start: start,
          end: end,
        }
        console.log(this.serviceItemCode)
        if (this.serviceItemCode == "01") {
          this.yuesao = true;
        } else {
          this.yuesao = false;
        }
        this.pullSKillsData(this.serviceItemCode)
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(from);
    },
    mounted(){
      this.salaryRange = this.$cm.getSalaryRange();
      // select提示样式更改
      $("select").change(function () {
        if ($(this).val() == "") {
          $(this).addClass("grey_i");
        } else {
          $(this).removeClass("grey_i");
        }
      });
    },
    methods: {
//      获取阿姨信息
      getAuntInfo(bsInfo, jbInfo, staffId){
        this.staffId = staffId;
        this.$emit('update:createBtn', false)
        this.btnTxt = "更换家政员";
        this.$store.dispatch('showHeader')
        this.bsInfo = bsInfo;
        this.jbInfo = jbInfo;
      },
      confirmExpDate(){
        this.onSuccess($("[name='expectedDate']"));
      },
      confirmStartDate(){
        if (this.sv.end != "") {
          this.onSuccess($("[name='serviceDate']"));
        }
      },
      confirmEndDate(){
        if (this.sv.start != "") {
          this.onSuccess($("[name='serviceDate']"));
        }
      },
      showStart(){
        let _this = this;
        // 组件内使用
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: _this.sv.start, // 其他参数同 props
          onHide () {
            const _this = this
          },
          onShow () {
            const _this = this
          },
          onConfirm (val) {
            _this.sv.start = val;
          },
        })
      },
      showEnd(){
        let _this = this;
        // 组件内使用
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          value: _this.sv.end, // 其他参数同 props
          onHide () {
            const _this = this
          },
          onShow () {
            const _this = this
          },
          onConfirm (val) {
            _this.sv.end = val;
            console.log('plugin confirm', val)
          },
        })
      },
      expectedBirth(){
        console.log("click")
        let _this = this;
        // 组件内使用
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: _this.expected, // 其他参数同 props
          onHide () {
            const _this = this
          },
          onShow () {
            const _this = this
          },
          onConfirm (val) {
            _this.expected = val;
          },
        })
      },
//      选择地址
      addrShow(){
        this.isAddress = true;
      },
      toggle(e){
        var el = e.currentTarget;
        var code = $(el).data('code');
        var serCode=this.serviceItemCode;
        console.log(serCode,code)
        this.serviceItemCode = code;
        $('[data-code="' + this.serviceItemCode + '"]').addClass('pillChecked').siblings().removeClass('pillChecked');
        this.onSuccess($("[name='serviceItemCode']"));
        if (code == "01") {
          this.yuesao = true;
        } else {
          this.yuesao = false;
        }
        this.pullSKillsData(code);
        if(serCode!=code){
          this.$emit('update:createBtn', true)
          this.btnTxt = "添加家政员";
        }
        //			服务类型
        this.getServiceNature(code);
      },
      checkPill(item){
        console.log(item.isChecked)
        item.isChecked = !item.isChecked;
      },
      change (value) {
//        console.log('change', value)
      },
//      更换家政员
      replaceAunt(){
        let _this = this;
        if (this.$cm.isEmpty(this.serviceItemCode)) {
          this.isServiceType = true;
        } else {
          this.$router.push({name: 'replaceAunt', params: {orderNo: _this.orderNo, code: _this.serviceItemCode}})
        }
      },
      getServiceNature(serviceItem){
        let _this = this;
        $.ajax({
          url: window.global_config.getServiceMold,
          type: "post",
          data: {
            serverType: serviceItem
          },
          headers: _this.params,
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              console.log(dataJD);
              _this.serviceMold = dataJD;
              var html = "";
              if (serviceItem == '01' || serviceItem == '02' || serviceItem == '06') {
                _this.serviceType = '01';
                _this.isServiceDefault = false;
              } else {
                _this.isServiceDefault = true;
                if (serviceItem == '05') {
                  _this.serviceType = '03'
                } else if (serviceItem == '07') {
                  _this.serviceType = '05'
                } else if (serviceItem == '04') {
                  _this.serviceType = '01'
                }
              }
              console.log(data.msg);
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          },
        })
      },
//      添加家政员
      createAunt(){
        if (this.$cm.isEmpty(this.serviceItemCode)) {
          this.isServiceType = true;
        } else {
//          this.$emit('update:isAunt', true)
          this.isAunt = true;
//          this.$router.push({name: 'createAunt', params: {code: this.serviceItemCode}})
        }
      },
      blur(e){
        if (!e.target) {
          var self = $(e)
        } else {
          var self = $(e.target)
        }
        var name = self.attr("name")

        var _this = this;
        _this.checkValue(name, self)
      },
//      创建订单
      confirmCreate(){
        let _this = this;
        this.chkAll=true;
        if (_this.initOrder.amount + _this.initOrder.serviceCharge <= 5) {
          console.log(_this.initOrder)
          this.$vux.toast.text('订单价格必须大于5元')
          return;
        }

        var intsList = $("#orderTemplate input");
        for (var i = 0; i < intsList.length; i++) {
          var int = intsList[i];
          _this.blur(int)
        }
        var st = $("[name='salaryType']");
        _this.blur(st)
        this.checkItems();
        if ($("#orderTemplate .validation").length > 0) {
          return;
        };
        var expectedBirth = ""
        if (_this.initService.expectedBirth != "") {
          expectedBirth = _this.initService.expectedBirth + " " + _this.defaultTime
        }
        $("#createOrderForm").ajaxSubmit({
          url: window.global_config.createOrder,
          type: "post",
          headers: _this.params,
          data: {
            serviceItemCode: _this.serviceItemCode,
            serviceStart: _this.sv.start + " " + _this.defaultTime,
            serviceEnd: _this.sv.end + " " + _this.defaultTime,
            expectedBirth: expectedBirth,
          },
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.$router.push({name: 'order', params: {orderId: 1}}) // -> /user
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
      checkItems(){
        if (this.sv.start == "" || this.sv.end == "") {
          this.onError('服务时间不能为空', $("[name='serviceDate']"));
        } else {
          this.onSuccess($("[name='serviceDate']"));
        }
        var code = this.serviceItemCode;
        if (code == "") {
          this.onError('服务工种不能为空', $("[name='serviceItemCode']"));
        } else {
          this.onSuccess($("[name='serviceItemCode']"));
          if (code == "01") {
            if (this.checkedBorn) {
              this.onSuccess($("[name='expectedDate']"));
            } else {
              var e = this.initService.expectedBirth
              console.log(e);
              if (e == "") {
                this.onError('预产期不能为空', $("[name='expectedDate']"));
              } else {
                this.onSuccess($("[name='expectedDate']"));
              }
            }
          }
        }
        if ($("[name='serviceProviceBox']").text() == "" || $("[name='serviceCityBox']").text() == "" || $("[name='serviceCountyBox']").text() == "") {
          this.onError('服务区域不能为空', $("#addressBox"));
        } else {
          this.onSuccess($("#addressBox"));
        }
      },
      onSuccess(self){
        self.nextAll('.validation').remove();
      },
      onError(msg, self) {
        if (self.nextAll().hasClass('validation')) {
          self.nextAll('.validation').text(msg);
          return;
        }
        self.parent().append("<p class='validation' style=' color: red; font-size: .2rem; margin-top: .1rem;'>" + msg + "</p>")
      },

//      检查数据
      checkValue(name, self){
        console.log(name);
        console.log(self.val());
        var regChar = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;				//特殊字符
        var regNum = /^[0-9]*$/;
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        var serviceCharge=$("[name='serviceCharge']");
        switch (name) {
          case "amount":
            if (self.val() == ""&&serviceCharge.val()=="") {
              this.onError('请输入阿姨价格或服务费',serviceCharge);
            } else if (!regNum.test(self.val())||!regNum.test(serviceCharge.val())) {
              this.onError('只能填写数字', serviceCharge);
            } else {
              this.onSuccess(serviceCharge);
            }
            break;
          case "serviceCharge":
            if (self.val() == ""&&$("[name='amount']").val()=="") {
              this.onError('请输入阿姨价格或服务费', self);
            } else if (!regNum.test(self.val())||!regNum.test($("[name='amount']").val())) {
              this.onError('只能填写数字', self);
            } else {
              this.onSuccess(self);
            }
            break;
          case "memberName":
            if (self.val() == "") {
              this.onError('姓名不能为空', self);
            } else {
              this.onSuccess(self);
            }
            break;
          case "memberMobile":
            if (self.val() == "") {
              this.onError('手机号不能为空', self);
            } else if (!regPhone.test(self.val())) {
              this.onError('手机号码格式错误', self);
            } else {
              this.onSuccess(self);
            }
            break;
         /* case "salaryType":
            if (this.$cm.isEmpty(self.val())) {
              this.onError('客户预算单位不能为空', self);
            } else if (this.$cm.isEmpty($("[name='salary']").val())) {
              this.onError('客户预算不能为空', self);
            } else {
              this.onSuccess(self);
            }
            break;*/
          case "salary":
            if (self.val() == "") {
              this.onError('客户预算不能为空', self);
            } else if (!regNum.test(self.val())) {
              this.onError('只能填写数字', self);
            } else if (this.$cm.isEmpty($("[name='salaryType']").val())) {
              this.onError('客户预算单位不能为空', self);
            } else {
              this.onSuccess(self);
            }
            break;
          case "serviceAddress":
            if (self.val() == "") {
              this.onError('详细地址不能为空', self);
            } else {
              this.onSuccess(self);
            }
            break;
          case "selfCares":
            if (this.serviceItemCode == "04") {
              if (self.val() == "") {
                this.onError('老人能否自理不能为空', self);
              } else {
                this.onSuccess(self);
              }
            }
            break;
          default:
            break;
        }
 /*       if (this.sv.start == "" || this.sv.end == "") {
          this.onError('服务时间不能为空', $("[name='serviceDate']"));
        } else {
          this.onSuccess($("[name='serviceDate']"));
        }
        var code = this.serviceItemCode;
        if (code == "") {
          this.onError('服务工种不能为空', $("[name='serviceItemCode']"));
        } else {
          this.onSuccess($("[name='serviceItemCode']"));
          if (code == "01") {
            if (this.checkedBorn) {
              this.onSuccess($("[name='expectedDate']"));
            } else {
              var e = this.initService.expectedBirth
              console.log(e);
              if (e == "") {
                this.onError('预产期不能为空', $("[name='expectedDate']"));
              } else {
                this.onSuccess($("[name='expectedDate']"));
              }
            }
          }
        }
        if ($("[name='serviceProviceBox']").text() == "" || $("[name='serviceCityBox']").text() == "" || $("[name='serviceCountyBox']").text() == "") {
          this.onError('服务区域不能为空', $("#addressBox"));
        } else {
          this.onSuccess($("#addressBox"));
        }*/
      },
//      修改订单
      confirmUpdate(){
        console.log("update")
        var int = $("[name='amount']").val();
        console.log(int)
      },
//      服务工种
      getServicesType(){
        let _this = this;
        this.$nextTick(function () {
          $.ajax({
            url: window.global_config.getServicesType,
            type: "post",
            headers: _this.params,
            data: {},
            dataType: "json",
            async: false,
            success: function success(data) {
              if (data.success) {
                console.log(data)
                var dataJD = data.jsonData;
                _this.serviceTypes = dataJD;
              } else {
                _this.$cm.checkAuth(data.code)
                console.log(data.msg);
              }
            }
          });
        })
      },
//      技能要求
      pullSKillsData(itemCode){
        let _this = this;
        this.$nextTick(function () {
          // 代码保证 this.$el 在 document 中
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
                for (var i in dataJD) {
                  dataJD[i].isChecked = false;
                }
                console.log(dataJD)
                _this.skills = dataJD;
              } else {
                _this.$cm.checkAuth(data.code)
                console.log(data.msg);
              }
            }
          });
        })

      },
      getAddr(addrObj){
        this.addrObj = addrObj;
//        console.log(value)
        this.onSuccess($("#addressBox"));
      },
      chkBorn(){
        if (this.checkedBorn) {
          this.initService.expectedBirth = "";
        }
      }
    },

    computed: mapState({
      priceShow: state => state.priceShow
    }),

    props: {
      btnMsg: {
        type: String,
        /*  default: function () {
         return {txt: '更换家政员', txtShow: true}
         }*/
      },
      order: {
        type: Object,
        required: false
      },
      member: {
        type: Object,
        required: false
      },
      service: {
        type: Object,
        required: false
      },
      staff: {
        type: Object,
        required: false
      },
      /*      isAunt:{
       type:Boolean
       },*/
      createBtn: [String, Number, Boolean],
    }
  }
</script>
