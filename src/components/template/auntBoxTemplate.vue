<template>
  <router-link :to="{name:'auntResume',staffId:staffInfo.staffId,query:{orderNo:orderNo,resumeId:resumeId}}" class="auntBox" tag="div">
    <h4>投递的家政员</h4>
    <!--<AuntTemplate></AuntTemplate>-->
    <ul class="detail-info fix">
      <li class="detail-info-item f0 rel">
        <div class="dib img-box vb">
          <img :src="staffInfo.headImage" alt="" class="avatar">
        </div>
        <div class="info-r dib ml30 vb">
          <h6 class="f34 mt15">
            <span v-if="staffInfo.sex=='01'">{{staffInfo.staffName.substr(0,1)+"师傅"}}</span>
            <span v-if="staffInfo.sex=='02'">{{staffInfo.staffName.substr(0,1)+"阿姨"}}</span>
            <span class="f26 ml30">{{jItems.serviceTypeValue}}</span>
          </h6>
          <p class="f24 detail-desc"><i>{{staffInfo.age}}岁 </i>| <i>属{{staffInfo.zodiacValue}} </i>| <i>{{staffInfo.nativePlaceValue}}人 </i>| <i>{{staffInfo.constellationValue}}</i>| <i>{{staffInfo.educationValue}}</i></p>
          <div class="detail-price"><em>￥</em>{{jItems.salary}}<span class="unit f20">{{jItems.salaryTypeValue}}</span></div>
        </div>
      </li>
    </ul>
    <div class="aunt-bar">
      <hr :style="{ width:match + '%' }">
      <span class="percentage">
            匹配度  <em>{{match}}%</em>
          </span>
      <span class="r f24 barTxt">完善家政员信息可以提高匹配度</span>
    </div>
  </router-link>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .auntBox {
    background: #ffffff;
    h4 {
      font-size: .3rem;
      margin: 0 .3rem;
      color: #0080ff;
      height: .88rem;
      line-height: .88rem;
      border-bottom: 1px solid #efeff4;
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
      position: absolute;
      top: -3px;
      left: 0;
      height: 3px;
      border-radius: 1.5px;
      border: none;
      background: #3e9dfc;
      border-top: 3px solid #3e9dfc;
    }
  }
  .detail-info {
    padding: .3rem;
    background: #ffffff;
    font-size: .3rem;
    .detail-info-item {
      .avatar {
        width: 1.48rem;
        height: 1.81rem;
      }
      .info-r {
        position: relative;
        .detail-desc {
          color: #a9a9a9;
          margin-top: .38rem;
        }
        h6{
          width: 5rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          span{
            color: #6b6b6b;
          }
        }
        .detail-price{
          margin-top: .4rem;
          color: #ff5f58;
          font-size: .26rem;
        }
      }
    }
  }
</style>
<script>
 /* import AuntTemplate from 'components/template/auntPannelTemplate'
  export default{

    components: {
      AuntTemplate
    },
  }*/
 export default{
   data(){
     return {
       src: require("@/assets/img/icons/phone.png"),
       avatar: require("@/assets/img/photo.png"),
//       orderNo:""
//       staffInfo:{},
//       jItems:{}
     }
   },
   created(){
//     this.fetchData();
   },
   methods: {
     /*fetchData(){
       let _this = this;
       var params = this.$route.params;
       let staffId=params.staffId;
       console.log(staffId)
       var req = {
         url: window.global_config.staffInfo + "?staffId=" + staffId,
         methods: 'get',
         headers: _this.$cm.params
       }
       this.$http(req).then(function (res) {
         var data = res.data;
         if (data.success) {
           let dataJD = data.jsonData;
           console.log(dataJD)
           _this.staffInfo = dataJD.staffInfo;
           _this.jItems = dataJD.jobInfo;
         }
       }).catch((err) => console.log(err))
     },*/
   },
   props:['jItems','staffInfo','match','orderNo','resumeId']
 }
</script>
