<template>
  <div class="detail-content">
    <ul id="detail-price" class=" fix mb15 mt15" v-if="priceshow">
      <li class="detail-item">
        <h5 class="g3 l">订单价格</h5>
        <div class="rtInfo" style="padding-left:1.5rem;">
          <p class="g8 dib"><em>￥{{(order.amount+order.serviceCharge)|money}}</em>
          </p>
          <p>（阿姨价格￥{{order.amount||0}}+</span>服务费￥{{order.serviceCharge||0}}）</p>
        </div>
      </li>
    </ul>
    <ul class="detail-list fix mb30">
      <li class="detail-item">
        <h5>订单编号</h5>
        <div class="rtInfo">
          <p class="dib describe">{{order.orderNo}}</p>
          <span class="online" v-if="order.orderSource=='02'">网络订单</span>
          <span class="online" v-else>本地订单</span>
        </div>
      </li>
      <li class="detail-item">
        <h5>预约时间</h5>
        <div class="rtInfo">
          <p class="dib describe">{{order.orderTime}}</p>
        </div>
      </li>
    </ul>
    <ul class="detail-list fix mb30">
      <li class="detail-item">
        <h5>服务工种</h5>
        <div class="rtInfo">
          <p class="dib describe">{{order.serviceItemCode}} ({{order.serviceType}})</p>
        </div>
      </li>
      <li class="detail-item" v-if="!!service.serviceItemCode&&service.serviceItemCode.split(',')[0]=='04'">
        <h5>能否自理</h5>
        <div class="rtInfo">
          <p class="dib describe" v-if="service.selfCares=='01'">能</p>
          <p class="dib describe" v-else-if="service.selfCares=='02'">否</p>
          <p class="dib describe" v-else></p>
        </div>
      </li>
      <li class="detail-item" v-if="!!service.serviceItemCode&&service.serviceItemCode.split(',')[0]=='01'">
        <h5>预产期</h5>
        <div class="rtInfo">
          <p class="dib describe" v-if="service.isBabyBorn=='0'">{{service.expectedBirth}}</p>
          <p class="dib describe" v-else-if="service.isBabyBorn=='1'">宝宝已出生</p>
        </div>
      </li>
      <li class="detail-item">
        <h5>服务时间</h5>
        <div class="rtInfo">
          <p class="dib describe">{{service.serviceStart|formateTime}}至{{service.serviceEnd|formateTime}}</p>
        </div>
      </li>
      <li class="detail-item">
        <h5>客户预算</h5>
        <div class="rtInfo">
          <p class="dib cost">{{service.salary}}{{service.salaryTypeValue}}</p>
        </div>
      </li>
      <li class="detail-item">
        <h5>技能要求</h5>
        <div class="rtInfo">
          <p class="dib describe"><span v-for="(item,index) in service.salarySkills">{{item.skillsValue}}&nbsp;</span>
          </p>
        </div>
      </li>
      <li class="detail-item">
        <h5>特殊要求</h5>
        <div class="rtInfo">
          <p class="dib describe">{{service.specialNeeds}}</p>
        </div>
      </li>
    </ul>
    <ul class="detail-list fix mb30">
      <li class="detail-item">
        <h5>客户姓名</h5>
        <div class="rtInfo">
          <p class="dib describe">{{member.memberName}}</p>
          <a :href="member.mobileHref" class="phone"></a>
        </div>
      </li>
      <li class="detail-item">
        <h5>联系方式</h5>
        <div class="rtInfo">
          <p class="describe">{{member.memberMobile}}</p>
        </div>
      </li>
      <li class="detail-item" id="service-addr">
        <h5>服务地址</h5>
        <div class="rtInfo">
          <div class="address">
            {{member.serviceProvice|getValue}}-{{member.serviceCounty|getValue}}-{{member.serviceCity|getValue}} <br>
            <p class="">{{member.serviceAddress|getValue}} </p>
          </div>
        </div>
      </li>
    </ul>
    <ul class="detail-info fix aunt-info">
      <li class="detail-info-item f0"  v-if="JSON.stringify(this.initStaff) != '{}'" @click.stop.prevent="detailAunt">
        <div class="">
          <div class="dib img-box">
            <img :src="staff.headImage" alt="" class="avatar">
          </div>
          <div class="info-r dib ml30 vb">
            <h6 class="f34 mt10" v-if="order.isLocalStaff==1">
              <span >{{staff.staffName}}</span>
            </h6>
            <h6 class="f34 mt10" v-if="order.isLocalStaff==0">
              <span v-if="staff.sex=='01'">{{staff.staffName.substr(0,1)+"师傅"}}</span>
              <span v-if="staff.sex=='02'">{{staff.staffName.substr(0,1)+"阿姨"}}</span>
            </h6>
            <p class="f30 mt30">{{staff.serviceTypeValue}}</p>
            <p class="f24 mt40 detail-desc"><i>{{staff.age}}岁 </i>| <i>属{{staff.zodiac}} </i>|
              <i>{{staff.nativePlace}}人 </i>| <i>{{staff.constellation}} </i>| <i>{{staff.educarion}}</i></p>
          </div>
          <a class="changeAunt btn-smerer btn-white mr30" @click.stop.prevent="addAunt" v-show="orderStatus=='01'||orderStatus=='02'">更换家政员</a>
        </div>
        <!--<Percent></Percent>-->
        <div class="aunt-bar">
          <hr :style="{width:staff.matchValue + '%' }">
          <span class="percentage">
            匹配度  <em>{{staff.matchValue}}%</em>
          </span>
          <span class="r f24 barTxt">完善家政员信息可以提高匹配度</span>
        </div>
      </li>
      <li class="detail-info-item f0 rel mb30" v-else>
        <div class="dib img-box">
          <img :src="avatar" alt="" class="avatarDefault">
        </div>
        <a class="changeAunt btn-smerer btn-white" @click="addAunt" v-if="orderStatus=='01'||orderStatus=='02'">添加家政员</a>
      </li>
    </ul>
    <ul class="remark fix mb30 mt30" v-show="order.remark!=''">
      <li class="">
        <p><em>备注:</em>&nbsp;&nbsp;{{order.remark}}</p>
      </li>
    </ul>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
  .remark{
    background: #ffffff;
    padding:.2rem .3rem;
    em{
      color: #888;
    }
    p{
      height: 100%;
      font-size: .3rem;
      width: 100%;
    }
    min-height:1.5rem;
  }
  .changeAunt {
    position: absolute;
    right: 0;
  }
  .img-box{
    width: 1.48rem;
    height: 1.81rem;
    text-align: center;
    vertical-align: middle;
  }
  .aunt-bar {
    position: relative;
    height: .88rem;
    line-height: .88rem;
    margin: 0 .3rem;
    border-top: 3px solid #e5e5e5;
    .percentage {
      font-size: .26rem;
      color: #888;
    }
    .barTxt {
      color: #d6d6d6;
    }
  }

  hr {
    /*width: 75%;*/
    position: absolute;
    top: -3px;
    left: 0;
    height: 3px;
    border-radius: 1.5px;
    border: none;
    background: #3e9dfc;
    border-top: 3px solid #3e9dfc;
  }

  .detail-list {
    padding: .36rem .3rem 0;
    background: #ffffff;
    font-size: .3rem;
    .detail-item {
      position: relative;
      line-height: .5rem;
      margin-bottom: .16rem;
      &:last-child {
        margin-bottom: .3rem;
      }
      .online {
        width: .98rem;
        height: .3rem;
        line-height: .3rem;
        text-align: center;
        position: absolute;
        font-size: .2rem;
        border-radius: .04rem;
        color: #d6d6d6;
        background: #f6f6f6;
        right: 0;
      }
      /*line-height: .6rem;*/
      h5 {
        float: left;
        color: #888;
        width: 1.47rem;
      }
      .rtInfo {
        padding-left: 1.5rem;
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
        width: .68rem;
        height: .68rem;
        background: url("../../assets/img/icons/phone.png") no-repeat;
        background-size: contain;
      }
    }
  }

  .aunt-bar {
    margin: 0 !important;
    margin-top: .3rem !important;
  }

  .aunt-info {
    padding-bottom: 0 !important;
  }

  .detail-info {
    padding: .36rem .3rem 0;
    background: #ffffff;
    font-size: .3rem;
    .detail-info-item {
      .avatar {
        width: 100%;
        height: 100%;
      }
      .avatarDefault{
        margin-top:.2rem;
        vertical-align: middle;
        width: .92rem;
        height: 1.06rem;
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

  #detail-price {
    background: #ffffff;
    padding: 0.1rem .3rem;
    line-height: .6rem;
    font-size: .26rem;
    h5 {
      font-size: .3rem;
      width: 1.47rem;
    }
    p {
    }
    em {
      font-size: .3rem;
      color: #ff5f58;
    }
  }

  #service-addr {
    h5 {
      align-self: flex-start;
    }
  }
</style>
<script>
  import Percent from 'components/template/percentageTemplate'
  export default{
    data(){
      return {
        src: require("@/assets/img/icons/phone.png"),
        avatar: require("@/assets/img/avatarDefault.png"),
        initMember:this.member||{},
        initService:this.service||{},
        initStaff:this.staff||{},
        initSource:this.source||{},
        initOrder:this.order||{},
        orderNo:this.$route.params.orderNo,
//        orderStatus:this.$route.params.orderStatus
      }
    },
    components: {
      Percent
    },
    watch: {

    },
    created(){
      console.log(this.$route.params.orderStatus)
    },
    updated:function(){
      console.log(this.member)
      this.$nextTick(()=>{
        sessionStorage.member = JSON.stringify(this.member);
        sessionStorage.service = JSON.stringify(this.service);
        sessionStorage.source = JSON.stringify(this.source);
        sessionStorage.staff = JSON.stringify(this.staff);
        sessionStorage.order = JSON.stringify(this.order);
      })
    },
    computed:{
    },
    watched(){
    },
    methods: {
      addAunt(e){
        let _this=this;
        this.$router.push({name: 'replaceAunt', params: {orderNo: _this.orderNo}})
      },
//      家政员详情
      detailAunt(e){
        let _this=this;
        this.$router.push({name: 'detailOrderInfo', params: {staffId: _this.initStaff.staffId},query: {orderNo:_this.orderNo}})
      }
    },
    props: ['priceshow', 'order', 'member', 'service', 'staff', 'source','staffShow','orderStatus']
  }
</script>
