<template>
  <div>
    <ul class="grapLists" v-show="!noStaff">
      <router-link :to="{name:'grapdetail',params:{jobId:item.id,status:status}}" class="grapItem" tag="li" v-for="(item,index) in jobsList">
        <h4>
          <i :style="item.serviceStyle"></i>
          {{item.serviceTypeValue}}-
          <span class="f30">{{item.serviceMoldValue}}</span>
          <span class="grapPrice">{{item.salary}}{{item.salaryTypeValue}}</span>
        </h4>
        <div class="grapPannel">
          <div class="f26 g8">
            <span class="age">
                {{item.ageValue|age}}
            </span>
            <span class="location">
              {{item.serviceProvinceValue}}-{{item.serviceCityValue}}-{{item.serviceAreaValue}}
            </span>
          </div>
          <p class="requirement" v-html="item.demand">
          </p>
        </div>
        <div class="grapTips">
          <span class="g8">{{item.addTime|formateTimeBefore}}</span>
          <span class="grapTxt" v-show="status==6">已有 <em>{{item.usedNum}}</em> 人抢单</span>
          <span class="grapTxt" v-show="item.statusGrap==4">已完成</span>
          <span class="grapTxt" v-show="item.statusGrap==3">已拒绝</span>
          <span class="grapTxt" v-show="item.statusGrap==5">已取消</span>
          <span class="grapTxt" v-show="item.statusGrap==1">待确认</span>
          <span class="grapTxt" v-show="item.statusGrap==2">待面试</span>
          <slot></slot>
        </div>
      </router-link>
      <!--<li class="grapItem">
        <h4 class="nursing-ast">保姆-
          <span class="f30">住家</span>
          <span class="grapPrice">5000元/月</span>
        </h4>
        <div class="grapPannel">
          <div class="f26 g8">
            <span class="age">
                29-39岁
            </span>
            <span class="location">
              上海市-徐汇区-城区
            </span>
          </div>
          <p class="requirement">
            辅食、早教、年纪小于50岁，会普通话，性格开朗，喜欢小孩，育儿经验5年以上
          </p>
        </div>
        <div class="grapTips">
          <span class="g8">23分钟前</span>
          <span class="grapTxt">已有 <em>0</em> 人抢单</span>
        </div>
      </li>-->
    </ul>
    <div class="noStaff" v-show="noStaff">
      暂无内容~
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variable";

  .grapLists {
    .grapItem {
      background: #ffffff;
      margin: .24rem .2rem;
      border-radius: .08rem;
      box-shadow: 0 .08rem .17rem  rgba(0,0,0,.21);
      h4 {
        font-size: .34rem;
        padding: .3rem .3rem .3rem .24rem;
        position: relative;
       /* &:before {
          content: '';
          position: absolute;
          width: .06rem;
          height: .3rem;
          left: 0;
          top:.32rem;
        }*/
        i{
          position: absolute;
          width: .06rem;
          height: .3rem;
          left: 0;
          top:.32rem;
        }
        .grapPrice {
          float: right;
          color: @price;
        }
      }
      .grapPannel {
        padding: 0 .3rem 0 .24rem;
        .age{
          display: inline-block;
          padding-left:.4rem;
          margin-right: .54rem;
          background: url("../../assets/img/icons/age.png") no-repeat left center;
          background-size: .22rem .24rem;
        }
        .location{
          display: inline-block;
          padding-left: .32rem;
          background: url("../../assets/img/icons/location.png") no-repeat left center;
          background-size: .21rem .25rem;
        }
        .requirement{
          margin-top: .3rem;
          margin-bottom:.2rem;
          font-size: .3rem;
          line-height: .5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .grapTips{
        font-size: .26rem;
        height: .88rem;
        line-height: .88rem;
        background: #f5f7f9;
        padding: 0 .3rem 0 .24rem;
        .grapTxt{
          float: right;
          color: #51a2fe;
        }
      }
    }
  }
/*保姆*/
  .baby-sitter {
    &:before {
      background-color: @baby-sister;
    }
  }
  /*医院护工*/
  .nursing-ast{
    &:before{
      background-color: @nursing-assistant;
    }
  }
  //育儿嫂
  .infants-nurse {
    &:before{
      background-color: @infants-nurse;
    }
  }
/*月嫂*/
  .yue-mom{
    &:before{
      background-color: @yue-mom;
    }
  }
  /*老人陪护*/
  .elederly-nursing{
    &:before{
      background-color: @elderly-nursing;
    }
  }
  /*钟点工*/
  .part-time{
    &:before{
      background-color: @part-time;
    }
  }
  /*家庭管家*/
  .housekeeper{
    &:before{
      background-color: @housekeeper;
    }
  }
</style>
<script>
  export default{
    props:['status','jobsList','noStaff']
  }
</script>
