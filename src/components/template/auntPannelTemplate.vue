<template>
  <ul class="detail-info fix">
    <li class="detail-info-item f0 rel">
      <div class="dib img-box vb">
        <img :src="baseInfo.headImage" alt="" class="avatar">
      </div>
      <div class="info-r dib ml30 vb">
        <h6 class="f34 mt15">
          {{baseInfo.staffName}}
        <span class="f26 ml30">{{baseInfo.serviceTypeValue}}</span>
        </h6>
        <p class="f24 detail-desc"><i>{{baseInfo.age}}岁 </i>| <i>属{{baseInfo.zodiacValue}} </i>| <i>{{baseInfo.nativePlaceValue}}人 </i>| <i>{{baseInfo.constellationValue}}</i>| <i>{{baseInfo.educationValue}}</i></p>
        <div class="detail-price"><em>￥</em>{{baseInfo.price}}<span class="unit f20">{{baseInfo.unitValue}}</span></div>
      </div>
    </li>
  </ul>
</template>
<style lang="less" rel="stylesheet/less" scoped>
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
  export default{
    data(){
      return {
        src: require("@/assets/img/icons/phone.png"),
        avatar: require("@/assets/img/photo.png"),
//        baseInfo:{},
//        jobInfo:{}
      }
    },
    created(){
//      this.fetchData();
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
            _this.baseInfo = dataJD.baseInfo;
            _this.jobInfo = dataJD.jobInfo;
          }
        }).catch((err) => console.log(err))
      },*/
    },
    props:['jobInfo','baseInfo']
  }
</script>
