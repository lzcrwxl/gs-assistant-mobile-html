<template>
  <div id="layerTemplate">
    <div class="mask" @click="closeLayer" @touchmove.prevent v-show="isServiceType||isAddress||isRefresh||isBalanceShow||isInterview||isPayment||isPushAddress"></div>
    <!--回退弹出层-->
    <div class="mask" @touchmove.prevent v-show="isLeaveShow" v-cloak></div>

    <div class="layer" id="reasonTips" v-show="">
      <h1>拒绝理由</h1>
      <div class="reasonLists">
        <label>
          <input type="radio" class="rdoDot" name="reason">该家政员不合适，下次合作
        </label>
        <label>
          <input type="radio" class="rdoDot" name="reason">刚找到匹配的家政员，下次合作
        </label>
        <label>
          <input type="radio" class="rdoDot" name="reason">其他
        </label>
        <label>
          <input type="text" class="customReason" placeholder="不超过20个字" maxlength="20">
        </label>
      </div>
      <div class="button_box mt30">
        <button class="btn-fill cancel">取消</button>
        <button class="btn-default submit">提交</button>
      </div>
    </div>
    <div class="layer" v-show="isServiceType" id="serviceType">
      <p class="mb30">请先选择服务工种</p>
      <div class="button_box mb15">
        <button class="btn-white" @click="closeLayer">知道了</button>
      </div>
    </div>
    <!--刷新弹出层-->
    <div class="layer" v-show="isRefresh" id="refreash" @touchmove.prevent>
      <p class="mb30">刷新成功，你成功刷新了{{count}}个订单</p>
      <div class="button_box mb15">
        <button class="btn-white" @click="closeLayer">知道了</button>
      </div>
    </div>

    <div class="layer confirm" id="cancelLayer" v-show="isLeaveShow" v-cloak @touchmove.prevent>
      <p class="mt50">
        离开页面信息将不保存
      </p>
      <div class="button_box mt30">
        <button class="btn-default mr30" @click="leave">离开</button>
        <button class="btn-fill" @click="stay">留下</button>
      </div>
    </div>

    <!--面试、支付弹窗-->
    <div class="layer orderLayer" v-show="isInterview||isPayment" v-cloak @touchmove.prevent>
      <h1 v-show="isInterview">
        确定通过面试？
      </h1>
      <h1 v-show="isPayment">
        确定完成支付？
      </h1>
      <p class="mt50" v-show="isInterview">通过面试后订单状态会随之改变，且订单状态 无法修改</p>
      <p class="mt50" v-show="isPayment">完成支付后订单状态会随之改变，且订单状态 无法修改</p>
      <div class="button_box mt15">
        <button class="btn-default mr30" @click="closeLayer">取消</button>
        <button class="btn-fill" @click="interview" v-show="isInterview">确定</button>
        <button class="btn-fill" @click="payment" v-show="isPayment">确定</button>
      </div>
    </div>
    <!--前往充值弹出层-->
     <div class="layer balanceTips" @touchmove.prevent v-cloak v-show="isBalanceShow">
       <h1 v-if="num<1" class="deposit">
         <p class="mb30">余额不足</p>
         <p>账户可用余额少于100元</p>
       </h1>
       <h1 v-else>
         抢单提示
       </h1>
       <ul class="balanceDesc">
         <li>本月您还有 <em :class="{'times':num>1}">{{num}}</em> 次免保证金抢单次数；</li>
         <li>超过次数，可通过冻结{{deposit}}元保证金继续抢单；</li>
         <li>订单完成后，冻结金额将自动返还至账户；</li>
       </ul>
       <div class="button_box">
         <button class="btn-default cancel" @click="closeLayer">取消</button>
         <router-link :to="{name:'deposit'}" class="btn-fill" v-if="num<1">前往充值</router-link>
         <button class="btn-fill" @click="continueGrap" v-else>继续抢单</button>
       </div>
     </div>

    <!--地址弹出层-->
    <div class="popup" id="selAddr"  v-show="isAddress">
      <h1>
        {{ptext}}{{ctext}}{{dtext}}
        <a @click.stop.prevent="confirmAddr" v-show="pcode&&ccode&&dcode">确定</a>
      </h1>
      <div class="addrPannel">
        <div class="provice">
          <ul>
            <li v-for="(item,index) in plist" :data-code="item.areaCode" @click="selCity">
              {{item.areaName}}
            </li>
          </ul>
        </div>
        <div class="city" >
          <ul v-show="isCity">
            <li v-for="(item,index) in cList" :data-code="item.areaCode" @click="selDistrict">
              {{item.areaName}}
            </li>
          </ul>
        </div>
        <div class="district">
          <ul v-show="isDistrict">
            <li v-for="(item,index) in dList" :data-code="item.areaCode" @click="fullAddr">{{item.areaName}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!--推送地址弹出层-->
    <div class="popup" id="selDistrict" v-show="isPushAddress">
      <h1>
        选择服务区域
        <a class="closeBtn" @click="closeLayer"></a>
        <!--<a @click.stop.prevent="confirmAddr" v-show="pcode&&ccode&&dcode">确定</a>-->
      </h1>
      <div class="addrPannel">
        <div class="provice">
          <ul>
            <li v-for="(item,index) in plist" :data-code="item.areaCode" @click="selCity">
              {{item.areaName}}
            </li>
          </ul>
        </div>
        <div class="city" >
          <ul v-show="isCity">
            <li v-for="(item,index) in cpushList" :data-code="item.areaCode" @click="selPushDist">
              {{item.areaName}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .orderLayer{
    padding:0 .6rem;
    h1{
      margin-top: .6rem;
      color: #4d4d4d;
      text-align: center;
      font-size: .32rem;
    }
    p{
      color: #a8a8a8;
      line-height: .5rem;
    }
  }
  #serviceType,#refreash {
    p {
      margin-top: .5rem;
      font-size: .36rem;
    }
    text-align: center;
    font-size: .26rem;
    color: #a8a8a8;
  }
  .times{
    color: #ff5f58;
  }

  .balanceTips {
    h1{
      font-size: .34rem;
      padding: .36rem .45rem;
      padding-bottom:0;
    }
    .deposit {
      color: #62b0fd;
      padding: .36rem .45rem;
      background-color: #e1effc;
      background-image: url("../../assets/img/noBalance.png");
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

  #selAddr {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    height: 8.25rem;
    width: 100%;
    z-index: 101;
    padding: 0 .3rem;
    h1 {
      padding-left: .12rem;
      height: .88rem;
      line-height: .88rem;
      border-bottom: 1px solid #f0f0f0;
      font-size: .3rem;
      a {
        float: right;
        font-size: .26rem;
        color: #0080ff;
      }
    }
    .addrPannel {
      height: 100%;
      padding-left: .12rem;
      display: flex;
      bottom: 0;
      > div {
        overflow-y: auto;
        flex: 1;
        box-sizing: border-box;
        ul {
          width: 100%;
        }
        li {
          font-size: .26rem;
          color: #4c4c4c;
          line-height: .88rem;
          height: .88rem;
        }
      }
      .provice {
        ul {
          li {

          }
        }
      }
    }
  }

  #selDistrict{
    #selAddr;
    padding: 0;
    h1{
      position: relative;
      text-align: center;
      font-size: .3rem;
    }
    .addrPannel{
      padding-left:0;
    }
    .closeBtn{
      position: absolute;
      top:50%;
      margin-top:-.11rem;
      right: .33rem;
      width: .22rem;
      height: .22rem;
      background: url("../../assets/img/icons/close.png")no-repeat center;
      background-size: .22rem;
    }
    .provice{
      background: #fafafa;
      li{
        padding: 0 .3rem;
      }
    }
    .city{
      ul{
        padding-left:.2rem;
        padding-right: .3rem;
        li{
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
  }
</style>
<script>
  import  {myMixin} from 'components/mixins/toggle'

  export default{
    data(){
      return {
        plist: [],
        cList:[],
        dList:[],
        ptext:"",
        pcode:"",
        ccode:"",
        ctext:"",
        dcode:"",
        dtext:"",
        isProvice:true,
        isCity:false,
        isDistrict:false,
        cpushList:[]
      }
    },
    created() {
      if(this.isAddress!==""){
        this.plist = this.$cm.getAreaData();
      }
    },
    props: ['isServiceType', 'isLeaveShow', 'isAddress','isRefresh',"count",'isBalanceShow','deposit','num','isInterview','isPayment','isPushAddress'],
    methods: {
      closeLayer(){
        this.$emit('update:isServiceType', false)
        this.$emit('update:isRefresh', false)
        this.$emit('update:isBalanceShow', false)
        this.$emit('update:isInterview', false)
        this.$emit('update:isPayment', false)
        this.$emit('update:isAddress', false)
        this.$emit('update:isPushAddress', false)
      },
      leave(){
        this.$emit('update:isLeaveShow', false)
        this.$router.go(-1);
//        this.$router.push({name:'order',params:{orderId:1}})
      },
      stay(){
        this.$emit('update:isLeaveShow', false)
      },
//      选择城市
      selCity(e){
        var self = $(e.target);
        var codel=this.pcode;
        this.pcode = self.data('code');
        this.ptext=$.trim(self.text());
        self.addClass('area-on').siblings('.area-on').removeClass('area-on');
        this.isCity = true;
        console.log(this.pcode,codel)
        if (this.pcode != ""&&this.pcode!==codel) {
          $(".city .area-on,.district .area-on").removeClass('area-on');
          this.ctext="";
          this.ccode="";
          this.dtext="";
          this.dcode="";
          this.isDistrict=false;
          var code = {
            pcode: this.pcode
          }
          this.cList = this.$cm.getCityData(code);
          var temp=[
            {areaName:"全部",areaCode:"0"}
          ]
          this.cpushList = temp.concat(this.cList);
          console.log(this.cpushList);
        }
      },
//      选择区县
      selDistrict(e){
        var self = $(e.target);
        var codel=this.ccode;
        this.ccode = self.data('code');
        this.ctext=$.trim(self.text());
        self.addClass('area-on').siblings('.area-on').removeClass('area-on');
        this.isDistrict = true;
        console.log(this.ccode,codel);
        if (this.pcode != ""&&this.ccode!=""&&this.ccode!=codel) {
          $(".district .area-on").removeClass('area-on');
          this.dtext="";
          this.dcode="";
          var code = {
            pcode: this.ccode
          }
          this.dList = this.$cm.getDistrictData(code);
        }
      },
//      推送选择区域
      selPushDist(e){
        var codel=this.ccode;
        var self = $(e.target);
        this.ccode = self.data('code');
        this.ctext=$.trim(self.text());
        console.log(this.ccode,codel,this.ctext)
        self.addClass('area-on').siblings('.area-on').removeClass('area-on');
        this.confirmAddr();
      },
//      全部路径
      fullAddr(e){
        var self = $(e.target);
        var codel=this.dcode;
        this.dcode = self.data('code');
        this.dtext=self.text();
        self.addClass('area-on').siblings('.area-on').removeClass('area-on');
      },
      confirmAddr(e){
        var addrObj={
          pcode:this.pcode,
          ccode:this.ccode,
          dcode:this.dcode,
          ptext:this.ptext,
          ctext:this.ctext,
          dtext:this.dtext,
        }
        this.$emit('update:isAddress', false)
        this.$emit('update:isPushAddress', false)
        this.$emit('confirmAddr',addrObj)
      },
      continueGrap(){
        this.$emit('update:isBalanceShow', false)
        this.$emit('grap')
      },
//      完成面试
      interview(){
        this.$emit('update:isInterview', false)
        this.$emit('interview')
      },
      payment(){
        this.$emit('update:isPayment', false)
        this.$emit('payment')
      }
    }
  }
</script>
