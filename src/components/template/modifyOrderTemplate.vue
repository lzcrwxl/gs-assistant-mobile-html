<template>
  <div id="orderTemplate">
    <div v-show="!isAunt">
      <form id="createOrderForm" enctype="multipart/form-data">
        <input type="hidden" name="staffId" :value="initStaff.staffId">
        <form id="priceForm">
          <div v-if="priceShow">
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
        </form>
        <h4>服务信息</h4>
        <form id="serviceForm">
          <ul class="modify-lists fix ovh">
            <li class="modify-item pillContainer">
              <h5 class="modifyLfTitle">服务工种</h5>
              <div class="modifyRtInfo">
                <div name="serviceItemCode" v-show="status=='7'">
            <span class="pillBase modifyBox" :class="[serviceItemCode==item.code?'pillChecked':'']"
                  v-for="(item,index) in serviceTypes" :data-code="item.code" @click="toggle($event)"
                  :data-value="index">{{item.name}}</span>
                </div>
                <span v-show="status!='7'">{{initService.serviceItemCode|getValue}}</span>
              </div>
            </li>
            <li class="modify-item serviceItem" v-show="yuesao">
              <h5 class="modifyLfTitle mt50 serviceTime">预产期</h5>
              <div class="modifyRtInfo sDate">
                <div style="" name="expectedDate">
                  <group class="l">
                    <!--{{initService.expectedBirth}}-->
                    <input type="hidden" :value="initService.expectedBirth" name="expectedBirth">
                    <datetime v-model="initService.expectedBirth" @on-change="change" class="intMd"
                              name="expectedBirthDate"
                              @blur="blur($event)" :readonly="initService.isBabyBorn=='1'" @on-confirm="confirmExpDate" placeholder="请选择"></datetime>
                    <!-- <input type="text" v-model="expected" class="intMd" @click="expectedBirth" readonly
                            @blur="blur($event)" name="expectedBirth" :disabled="checkedBorn" :value="initService.expectedBirth">-->
                  </group>
                  <label class="r vb baobao">
                    <input type="checkbox" class="chkSq" name="isBaby" value="0" @change="chkBorn">
                    <input type="hidden" class="chkSq" name="isBabyBorn" value="">
                    宝宝已出生
                  </label>
                </div>
              </div>
            </li>
            <li class="modify-item" v-show="peihu">
              <h5 class="modifyLfTitle mt30">能否自理</h5>
              <div class="modifyRtInfo">
                <select name="selfCares" class="intBase" @blur="blur($event)" v-model="selfCares">
                  <option value="01">能</option>
                  <option value="02">否</option>
                </select>
              </div>
            </li>
            <li class="modify-item" v-show="isServiceDefault">
              <h5 class="modifyLfTitle">服务类型</h5>
              <div class="modifyRtInfo">
                <label class="mr30" v-for="(item,index) in serviceMold">
                  <input type="radio" class="rdoDot" name="serviceType" :value="item.id" v-model="serviceType">{{item.value}}
                </label>
              </div>
            </li>
            <li class="modify-item serviceItem">
              <h5 class="modifyLfTitle mt50 serviceTime">服务时间</h5>
              <div class="modifyRtInfo date">
                <div style="width: 100%;" name="serviceDate" id="serviceDate">
                  <!--  <input type="text" class="intMd" @click="showStart" readonly @blur="blur($event)" name="sStart"
                           v-model="sv.start">-->
                  <!--{{sv.start}}-->
                  <group class="l">
                    <datetime v-model="sv.start" @on-change="change" class="intMd" name="serviceStart"
                              @blur="blur($event)" placeholder="请选择"></datetime>
                  </group>
                  <span class="divide">-</span>
                  <!--  <input type="text" v-model="sv.end" class="intMd" @click="showEnd" readonly @blur="blur($event)"
                           name="sEnd">-->
                  <group class="r">
                    <datetime v-model="sv.end" @on-change="change" class="intMd" name="serviceEnd"
                              @blur="blur($event)" @on-confirm="confirmEndDate" placeholder="请选择"></datetime>
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
                        v-model="initService.salaryType">
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
                      :class="[{ pillActive: item.isChecked }]"
                      :data-key="item.skillsKey">{{item.skillsValue}}
                    <input type="checkbox" name="salarySkills" :value="item.skillsKey" :checked="item.isChecked">
                    <!--<input type="checkbox" name="skills" v-else :value="item.skillsKey" :checked="item.isChecked">-->
                  </li>
                </ul>
                <p v-else class="typeText">请先选择工种</p>
              </div>
            </li>
            <li class="modify-item">
              <h5 class="modifyLfTitle">特殊要求</h5>
              <div class="modifyRtInfo">
                <textarea class="textMd" name="remarks" v-if="btnMsg=='pay'||status==7" v-model="initService.remarks">{{initService.remarks}}</textarea>
                <textarea class="textMd" name="specialNeeds" v-model="initService.specialNeeds" v-else>{{initService.specialNeeds}}</textarea>
              </div>
            </li>
          </ul>
        </form>
        <h4>客户信息<span class="f24 g8 ml20">更多信息可在PC端维护</span></h4>
        <form id="clientForm" :data-memberId="initMember.memberId">
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
                <input type="text" placeholder="" class="intBase" name="serviceAddress" @blur="blur($event)"
                       v-model="initMember.serviceAddress">
              </div>
            </li>
          </ul>
        </form>
        <h4>备注<span class="f24 g8 ml20">此处信息仅自己可见</span></h4>
        <form id="remark_info">
          <ul class="modify-lists fix ovh">
            <li class="modify-item">
            <textarea class="textMd" name="remark" v-model="initOrder.remark">

            </textarea>
            </li>
          </ul>
        </form>
        <div class="mt20 mb20 tc">
          <a class="btn-block btn-fill" v-if="btnMsg=='create'" @click="confirmCreate">确认创建</a>
          <a class="btn-block btn-fill" v-else-if="btnMsg=='modify'" @click="confirmUpdate">确认保存</a>
          <a class="btn-block btn-fill" v-else-if="btnMsg=='pay'" @click="confirmRelease" :class="{noClickAble:noClickAble}">确认生成</a>
        </div>
      </form>
      <LayerTemplate :isServiceType.sync="isServiceType" :isAddress.sync="isAddress"
                     @confirmAddr="getAddr"></LayerTemplate>
    </div>
    <div>
      <!--<reserveAunt v-show="isAunt" :isAunt.sync="isAunt" :code="this.serviceItemCode" @getAuntInfo="getAuntInfo" :rReserve="rReserve"></reserveAunt>-->
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
  .noClickAble{
    opacity:.5!important;
  }
  .serviceTime {
    position: relative;
    top: .2rem;
  }
  .divide {
    position: absolute;
    top: 0.3rem;
    margin-left: .1rem;
    line-height: 1rem;
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
      margin-top: 0;
    }
  }
  .sDate{
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
  import reserveAunt from 'components/Aunt/reserveMatchAunt'
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
        value: ['天津市', '市辖区', '和平区'],
        pickerValue: "",
        yuesao: false,
        peihu: false,
        checkedBorn: false,
        amount: "",
        serviceCharge: null,
        isServiceType: false,
        isAddress: false,
        initOrder: this.order || {},
        initMember: this.member || {},
        initService: this.service || {},
        initStaff: this.staff || {},
        serviceType: "",
        serviceItemCode: "",
        orderNo: "",
        sv: {
          start: "",
          end: ""
        },
        defaultTime: "00:00:00",
        addressData: ChinaAddressV4Data,
        salaryRange: [],
        staffId: "",
        addrObj: {},
        bsInfo: {},
        jbInfo: {},
        btnTxt: "添加家政员",
        isAunt: false,
        rReserve: false,
        newOrderStatus:"01",
        orderStatus: "01",
        status: "",
        remark: "",
        chkKey: "",
        isServiceDefault: false,
        selfCares: this.service.selfCares,
        serviceMold: [],
        expected: "",
        noClickAble:false,
        salaryType:"01",
        params:{
          token:localStorage.getItem('token'),
        }
//        source:source
      }
    },
    components: {
      Datetime,
      Group,
      XButton,
      LayerTemplate,
      XAddress,
      Cell,
      reserveAunt
    },
    watch: {
      $route(to, from){

        console.log(from, to)
      }
    },
    created(){
      this.status = this.$route.params.status;
      this.$on('bridge', () => {
      });
      this.getServicesType();
      this.orderNo = this.$route.params.orderNo
//      this.source = this.$route.params.source
//      判断是否为空对象
      if (JSON.stringify(this.initService) != "{}") {
        var obj = this.initService;
        console.log(obj)
        this.serviceType = this.initService.serviceType.split(',')[0] || "";
        this.serviceItemCode = this.initService.serviceItemCode.split(',')[0] || "";
        if(this.initService.isBabyBorn == "1"){
          console.log(this.initService.expectedBirth);
          this.initService.expectedBirth=""
          $("[name='isBabyBorn']").val("1");
        }else if(this.initService.isBabyBorn == "0") {
          $("[name='isBabyBorn']").val("0");
        }
        var start = this.$cm.formateTime(obj.serviceStart);
        var end = this.$cm.formateTime(obj.serviceEnd);
        this.sv = {
          start: start,
          end: end,
        }
        if (this.serviceItemCode == "01") {
          this.yuesao = true;
        } else {
          this.yuesao = false;
        }
        if (this.serviceItemCode == "04") {
          this.peihu = true;
        } else {
          this.peihu = false;
        }
        this.pullSKillsData(this.serviceItemCode)
        var data = this.$cm.getServiceNature(this.serviceItemCode,this.params)
        this.initShowServiceType(data, this.serviceItemCode);
      }
      if (JSON.stringify(this.initMember) != "{}") {
        var mb = this.initMember;
        this.addrObj = {
          pcode: mb.serviceProvice.split(',')[0] || "",
          ptext: mb.serviceProvice.split(',')[1] || "",
          ccode: mb.serviceCity.split(',')[0] || "",
          ctext: mb.serviceCity.split(',')[1] || "",
          dcode: mb.serviceCounty.split(',')[0] || "",
          dtext: mb.serviceCounty.split(',')[1] || "",
        }
      }
      if (JSON.stringify(this.initStaff) != "{}") {
        this.bsInfo = this.initStaff;
      }

    },
    mounted(){
      if(this.initService.isBabyBorn == "1"){
        console.log(this.initService.expectedBirth);
        this.initService.expectedBirth=""
        $("[name='isBabyBorn']").val("1");
        $("input[name='isBaby']").prop("checked",true);
      } else {
        $("[name='isBabyBorn']").val("0");
        $("input[name='isBaby']").prop("checked",false);
      }
      this.salaryRange = this.$cm.getSalaryRange();
      // select提示样式更改
      $("select").change(function(){
        if ($(this).val()=="") {
          $(this).addClass("grey_i");
        }else{
          $(this).removeClass("grey_i");
        }
      });
    },
    methods: {
//      获取阿姨信息
      getAuntInfo(bsInfo, jbInfo, staffId){
        this.staffId = staffId;
        console.log(this.staffId)
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
      chkBorn(e){
        var self=$(e.target)
        console.log(self);
        if(this.initService.isBabyBorn=='1'){
          this.initService.isBabyBorn="0"
          $("[name='isBabyBorn']").val("0");
        }else {
          this.initService.expectedBirth="";
          this.initService.isBabyBorn="1"
          $("[name='isBabyBorn']").val("1");
        }
      },
      expectedBirth(){
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
      initShowServiceType(data, serviceItem){
        let _this = this;
        _this.serviceMold = data;
        if (serviceItem == '01' || serviceItem == '02' || serviceItem == '06') {
          _this.serviceType = '01';
          _this.isServiceDefault = false;
        } else {
          _this.isServiceDefault = true;
          if (serviceItem == '05') {
              _this.serviceType = _this.initService.serviceType.split(',')[0] || "03";
          } else if (serviceItem == '07') {
              _this.serviceType = _this.initService.serviceType.split(',')[0] || "05";
          } else if (serviceItem == '04') {
              _this.serviceType = _this.initService.serviceType.split(',')[0] || "01";
          }
        }
      },
      showServiceType(data, serviceItem){
        let _this = this;
        _this.serviceMold = data;
          if (serviceItem == '01' || serviceItem == '02' || serviceItem == '06') {
            _this.serviceType = '01';
            _this.isServiceDefault = false;
          } else {
            _this.isServiceDefault = true;
            if (serviceItem == '05') {
              if(_this.status=='7'){
                _this.serviceType = '03'
              }
            } else if (serviceItem == '07') {
              if(_this.status=='7'){
                _this.serviceType = '05'
              }
            } else if (serviceItem == '04') {
              if(_this.status=='7'){
                _this.serviceType = '01'
              }
            }
          }
      },
//      选择地址
      addrShow(){
        this.isAddress = true;
      },
      toggle(e){
        console.log(e.currentTarget)
        var el = e.currentTarget;
        var code = $(el).data('code');
        console.log(code);

        console.log(this.serviceItemCode);
        if(code!=this.serviceItemCode){
          this.serviceItemCode = code;
          $('[data-code="' + this.serviceItemCode + '"]').addClass('pillChecked').siblings().removeClass('pillChecked');
          this.onSuccess($("[name='serviceItemCode']"));
          this.selfCares="01";
          if (code == "01") {
            this.yuesao = true;
          } else {
            this.yuesao = false;
          }
          if (code == "04") {
            this.peihu = true;
          } else {
            this.peihu = false;
          }
          //			服务类型
          var data = this.$cm.getServiceNature(this.serviceItemCode,this.params)
          this.showServiceType(data, this.serviceItemCode);
          this.pullSKillsData(code);
        }
      },
      checkPill(item){
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
          this.isAunt = true;
          this.rReserve = true;
//          this.$router.push({name: 'replaceAunt', params: {orderNo: _this.orderNo, code: _this.serviceItemCode}})
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
        $("#createOrderForm").ajaxSubmit({
          url: window.global_config.createOrder,
          type: "post",
          headers: _this.params,
          data: {
            serviceItemCode: _this.serviceItemCode,
            serviceStart: _this.sv.start,
            serviceEnd: _this.sv.end,
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
              _this.$cm.checkAuth(data.code);
              console.log(data.msg);
            }
          }
        });
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
      checkItems(){
        if (this.sv.start == "" || this.sv.end == "") {
          this.onError('服务时间不能为空', $("[name='serviceDate']"));
        } else {
          this.onSuccess($("[name='serviceDate']"));
        }
        var code = this.serviceItemCode;
        if (this.$cm.isEmpty(code)) {
          this.onError('服务工种不能为空', $("[name='serviceItemCode']"));
        } else {
          this.onSuccess($("[name='serviceItemCode']"));
          if (code == "01") {
            if(this.initService.isBabyBorn=="1"){
              this.onSuccess($("[name='expectedDate']"));
            }else {
              var e = this.initService.expectedBirth;
              console.log(e);
              if (this.$cm.isEmpty(e)) {
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
//      检查数据
      checkValue(name, self){
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
          case "salary":
            if (self.val() == "") {
              this.onError('客户预算不能为空', self);
            } else if (!regNum.test(self.val())) {
              this.onError('只能填写数字', self);
            } else if ($("select[name='salaryType']").val() == "") {
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
/*          case "salaryType":
            if (self.val() == "" || self == undefined) {
              this.onError('客户预算单位不能为空', self);
            } else if (!regNum.test($("input[name='salary']").val())) {
              this.onError('只能填写数字', self);
            } else if ($("input[name='salary']").val() == "") {
              this.onError('客户预算不能为空', self);
            } else {
              this.onSuccess(self);
            }
            break;*/
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

      },
//      修改订单
      confirmUpdate(){
        let _this = this;
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
        }
        ;
        if (this.status == "7") {
          //        保存服务预约信息
          _this.serviceReserveForm()
        } else {
          _this.saveServiceInfo()
        }
      },
//      生成订单
      confirmRelease(){
        let _this = this;
        if(_this.noClickAble){
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
        }
        var amount=_this.initOrder.amount||0;
        var charge=_this.initOrder.serviceCharge||0;
        if (amount + charge <= 5) {
          this.$vux.toast.text('订单价格必须大于5元')
          return;
        };

        var memberId = $("#clientForm").data("memberid");
        console.log(memberId);
        _this.noClickAble=true;
        $.ajax({
          url: window.global_config.saveReserve,
          headers: _this.params,
          data: $.param({
            "serviceItemCode":_this.serviceItemCode,
            'newOrderStatus': _this.newOrderStatus,
            'amount': _this.initOrder.amount,
            'orderStatus': _this.orderStatus,
            'staffId': _this.initStaff.staffId,
            'serviceStart': _this.sv.start + " " + _this.defaultTime,
            'serviceEnd': _this.sv.end + " " + _this.defaultTime,
            'memberId': memberId,
            'orderNo': _this.orderNo,
            'serviceCharge': _this.initOrder.serviceCharge,
            'remark': _this.initOrder.remark
          }) + '&' + $("#clientForm").serialize() + '&' + $("#serviceForm").serialize(),
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.noClickAble=false;
                _this.$router.push({name: 'order', params: {orderId:1}})
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
//      服务预约信息保存
      serviceReserveForm(){
        let _this = this;
        $("#serviceForm").ajaxSubmit({
          url: window.global_config.saveServiceToReserve,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
            serviceItemCode: _this.serviceItemCode,
            serviceStart: _this.sv.start,
            serviceEnd: _this.sv.end,
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                console.log(data);
                //        保存客户预约信息
                _this.clientForm()
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
//      服务信息保存
      saveServiceInfo(){
        let _this = this;
        var temp = []
        $.each(_this.skills, function (i, v) {
          if (v.isChecked) {
            temp.push(v.skillsKey)
          }
        })
        var skills = temp.toString();
//        var selfCares = $("select[name='selfCares']").val();
        $("#serviceForm").ajaxSubmit({
          url: window.global_config.saveServiceInfo,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
            serviceItemCode: _this.serviceItemCode,
            serviceStart: _this.sv.start,
            serviceEnd: _this.sv.end,
//            selfCares:selfCares,
            skills: skills,
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                //        保存订单价格信息
                _this.priceForm()
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
      priceForm(){
        let _this = this;
        $("#priceForm").ajaxSubmit({
          url: window.global_config.saveOrder,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
            remark:_this.initOrder.remark
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.saveCustomerInfo()
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
//      客户保存
      saveCustomerInfo(){
        let _this = this;
        $("#clientForm").ajaxSubmit({
          url: window.global_config.saveCustomerInfo,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                _this.$router.go(-1);
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
//      客户预约保存
      clientForm(){
        let _this = this;
        $("#clientForm").ajaxSubmit({
          url: window.global_config.saveMemberToReserve,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                console.log(data.msg);
                _this.remarkForm()
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
//      备注保存
      remarkForm(){
        let _this = this;
        $("#remark_info").ajaxSubmit({
          url: window.global_config.remark,
          headers: _this.params,
          data: {
            orderNo: _this.orderNo,
          },
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                console.log(data.msg);
//                _this.$router.push({name: 'detail', params: {orderNo: _this.orderNo, source: _this.source}})
                _this.$router.go(-1);
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
                var sk = _this.initService.salarySkills;
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
        })

      },
      getAddr(addrObj){
        this.addrObj = addrObj;
//        console.log(value)
        this.onSuccess($("#addressBox"));
      }
    },

    computed: mapState({
      priceShow: state => state.priceShow
    }),

    props: {
      btnMsg: {
        type: String,
        /*default: function () {
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
