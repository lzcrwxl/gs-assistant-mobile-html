<template>
  <div id="auntDetailTemplate">
    <div class="videoShow" v-if="dataVM.path">
      <video :src="dataVM.path" controls ></video>
    </div>
    <div class="personal_info">
      <!-- <p class="ic-title">基本信息</p> -->
      <div class="top_info">
        <img :src="baseInfo.headImage"/>
        <div class="top_right_box">
          <div class="top_right">
            <h1>
              <span v-if="baseInfo.isLocalStaff==1">{{baseInfo.staffName}}</span>
              <span v-if="baseInfo.isLocalStaff==0">
                <em v-if="baseInfo.sex=='女'">
                  {{baseInfo.staffName.substr(0,1)+"阿姨"}}
                </em>
                 <em v-if="baseInfo.sex=='男'">
                  {{baseInfo.staffName.substr(0,1)+"师傅"}}
                </em>
              </span>
              <span class="staffNo">编号：{{baseInfo.staffNo}}</span>
            </h1>
            <p>{{baseInfo.age}}岁&nbsp;|&nbsp;属{{baseInfo.zodiac}}&nbsp;|&nbsp;{{baseInfo.nativePlace}}人&nbsp;|&nbsp;{{baseInfo.constellation}}&nbsp;|&nbsp;{{baseInfo.education|getValue}}</p>
          </div>
        </div>
        <span class="more" @click="showMore">{{moreTxt}}</span>
      </div>
      <div class="bottom_info" v-cloak v-show="isMore">
        <ul>
          <li>身高：<span>{{baseInfo.height}}cm</span></li>
          <li>婚姻状况：<span>{{baseInfo.maritalStatus|getValue}}</span></li>
          <li>血型：<span>{{baseInfo.bloodType|getValue}}</span></li>
          <li>生育情况：<span>{{baseInfo.fertilitySituation|getValue}}</span></li>
        </ul>
      </div>
    </div>
    <div class="info-wrapper">
      <div class="infoCard_update">
        <p class="ic-title title_bg01">求职意向</p>
        <div class="ic-content" id="service-info">
          <div class="service_info_list">
            <p class="info_list_left">服务工种</p>
            <div class="info_list_right service_item">{{jobInfo.servicesItemValue}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">期望薪资</p>
            <div class="info_list_right price">{{jobInfo.price}}{{jobInfo.unitValue}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">从业经验</p>
            <div class="info_list_right experience">{{jobInfo.experienceValue}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">服务区域</p>
            <div class="info_list_right serviceAreaValue">{{serviceAreaValue}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">技能特点</p>
            <div class="info_list_right skills">{{jobInfo.skillsValue}}</div>
          </div>
        </div>
      </div>
      <div class="infoCard_update">
        <p class="ic-title title_bg02">证件信息</p>
        <div class="ic-content fix" id="certificate-info">
          <p>身份证</p>
          <p v-if="item.certifiedStatus=='审核通过'" v-cloak v-for="(item,index) in certsList" :key="index">
            {{item.certName|getValue}}</p>
        </div>
      </div>
      <div class="infoCard_update">
        <p class="ic-title title_bg03">能力特点</p>
        <div class="ic-content" id="nengli">
          <div class="service_info_list">
            <p class="info_list_left">性格特点</p>
            <div class="info_list_right"><span v-for="(item,index) in jobInfo.characerFeature" :key="index">{{item.skillsValue}} &nbsp;&nbsp;</span>
            </div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">烹饪特点</p>
            <div class="info_list_right"><span v-for="(item,index) in jobInfo.cookingFeature" :key="index">{{item.skillsValue}} &nbsp;&nbsp;</span>
            </div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">语言特点</p>
            <div class="info_list_right"><span v-for="(item,index) in jobInfo.languageFeature" :key="index">{{item.skillsValue}} &nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="infoCard_update">
        <p class="ic-title title_bg04">经历和评价</p>
        <div class="ic-content" id="evaluate">
          <div class="service_info_list">
            <p class="info_list_left">工作经历</p>
            <div class="info_list_right">{{jobInfo.workExperience}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">老师评价</p>
            <div class="info_list_right">{{jobInfo.teacherEvaluation}}</div>
          </div>
          <div class="service_info_list">
            <p class="info_list_left">自我评价</p>
            <div class="info_list_right">{{jobInfo.selfEvaluation}}</div>
          </div>
        </div>
        <!-- <div class="ic-content ic-pp" id="workExperience"></div> -->
      </div>
      <div class="infoCard_update photoWrapper">
        <p class="ic-title title_bg05">照片</p>
        <div class="ic-content photo_c" id="photo">
          <ul class="fix">
            <li v-for="(item,index) in imageMedia" :key="index" @click="show(index)">
              <img :src="item.path||''" class="previewer-demo-img"/>
            </li>
          </ul>
          <div v-transfer-dom>
            <previewer :list="imageMedia" ref="previewer" :options="options"></previewer>
          </div>
        </div>
      </div>
    </div>
    <!--<slot name="item" :text="baseInfo.mobile">
    </slot>-->
    <slot :text="baseInfo.mobile" :mobile="baseInfo.mobileHref" v-if="baseInfo.isLocalStaff==1" :contact="contactTxt"></slot>
    <slot :text="baseInfo.resumeContactPhone" :mobile="baseInfo.resumeContactPhoneHref" :contact="baseInfo.resumeContactTeacher" v-else></slot>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

  #auntDetailTemplate {
    .videoShow {
      width: 100%;
      height: 4rem;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .photoWrapper {
      margin-bottom: 1.5rem!important;
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
    .contact-bar {
      position: fixed;
      width: 100%;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f0edf0;
      background: #f7f7fa;
      height: .96rem;
      line-height: .96rem;
      padding: 0 .3rem;
      .contact {
        padding-left: .5rem;
        background: url("../../assets/img/staff/mobile.png") no-repeat left center;
        background-size: .32rem .31rem;
        font-size: .34rem;
        color: #ff5f58;
      }
      .contact-btn {
        width: 1.8rem;
        height: .56rem;
        vertical-align: middle;
        border-radius: .06rem;
        background: #0080ff;
        font-size: .26rem;
        color: #ffffff;
        box-shadow: .02rem .02rem .04rem rgba(0, 104, 208, .43);
      }
    }
    .personal_info {
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

              .staffNo {
                color: #8c8c8c;
                font-size: .20rem;
                margin-left: .42rem;
              }
            }
            p {
              color: #6e6e6e;
              font-size: .24rem;
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
          background: url("../../assets/img/icons/moredown.png") no-repeat;
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
            span {
              color: #4c4c4c;
            }
          }
        }
      }
    }
    .title_bg01 {
      background: url("../../assets/img/staff/qzyx.png") no-repeat;
    }

    .title_bg02 {
      background: url(../../assets/img/staff/zs.png) no-repeat;
    }

    .ic-content {
      padding: .28rem 0 .12rem;
    }

    .title_bg03 {
      background: url(../../assets/img/staff/nltd.png) no-repeat;
    }

    .title_bg04 {
      background: url(../../assets/img/staff/jlpj.png) no-repeat;
    }

    .title_bg05 {
      background: url(../../assets/img/staff/zp.png) no-repeat;
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
            max-height: 100%;
            border-radius: .08rem;
          }
        }
      }
    }

    #certificate-info p {
      padding: 0 .1rem 0 .6rem;
      background: url(../../assets/img/staff/checked.png) no-repeat;
      background-size: .24rem .24rem;
      background-position-x: .2rem;
      background-position-y: center;
      float: left;
      font-size: .24rem;
      line-height: .4rem;
      margin-bottom: .16rem;
    }
  }
