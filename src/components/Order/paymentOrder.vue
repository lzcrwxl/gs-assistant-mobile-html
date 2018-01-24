<template>
  <div id="modifyOrder">
    <HeadView></HeadView>
    <div class="modify-order-content">
      <!--<div>
        <div v-show="priceShow">
          <h4>订单价格<span class="f24 g8 ml20">订单价格=阿姨价格+服务费</span></h4>
          <ul class="modify-lists fix ovh">
            <li class="modify-item">
              <h5 class="modifyLfTitle mt30">阿姨价格</h5>
              <div class="modifyRtInfo">
                <input type="text" placeholder="输入整数" class="intBase">
              </div>
            </li>
            <li class="modify-item">
              <h5 class="modifyLfTitle mt30">服务费</h5>
              <div class="modifyRtInfo">
                <input type="text" placeholder="输入整数" class="intBase" value="0">
              </div>
            </li>
          </ul>
        </div>
        <h4>服务信息</h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item pillContainer">
            <h5 class="modifyLfTitle">服务工种</h5>
            <div class="modifyRtInfo">
            <span class="pillBase modifyBox" :class="[pillIndex==index?'pillChecked':'']"
                  v-for="(item,index) in serviceTypes" @click="toggle(index)">{{item.name}}</span>
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle">服务类型</h5>
            <div class="modifyRtInfo">
              <label class="mr70">
                <input type="radio" class="rdoBase" name="type" checked>住家
              </label>
              <label class="">
                <input type="radio" class="rdoBase" name="type">不住家
              </label>
            </div>
          </li>
          &lt;!&ndash;<li class="modify-item">
            <h5 class="modifyLfTitle">服务时间</h5>
            <div class="modifyRtInfo">
              <input type="date">-<input type="date">
            </div>
          </li>&ndash;&gt;
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">客户预算</h5>
            <div class="modifyRtInfo">
              <input type="text" class="intMd" maxlength="7" placeholder="输入整数">
              <select name="" id="" class="intMd">
                <option value="">元/月</option>
              </select>
            </div>
          </li>
        </ul>
        <h4>服务要求<span class="f24 g8 ml20">更多信息可在PC端维护</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item pillContainer">
            <h5 class="modifyLfTitle">服务工种</h5>
            <div class="modifyRtInfo">
            <span class="pillBase skillBox" v-for="(item,index) in skills" @click="checkPill(item)"
                  :class="[{ pillChecked: item.isChecked }]">{{item.name}}</span>
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle">特殊要求</h5>
            <div class="modifyRtInfo">
            <textarea class="textMd">
            </textarea>
            </div>
          </li>
        </ul>
        <h4>客户信息<span class="f24 g8 ml20">更多信息可在PC端维护</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">客户姓名</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="姓名" class="intBase">
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">手机号码</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="11位" class="intBase" maxlength="11">
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">服务地址</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="" class="intBase">
            </div>
          </li>
          <li class="modify-item">
            <h5 class="modifyLfTitle mt30">详细地址</h5>
            <div class="modifyRtInfo">
              <input type="text" placeholder="" class="intBase">
            </div>
          </li>
        </ul>
        <h4>安排家政员</h4>
        <ul class="detail-info fix mb60">
          <li class="detail-info-item f0 rel">
            <div class="dib img-box">
              <img :src="avatar" alt="" class="avatar">
            </div>
            <div class="info-r dib ml30">
              <h6 class="f34 mt15">韩梅梅</h6>
              <p class="f30 mt30">月嫂、育儿嫂</p>
              <p class="f24 mt30 detail-desc"><i>30岁 </i>| <i>属羊 </i>| <i>黑龙江人 </i>| <i>处女座 </i>| <i>本科及以上</i></p>
            </div>
            <button class="changeAunt btnRd btn-fill">更换家政员</button>
          </li>
        </ul>
        <h4>备注<span class="f24 g8 ml20">此处信息仅自己可见</span></h4>
        <ul class="modify-lists fix ovh">
          <li class="modify-item">
            <textarea class="textMd">
            </textarea>
          </li>
        </ul>
      </div>-->
      <ModifyOrderTemplate :order="order" :member="member" :service="service" :staff="staff" :btnMsg="btnMsg"></ModifyOrderTemplate>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/common";
</style>
<script>
  import HeadView from "@/components/Header/headView"
//  import OrderTemplate from '@/components/template/orderTemplate'
  import ModifyOrderTemplate from '@/components/template/modifyOrderTemplate'
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default{
    data(){
      return {
        order:{},
        member:{},
        service:{},
        staff:{},
        isAunt:false,
        btnMsg:"pay"
      }
    },
    created(){
      this.$cm.shareWechat();
      this.fetchData();
    },
    components: {
      HeadView,
      ModifyOrderTemplate
    },
    methods: {
      fetchData(){
        this.order = JSON.parse(sessionStorage.order);
        this.member = JSON.parse(sessionStorage.member);
        this.service = JSON.parse(sessionStorage.service);
        this.source = JSON.parse(sessionStorage.source);
        this.staff = JSON.parse(sessionStorage.staff);
      }
    },
    watch: {
      $route(to, from){
        console.log(from)
      }
    },
  }
</script>
