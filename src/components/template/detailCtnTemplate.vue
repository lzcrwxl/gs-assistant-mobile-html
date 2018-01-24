<template>
  <div class="grapContainer">
    <div class="grapHeader">
      <div class="headTop">
        <h4>
            <span class="f30 mr30">
            正在寻找
          </span>{{jItems.serviceTypeValue}} - {{jItems.serviceMoldValue}}
        </h4>
        <slot></slot>
      </div>
      <ul class="headBottom">
        <li class="bottomInfo">
          <p>{{jItems.addTime|formateTimeBefore}}</p>
          <p class="lin02">发布时间</p>
        </li>
        <li class="bottomInfo">
          <p>{{jItems.salary}}{{jItems.salaryTypeValue}}</p>
          <p class="lin02">价格预算</p>
        </li>
        <li class="bottomInfo">
          <p>{{jItems.ageValue}}</p>
          <p class="lin02">年龄要求</p>
        </li>
      </ul>
    </div>
    <div class="grapSection">
      <div class="grapWrapper">
        <h5>需求详情</h5>
        <ul class="demandLists ovh">
          <li class="demandItem">
            <h6 class="demandLeft">
              服务区域
            </h6>
            <div class="demandRight">
              {{jItems.serviceProvinceValue}}-{{jItems.serviceCityValue}}-{{jItems.serviceAreaValue}}
            </div>
          </li>
          <li class="demandItem">
            <h6 class="demandLeft">
              服务时间
            </h6>
            <div class="demandRight">
              {{jItems.serviceStartTime|formateTime}} 至 {{jItems.serviceEndTime|formateTime}}
            </div>
          </li>
          <li class="demandItem">
            <h6 class="demandLeft">
              技能要求
            </h6>
            <div class="demandRight">
              {{jItems.skillRequirementsValue}}
            </div>
          </li>
        </ul>
      </div>
      <div class="grapWrapper">
        <h5>职位要求</h5>
        <ul class="demandLists ovh">
          <li class="demandItem g8">
            <div v-html="jItems.demand"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variable";

  .grapContainer {
    .grapHeader {
      color: #ffffff;
      background: @blue;
      .headTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.6rem;
        line-height: 1.6rem;
        padding-left: .3rem;
        h4 {
          display: inline-block;
          font-family: STHeiti;
          font-size: .34rem;
        }
        .grapProgress {
          box-sizing: border-box;
          display: inline-block;
          line-height: .6rem;
          padding-left: .1rem;
          width: 1.4rem;
          height: .6rem;
          text-align: center;
          background: #73b9ff;
          border-top-left-radius: .6rem;
          border-bottom-left-radius: .6rem;
        }
      }
      .headBottom {
        width: 100%;
        /*display: flex;*/
        .bottomInfo {
          text-align: center;
          font-size: .26rem;
          display: inline-block;
          width: 33.33333%;
          position: relative;
          &:not(:last-child):after {
            position: absolute;
            right: 0;
            top: .1rem;
            content: '';
            width: 1px;
            height: .48rem;
            background: #d5d5d5;
          }
          p {
            margin-bottom: .2rem;
          }
          .lin02 {
            color: #c8e4ff;
            margin-bottom: .3rem;
          }
        }
      }
    }
    .grapSection {
      font-size: .3rem;
      .grapWrapper {
        margin: .24rem 0;
        padding: 0 .3rem;
        background: #ffffff;
        h5 {
          height: .88rem;
          line-height: .88rem;
          border-bottom: 1px solid #efeff4;
        }
        .demandLists {
          padding-top: .2rem;
          .demandItem {
            font-size: .3rem;
            line-height: .48rem;
            margin-bottom: .2rem;
            .demandLeft {
              float: left;
              width: 1.5rem;
              color: #888;
            }
            .demandRight {
              padding-left: 1.5rem;
              display: block;
            }
          }
        }
      }
    }
  }
</style>
<script>
  export default{
    data(){
      return {
//        jItems: {},
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        let _this=this;
        let name=_this.$route.name;
        let jobId = this.$route.params.jobId;
        let resumeId = this.$route.params.resumeId;
        console.log(jobId)
        console.log(resumeId)
       /* if(name.indexOf("jobRelease")!=-1){
          _this.jobDetailData(jobId);
        }*/
      },
/*//      职位详情
      jobDetailData(jobId){
        let _this=this;
        var req = {
          url: window.global_config.jobsList + "/" + jobId,
          methods: 'get',
          headers: _this.$cm.params
        }
        this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.jItems = dataJD;
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))
      },*/
    },
    props:['jItems']
  }
</script>
