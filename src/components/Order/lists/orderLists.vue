<template>
  <div>
    <ul class="order-lists" v-show="!noStaff">
      <router-link class="order-item" :to="{name:status,params:{orderNo:item.orderNo,source:item.orderSource,orderStatus:item.orderStatus}}" tag="li" v-for="(item,index) in ordersList" :key="index">
        <div class="dib service mr30" :style="item.serviceStyle">
          {{item.serviceStyle}}
          <p>{{item.serviceItemCode}}</p>
          <div>{{item.serviceType}}</div>
        </div>
        <div class="order-detail dib mt5">
          <div class="l">
            <h4 class="f34">{{item.memberName}}<img src="../../../assets/img/icons/xiang.png" alt="" class="xiang" v-show="item.isPublishedJob=='1'">
            </h4>
            <p class="f30 mt20">{{item.memberMobile}}</p>
            <p class="f30 mt20 g8">{{item.serviceProvice}}-{{item.serviceCity}}-{{item.serviceCounty}}</p>
          </div>
          <div class="rtInfo tr mt10">
            <div class="time f26 g8">{{item.orderTime|formateTimeBefore}}</div>
            <div class="price">{{item.orderStatus|toText}}</div>
          </div>
        </div>
      </router-link>
    </ul>
    <div class="noStaff" v-show="noStaff">
      暂无内容~
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  //无内容
  .noStaff{
    background: url("../../../assets/img/noCtn.png")no-repeat center 3rem;
    background-size: 1.68rem 1.57rem;
    height:6rem;
    width: 100%;
    padding-top:4.8rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
  }

  .order-lists {
    .order-item {
      margin: .3rem 0;
      background: #ffffff;
      padding: .24rem .3rem;
      display: flex;
      .service {
        /*background: url("../../../assets/img/red.png") no-repeat center;*/
        background-repeat: no-repeat;
        background-position: center;
        background-size: 1.48rem;
        width: 1.48rem;
        height: 1.48rem;
        color: #ffffff;
        text-align: center;
        p {
          margin-top: .36rem;
          font-size: .32rem;
          font-weight: 600;
          text-shadow: .04rem .04rem .05rem rgba(0, 0, 0, .28);
        }
        div {
          font-size: .26rem;
          margin-top: .2rem;
        }
        img {
          position: absolute;
        }
      }
      .order-detail {
        flex-grow: 1;
        position: relative;
        h4 {
          font-weight: 600;
        }
        .price {
          color: #ff5f58;
          font-size: .3rem;
          margin-top: .28rem;
        }
        .rtInfo {
          position: absolute;
          right: 0;
        }
      }
      &:last-child {
        /*margin-bottom: 2rem;*/
      }
    }
  }
  .xiang{
    vertical-align: bottom;
    margin-left: .3rem;
    height: .3rem;
    width: .3rem;
  }
</style>
<script>
  export default{
    data(){
      return {
//        ordersList: [],
        routerLink: this.route,

      }
    },
    created(){
      this.fetchData();
    },
    watch: {
      $route(to,from){
        console.log(from.name,to.name);

//        let path = this.$route.path.substring(1);
      }
    },
    methods: {
      fetchData(){
        /*let _this = this;
        var queryStatus=""
        var link=_this.routerLink
        console.log(this.routerLink);
        if(link=="inprocess"){
          queryStatus="process"
          _this.inprocessData(queryStatus);
        }else if (link=="detail"){
          _this.newReserveData();
        }else if(link=="complete"){
          _this.completeData();
        }*/
      },
    },
    props: ["ordersList","status",'noStaff']
  }
</script>