</style>
<script>
  import {Previewer, TransferDom} from 'vux'

  export default{
    data(){
      return {
        isMore: false,
        contactTxt:"立即联系",
        moreTxt: "更多",
        baseInfo: {},
        jobInfo: {},
        certsList: [],
        imageMedia: [

        ],
        orderNo:"",
        resumeId:"",
        dataVM: {},
        qrToken:"",
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created () {
      this.fetchData()
    },
    directives: {
      TransferDom
    },
    methods: {
      showMore: function () {
        this.isMore = !this.isMore
        if (this.isMore) {
          this.moreTxt = "收起"
        } else {
          this.moreTxt = "更多"
        }
      },
      fetchData () {
        let _this = this;
        let staffId = this.$route.params.staffId;
        this.orderNo= this.$route.query.orderNo||"";
        var url=window.location.href;
        var a=url.indexOf("qr_token");
        if(a!=-1){
          var token=url.substring(a);
          this.qrToken=token.split("=")[1]||"";
        }
        console.log(staffId)
        console.log(this.orderNo);
        _this.getStaffMediaInfo(staffId)
        _this.getStaffInfo(staffId)
      },
      show(index) {
        this.$refs.previewer.show(index)
//        console.log(this.$refs.previewer[0]);
//        this.$refs.previewer[0].show()
//        console.log(index);
//        this.$refs.previewer.show(index)
      },
      getStaffInfo(staffId){
        let _this = this;
/*        var req = {
          url: window.global_config.staffInfo + "?staffId=" + staffId+"&orderNo="+this.orderNo+"qr_token="+this.qrToken,
          methods: 'get',
          headers: _this.$cm.params
        }*/
        $.ajax({
          url: window.global_config.staffInfo + "?staffId=" + staffId+"&orderNo="+_this.orderNo+"&qr_token="+_this.qrToken,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                let dataJD = data.jsonData;
                console.log(dataJD)
                _this.baseInfo = dataJD.baseInfo;
                _this.jobInfo = dataJD.jobInfo;
                _this.baseInfo.mobileHref = "tel:" + dataJD.baseInfo.mobile
                if(_this.baseInfo.isLocalStaff==0){
                  _this.baseInfo.resumeContactPhoneHref = "tel:" + dataJD.baseInfo.resumeContactPhone;
                  _this.baseInfo.resumeContactTeacher = dataJD.baseInfo.resumeContactName.substr(0,1)+"老师";
                }
                _this.certsList = dataJD.serviceList;
                var sList = _this.jobInfo.serviceItemList;
                var sumSkills = "";
                var sumLists = "";
//            服务工种&技能特点
                for (var i in sList) {
                  var item = sList[i];
                  var serviceItem = _this.$cm.getValue(item.serviceItemCode)
                  console.log(serviceItem)
                  if(sList.length>1){
                    if (i < sList.length - 1) {
                      sumLists += serviceItem + "、";
                    } else {
                      sumLists += serviceItem;
                    }
                  }else {
                    sumLists= serviceItem
                  }
                  var skills = item.skills;
                  for (var j in  skills) {
                    var skill = skills[j].skillsValue
                    if(skills.length>1){
                      if (j < skills.length - 1) {
                        sumSkills += skill + "、";
                      } else {
                        sumSkills += skill;
                      }
                    }else {
                      sumSkills = skill;
                    }
                  }
                }
                console.log(sumSkills, sumLists)
                _this.jobInfo.servicesItemValue = sumLists
                _this.jobInfo.skillsValue = sumSkills

//            证书查询
                $.each(dataJD.serviceList, function (i, v) {
                  console.log(v.certifiedStatus)
                  console.log(v.certName)
                })
                var str = JSON.stringify(_this.baseInfo);
                var str02 = JSON.stringify(_this.jobInfo);
                sessionStorage.baseInfo = str;
                sessionStorage.jobInfo = str02;
                _this.$store.dispatch('baseInfo', _this.baseInfo)
                _this.$store.dispatch('jobInfo', _this.jobInfo)
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              if(data.code==80010){
                _this.$router.push({path: '/resume'})
                return;
              }
              console.log(data.msg);
            }
          }
        });
       /* this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            console.log(dataJD)
            _this.baseInfo = dataJD.baseInfo;
            _this.jobInfo = dataJD.jobInfo;
            _this.baseInfo.mobileHref = "tel:" + dataJD.baseInfo.mobile
            _this.certsList = dataJD.serviceList;
            var sList = _this.jobInfo.serviceItemList;
            var sumSkills = "";
            var sumLists = "";
//            服务工种&技能特点
            for (var i in sList) {
              var item = sList[i];
              var serviceItem = _this.$cm.getValue(item.serviceItemCode)
              console.log(serviceItem)
              if(sList.length>1){
                if (i < sList.length - 1) {
                  sumLists += serviceItem + "、";
                } else {
                  sumLists += serviceItem;
                }
              }else {
                sumLists= serviceItem
              }
              var skills = item.skills;
              for (var j in  skills) {
                var skill = skills[j].skillsValue
                if(skills.length>1){
                  if (j < skills.length - 1) {
                    sumSkills += skill + "、";
                  } else {
                    sumSkills += skill;
                  }
                }else {
                  sumSkills = skill;
                }
              }
            }
            console.log(sumSkills, sumLists)
            _this.jobInfo.servicesItemValue = sumLists
            _this.jobInfo.skillsValue = sumSkills

//            证书查询
            $.each(dataJD.serviceList, function (i, v) {
              console.log(v.certifiedStatus)
              console.log(v.certName)
            })
            _this.$store.dispatch('baseInfo', _this.baseInfo)
            _this.$store.dispatch('jobInfo', _this.jobInfo)
          }
        }).catch((err) => console.log(err))*/
      },
//      获取照片视屏
      getStaffMediaInfo(staffId){
        let _this = this;
        var req = {
          url: window.global_config.mediaInfo + "?staffId=" + staffId,
          methods: 'get',
          headers: _this.$cm.params
        }
        $.ajax({
          url: window.global_config.mediaInfo + "?staffId=" + staffId+"&qr_token="+_this.qrToken,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                let dataJD = data.jsonData;
                _this.dataVM = dataJD.videoMedia;
                _this.imageMedia = dataJD.imageMedia
                for(var i in  _this.imageMedia){
//                  _this.imageMedia[i].w=130;
//                  _this.imageMedia[i].h=160;
                  _this.imageMedia[i].src=_this.imageMedia[i].path;
                }
//                _this.imageMedia.src=_this.imageMedia.path;
                console.log(_this.imageMedia);
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              if(data.code==80010){
                _this.$router.push({path: '/resume'})
                return;
              }
              console.log(data.msg);
            }
          }
        });
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.dataVM = dataJD.videoMedia;
            _this.imageMedia = dataJD.imageMedia
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
      }
    },
    components: {
      Previewer,
    },
    computed: {
      // 计算属性的 getter
      serviceAreaValue: function () {
        var serviceAreaValue = this.jobInfo.serviceAreaValue;
        if (this.$cm.isEmpty(serviceAreaValue)) {
          serviceAreaValue = "不限"
        }
        return serviceAreaValue;
      }
    }
  }
</script>
