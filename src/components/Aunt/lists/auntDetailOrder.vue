<template>
  <div id="aunt-detail">
    <HeadView :staffId="staffId"></HeadView>
    <AuntDetailTemplate>
     <!-- <div class="contact-bar">
        <span class="contact" slot="item" slot-scope="props">{{ props.text }}</span>
        <a :href="props.text" class="contact-btn">立即联系</a>
      </div>-->
      <template slot-scope="props">
        <div class="contact-bar">
          <span class="contact">{{ props.text }}</span>
          <a :href="props.mobile" class="contact-btn">{{props.contact}}</a>
        </div>
      </template>
    </AuntDetailTemplate>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .photoWrapper{
    margin-bottom: 1.4rem!important;
  }
  .info-wrapper {
    .infoCard_update {
      margin-bottom: .26rem;
      background-color: #FFFFFF;
      padding: 0 .3rem;
      .ic-title {
        line-height: .84rem;
        padding-left: .62rem;
        border-bottom: 1px solid #f0f0f0;
        font-size: .28rem;
        background-size: .4rem auto;
        background-position: left center;

      }
    }
  }
  .contact-bar{
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1px solid #f0edf0;
    background: #f7f7fa;
    height: .96rem;
    line-height: .96rem;
    padding:0 .3rem;
    .contact{
      padding-left: .5rem;
      background: url("../../../assets/img/staff/mobile.png")no-repeat left center;
      background-size: .32rem .31rem;
      font-size: .34rem;
      color: #ff5f58;
    }
    .contact-btn{
      width: 1.8rem;
      height: .56rem;
      line-height:.56rem;
      text-align: center;
      vertical-align: middle;
      border-radius: .06rem;
      background: #0080ff;
      font-size: .26rem;
      color: #ffffff;
      box-shadow: .02rem .02rem .04rem rgba(0,104,208,.43);
    }
  }
  .personal_info{
    background-color: #FFFFFF;
    background: linear-gradient(-124deg, #e4f7ff 17%, #cde6ff);
    .top_info {
      padding: .2rem .3rem .2rem;
      height: 2rem;
      /*background: url(../img/infotopbg.png) no-repeat;*/
      background-size: 100% 100%;
      position: relative;
      img {
        float: left;
        width: 1.3rem;
        height: 1.6rem;
        border-radius: .06rem;
      }
      .top_right_box {
        padding-left: 1.6rem;
        padding-right: .9rem;
        .top_right {
          height: 1.6rem;
          border-bottom: 1px dashed #fff;
          h1 {
            font-size: .36rem;
            padding-top: .32rem;
            line-height: .36rem;
            span {
              color: #8c8c8c;
              font-size: .2rem;
              margin-left: .42rem;
            }
          }
          p {
            color: #6e6e6e;
            font-size: .2rem;
            margin-top: .26rem;
            margin-right: -.9rem;
          }
        }
      }
      span.more {
        font-size: .14rem;
        color: #868686;
        position: absolute;
        right: .5rem;
        bottom: .1rem;
        line-height: .15rem;
        padding: .8rem .2rem 0 1rem;
        background: url("../../../assets/img/icons/moredown.png") no-repeat;
        background-size: .13rem;
        /*background: url(../img/moredown.png) no-repeat;*/
        background-position: 100% 100%;
        /*background-size: .6rem;*/
      }
    }
    .bottom_info {
      /*display: none;*/
      /*background: url(../img/botinfobg.png) no-repeat;*/
      background-size: 100% 100%;
      padding: 0 .3rem;
      margin-top: -1px;
      ul {
        overflow: hidden;
        padding: .02rem 0 .06rem 1.6rem;
        li {
          width: 50%;
          float: left;
          font-size: .24rem;
          color: #808080;
          line-height: .38rem;
          margin-bottom: .2rem;
          span{
            color: #4c4c4c;
          }
        }
      }
    }
  }
  .title_bg01 {
    background: url("../../../assets/img/staff/qzyx.png") no-repeat;
  }

  .title_bg02 {
    background: url(../../../assets/img/staff/zs.png) no-repeat;
  }

  .ic-content {
    padding: .28rem 0 .12rem;
  }

  .title_bg03 {
    background: url(../../../assets/img/staff/nltd.png) no-repeat;
  }

  .title_bg04 {
    background: url(../../../assets/img/staff/jlpj.png) no-repeat;
  }

  .title_bg05 {
    background: url(../../../assets/img/staff/zp.png) no-repeat;
  }

  .service_info_list {
    line-height: .44rem;
    margin-bottom: .16rem;
    overflow: hidden;
    font-size: .28rem;
  }

  .service_info_list p.info_list_left {
    float: left;
    width: 1.3rem;
    color: #808080;
    text-align: right;
  }

  .info_list_right {
    padding-left: 1.8rem;
  }

  #photo {
    ul {
      padding: .08rem 0 .24rem;
      li {
        border-radius: .08rem;
        border: 1px solid #f0edf0;
        float: left;
        width: 1.3rem;
        height: 1.6rem;
        margin-right: 1%;
        box-sizing: border-box;
        margin-bottom: .06rem;
        border: 1px solid #e5e5e5;
        background-size: cover;
        background-position: center;
        img {
          width: 100%;
          height: auto;
          border-radius: .08rem;
        }
      }
    }
  }

  #certificate-info p {
    padding: 0 .1rem 0 .6rem;
    background: url(../../../assets/img/staff/checked.png) no-repeat;
    background-size: .24rem .24rem;
    background-position-x: .2rem;
    background-position-y: center;
    float: left;
    font-size: .24rem;
    line-height: .4rem;
    margin-bottom: .16rem;
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import AuntDetailTemplate from "@/components/template/auntDetailTemplate"

  export default{
    data(){
      return {
        isMore:false,
        moreTxt:"更多",
        staffId:"",
        orderNo:""
      }
    },
    created(){
      this.$cm.shareWechat();
      this.staffId=this.$route.params.staffId;
      this.orderNo=this.$route.params.orderNo;
      console.log(this.staffId)
    },
    methods:{
      showMore:function () {
        this.isMore=!this.isMore
        if (this.isMore){
          this.moreTxt="收起"
        }else {
          this.moreTxt="更多"
        }
      }
    },
    components: {
      HeadView,
      AuntDetailTemplate
    }
  }
</script>
