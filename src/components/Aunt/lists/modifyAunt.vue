<template>
  <div id="modifyAunt">
    <HeadView></HeadView>
    <form class="modifyContent" id="dataForm">
      <div class="modifyFrame">
        <h4>基本信息</h4>
        <form id="basicDataForm" enctype="multipart/form-data">
          <ul class="modifyLists">
            <li>
              <h6 class="dib">
                手机号码
              </h6>
              <div class="rt-items">
                <input type="text" name="mobile" placeholder="请输入手机号" class="intBase" maxlength="11"
                       v-model="base.mobile">
              </div>
            </li>
            <li>
              <h6 class="dib">
                身高(cm)
              </h6>
              <div class="rt-items">
                <input type="text" placeholder="" name="height" class="intBase" maxlength="11" v-model="base.height">
              </div>
            </li>
            <li>
              <h6 class="dib">
                学历
              </h6>
              <div class="rt-items">
                <select type="text" name="education" class="intBase">
                </select>
              </div>
            </li>
            <li>
              <h6 class="dib">
                血型
              </h6>
              <div class="rt-items">
                <select name="bloodType" id="" class="intBase">
                  <!--<option :value="item.code" v-for="(item,index) in bloodType">{{item.name}}</option>-->
                </select>
              </div>
            </li>
            <li>
              <h6 class="dib">
                婚姻状况
              </h6>
              <div class="rt-items">
                <select name="maritalStatus" id="" class="intBase">
                </select>
              </div>
            </li>
            <li>
              <h6 class="dib">
                生育情况
              </h6>
              <div class="rt-items">
                <select name="fertilitySituation" id="" class="intBase">
                </select>
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div class="modifyFrame">
        <h4>求职信息
          <span>更多信息，请登录PC端进行维护</span>
        </h4>
        <form id="resumeForm" enctype="multipart/form-data">
          <ul class="modifyLists">
            <li>
              <h6 class="serviceType">
                服务工种
              </h6>
              <div class="rt-items serviceType">
                {{job.servicesItemValue}}
              </div>
            </li>
            <li>
              <h6 class="dib">
                期望薪资
              </h6>
              <div class="rt-items">
                <input type="text" class="intMd" v-model="job.price" name="price">
                <select name="salaryType" id="" class="intMd r" v-model="job.unit">
                  <option value="">--请选择--</option>
                  <option v-for="(item,index) in salaryRange" :value="item.id">{{item.value}}</option>
                </select>
              </div>
            </li>
            <li>
              <h6>
                从业经验
              </h6>
              <div class="rt-items">
                <select name="experience" id="" class="intBase">
                </select>
              </div>
            </li>
            <li>
              <h6>
                管理方式
              </h6>
              <div class="rt-items">
                <label class="w170">
                  <input type="radio" name="manageWay" class="rdoDot" value="02" v-model="job.manageWay">
                  中介制
                </label>
                <label class="">
                  <input type="radio" name="manageWay" class="rdoDot" value="01" v-model="job.manageWay">
                  员工制
                </label>
              </div>
            </li>
            <li>
              <h6>
                服务区域
              </h6>
              <div class="rt-items service-district">
                <div class="dib">
                  <label class="w170">
                    <input type="radio" name="areaRadio" class="rdoDot" value="01" v-model="noLimited">
                    不限
                  </label>
                  <label class="">
                    <input type="radio" name="areaRadio" class="rdoDot" value="02" v-model="noLimited">
                    指定区域
                  </label>
                </div>
                <select name="serviceArea" id="" class="intSm r mt10" v-model="serviceAreaCode"
                        v-show="noLimited=='02'">
                  <option :value="item.areaCode" v-for="(item,index) in serviceArea">{{item.areaName}}</option>
                </select>
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div class="modifyFrame">
        <h4>视频秀
          <span>视频大小不超过10M</span>
        </h4>
        <div class="videoBox">
          <div class="videoWrapper">
            <load-more v-show="isLoading"></load-more>
            <video :src="dataVM.path" controls="controls" v-show="dataVM.path"></video>
          </div>
          <ul class="widget">
            <li class="rel">
              <a class="btnSm btn-white " v-show="!dataVM.path" :class="{disabledBtn:isLoading}">上传视频</a>
              <a class="btnSm btn-white" v-show="dataVM.path" @click="deleteVM">删除视屏</a>
              <input type="file" name="file" value=""
                     accept="video/mp4,video/avi,video/mov,video/wmv,video/rmvb,video/rm,video/flv"
                     v-if="!dataVM.path" @change="upLoadVideo" :disabled="isLoading">
            </li>
            <li class="f26 g8 mt25">支持全格式</li>
          </ul>
        </div>
      </div>
      <div class="modifyFrame">
        <h4>照片墙
          <span>最多可上传4张照片，大小不超过10M</span>
        </h4>
        <ul class="photoBox">
          <li v-for="(item,index) in dataIM" :data-mediaId="item.mediaId" :data-iddefault="item.idDefault"
              class="ordinary">
            <em class="deleteCover" @click="removePhoto(index,$event)"></em>
            <img :src="item.path" alt="">
          </li>
          <li class="noPic" v-show="imgL<4">
            <load-more v-show="isLoadingImg"></load-more>
            <input type="file" name="file" class="uploadPhoto" accept="image/gif,image/png,image/bmp,image/jpeg"
                   @change="uploadPhoto">
          </li>
        </ul>
      </div>
    </form>
    <div class="tc mb20 mt20">
      <button class="btn-block btn-fill" @click="saveAuntInfo">保存</button>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/css/common";

  #modifyAunt {
    .modifyContent {
      h4 {
        height: .72rem;
        line-height: .72rem;
        padding: 0 .3rem;
        font-size: .3rem;
        span {
          font-size: .26rem;
          color: #888;
          margin-left: .3rem;
        }
      }
      .modifyLists {
        font-size: .3rem;
        padding: .28rem .3rem;
        background: #ffffff;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        h6 {
          float: left;
          color: #888888;
          /*display: inline-block;*/
          /*width: 1.5rem;*/
        }
        li {
          line-height: .88rem;
          width: 100%;
          /*display: flex;*/
          /*justify-content: space-between;*/
          &:not(:last-child) {
            margin-bottom: .24rem;
          }
          align-items: center;
          .rt-items {
            padding-left: 1.5rem;
            /*display: inline-block;*/
            /*flex: auto;*/
            label {
              display: inline-block;
            }
          }
          .service-district {
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: space-between;*/
          }
        }
      }
    }
  }

  .serviceType {
    line-height: .4rem !important;
  }

  .videoBox {
    background: #ffffff;
    padding: .43rem .3rem;
    .videoWrapper {
      width: 4.01rem;
      height: 2.26rem;
      display: inline-block;
      border-radius: .06rem;
      background: url("../../../assets/img/staff/video.png") no-repeat center;
      background-size: contain;
    }
    .widget {
      display: inline-block;
      margin-top: .5rem;
      margin-left: .44rem;
      text-align: center;
    }
  }

  video {
    width: 100%;
    height: 100%;
  }

  .disabledBtn {
    opacity: .5 !important;
  }

  .photoBox {
    background: #ffffff;
    padding: .4rem .3rem;
    li {
      position: relative;
      display: inline-block;
      width: 1.42rem;
      &:not(:last-child) {
        margin-right: .2rem;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
      height: 1.08rem;
      em {
        z-index: 99;
        width: .24rem;
        height: .24rem;
        position: absolute;
        background: url("../../../assets/img/delete.png") no-repeat center;
        opacity: .5;
        background-size: .24rem;
        padding: .12rem;
        right: -.2rem;
        top: -.2rem;
      }
    }
    .noPic {
      /*border: 2px dashed #e5e5e5;*/
      background: url("../../../assets/img/staff/pic_add.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  input[name="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -moz-opacity: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import {mapGetters, mapActions, mapState} from 'vuex'
  import {LoadMore} from 'vux'

  export default{
    data(){
      return {
        bloodType: [],
        salaryRange: [],
        serviceArea: [],
        imgPathArray: [],
        noLimited: "",
        staffId: "",
        dataVM: {},
        dataIM: [],
        imagePath: "",
        videoPath: "",
        imgL: 0,
        isLoading: false,
        isLoadingImg: false,
        base:{},
        job:{},
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    created(){
      this.$cm.shareWechat();
      this.staffId = this.$route.params.staffId;
      console.log(this.staffId)
      var str = sessionStorage.baseInfo;
      var str02 = sessionStorage.jobInfo;
      this.base = JSON.parse(str);
      this.job = JSON.parse(str02);
      this.getMediaData();
    },
    mounted(){
      var el = this.$el;
      console.log(el)
//      this.bloodType = this.$cm.getBloodTypeData();
      this.serviceArea = this.$cm.getAreaData();
      this.salaryRange = this.$cm.getSalaryRange();
      this.$cm.forEachPullDown(this.params);
      $("select[name='maritalStatus']").val(this.maritalStatusCode);
      $("select[name='fertilitySituation']").val(this.fertilitySituationCode);
      $("select[name='experience']").val(this.job.experience);
      $("select[name='education']").val(this.educationCode);
      $("select[name='bloodType']").val(this.bloodTypeCode);
      // select提示样式更改
      $("select").change(function(){
        if ($(this).val()=="") {
          $(this).addClass("grey_i");
        }else{
          $(this).removeClass("grey_i");
        }
      });
      this.verificationForm();
    },
    computed:{
      bloodTypeCode(){
        var code = this.base.bloodType.split(',')[0];
        return code;
      },
      maritalStatusCode(){
        var code = this.base.maritalStatus.split(',')[0];
        console.log(code)
        return code;
      },
      serviceAreaCode(){
        var area = this.job.serviceArea;
        var code = ""
        if (this.$cm.isEmpty(area)) {
          this.noLimited = "01";
          code = "19"
        } else {
          this.noLimited = "02"
          code = this.job.serviceArea.split(',')[0];
        }
        console.log(code)
        return code;
      },
      fertilitySituationCode(){
        console.log(this.base)
        var code = this.base.fertilitySituation.split(',')[0];
        return code;
      },
      educationCode(){
        console.log(this.base)
        var code = this.base.education.split(',')[0];
        return code;
      }
    },
    components: {
      HeadView,
      LoadMore
    },
    methods: {
//      获取家政员详情
      getStaffInfo(){

      },
//      获取媒体信息
      getMediaData(){
        let _this = this;
        var req = {
          url: window.global_config.mediaInfo + "?staffId=" + _this.staffId,
          methods: 'get',
          aysnc: false,
          headers: _this.$cm.params
        }
        /*this.$http(req).then(function (res) {
          var data = res.data;
          if (data.success) {
            let dataJD = data.jsonData;
            _this.dataVM = data.jsonData.videoMedia;
            _this.dataIM = data.jsonData.imageMedia;
            _this.imgL = _this.dataIM.length;
            console.log(dataJD)
          }
        }).catch((err) => console.log(err))*/
        $.ajax({
          url: window.global_config.mediaInfo + "?staffId=" + _this.staffId,
          type: "get",
          headers: _this.params,
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          success: function success(data) {
            if(data.success){
              if(data.code == 0){
                let dataJD = data.jsonData;
                _this.dataVM = data.jsonData.videoMedia;
                _this.dataIM = data.jsonData.imageMedia;
                _this.imgL = _this.dataIM.length;
                console.log(dataJD)
              }else{
                console.log(data.msg);
              }
            }else{
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      删除照片
      removePhoto(index, e){
        console.log(index)
        this.dataIM.splice(index, 1);
        console.log(this.dataIM);
        let _this = this;
        console.log(e);
        var el = $(e.target)
        _this.imgL--;
      },
//      删除视屏
      deleteVM(){
        this.dataVM.path = "";
      },
//      添加照片
      uploadPhoto(e){
        let _this = this;
        var self = e.target;
        var file = e.target.files[0]; // 每次只允许上传一张图片，因此只取[0]
        console.log(file)
        var objUrl = this.$cm.getObjectURL(self.files[0]);
        var fileSize = self.files[0].size;
        var size = fileSize / 1024;
        var filepath = $(self).val();
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();

        /*if (ext != ".BMP" && ext != ".PNG" && ext != ".JPG" && ext != ".JPEG") {
          alert("图片限于bmp,png,jpg,jpeg格式");
          $(self).val("");
          return;
        }*/
        ;
        if (size > 10240) {
          alert("上传的图片大小不能超过10M！");
          $(self).val("");
          return;
        }
        ;
        if (objUrl) {
          _this.isLoadingImg = true;
        }
        // 使用formData组装数据
        var formData = new FormData();
        formData.append('file', e.target.files[0]); // 文件数据
        $.ajax({
          url: window.global_config.uploadImg,
          type: "post",
          dataType: 'json',
          data: formData,
          cache: false,
          processData: false,
          contentType: false,
          success: function success(data) {
            if (data.message) {
              if (data.status == 0) {
                console.log(data);
                _this.imagePath = data.result.url;
                console.log(_this.imagePath);
                _this.isLoadingImg = false
                var temp = {
                  path: _this.imagePath,
                  mediaId: ""
                }
                _this.dataIM.push(temp)
                console.log(_this.dataIM.length);
                _this.imgL++;
              } else {
                console.log(data.msg);
              }
            } else {
              console.log(data.msg);
            }
          }
        });
      },
//添加视频
      upLoadVideo(e){
        let _this = this;
        var self = e.target
        console.log(self);
        try {
          var objUrl = this.$cm.getObjectURL(self.files[0]);
          var fileSize = self.files[0].size;
          var size = fileSize / 1024;
          var filepath = $(self).val();
          var extStart = filepath.lastIndexOf(".");
          if (size > 10240) {
            alert("上传的视频大小不能超过10M！");
            $(self).val("");
            return;
          };
          if (objUrl) {
            _this.isLoading = true;
          }
        }catch (e){
          alert(e)
        }
        // 使用formData组装数据
        var formData = new FormData();
        formData.append('file', e.target.files[0]); // 文件数据

        $.ajax({
          url: window.global_config.uploadVideo,
          type: "post",
          dataType: 'json',
          data: formData,
          cache: false,
          processData: false,
          contentType: false,
          success: function success(data) {
            if (data.message) {
              if (data.status == 0) {
                console.log(data);
                _this.videoPath = data.result.url;
                _this.isLoading = false;
                console.log(_this.videoPath);
                _this.dataVM.path = _this.videoPath;
              } else {
                console.log(data.msg);
              }
            } else {
              console.log(data.msg);
            }
          }
        });
      },
//      保存家政员
      saveAuntInfo(){
        let _this = this;
        $("#dataForm input,#dataForm select").trigger("blur");
        if ($("#dataForm .validation").length > 0) {
          return;
        }
        ;
//        保存基本资料
        $("#basicDataForm").ajaxSubmit({
          url: window.global_config.addBaseInfo,
          data: {staffId: _this.staffId},
          headers: _this.params,
          async: false,
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                console.log(data);
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
//        保存求职信息
        $("#resumeForm").ajaxSubmit({
          url: window.global_config.addJobInfo,
          data: {staffId: _this.staffId},
          headers: _this.params,
          async: false,
          type: "post",
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                console.log(data);
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
        $.each(_this.dataIM, function (v, i) {
          _this.imgPathArray.push(i.path)
        })
        console.log(_this.imgPathArray)
        if (_this.imgPathArray.length == 0) {
          var imgPath = ""
        } else {
          var imgPath = _this.imgPathArray;
        }
        console.log("videoPath:"+_this.dataVM.path);
//        保存图片视频信息
        $.ajax({
          url: window.global_config.uploadMediaPath + "?isWhole=1",
          type: "post",
          headers: _this.params,
          data: {
            videoPath: _this.dataVM.path,
            imagePath: imgPath,
            staffId: _this.staffId
          },
          traditional: true,
          dataType: "json",
          success: function success(data) {
            if (data.success) {
              if (data.code == 0) {
                window.history.go(-1);
                console.log(data.msg)
              } else {
                console.log(data.msg);
              }
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
      verificationForm(){
        let _this = this;
        //				表单验证
        var regChar = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;				//特殊字符
        var regNum = /^[0-9]*$/;
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        $("#dataForm input,#dataForm select").blur(function () {
          var self = $(this);
          var name = $(this).attr("name");
          switch (name) {
            case "height":
              if (self.val() == "") {
                _this.$cm.onError('身高不能为空', self);
              } else if (!regNum.test(self.val())) {
                _this.$cm.onError('只能填写数字', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "maritalStatus":
              if (self.val() == "") {
                _this.$cm.onError('婚姻状况不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "education":
              if (self.val() == "") {
                _this.$cm.onError('学历不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "mobile":
              if (self.val() == "") {
                _this.$cm.onError('手机号码不能为空', self);
              } else if (!regPhone.test(self.val())) {
                _this.$cm.onError('手机号码格式错误', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "bloodType":
              if (self.val() == "") {
                _this.$cm.onError('血型不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "salaryType":
              if (self.val() == "") {
                _this.$cm.onError('薪资类型不能为空', self);
              } else if ($(this).siblings("input[name='price']").val() == "") {
                _this.$cm.onError('服务价格不能为空', self);
              } else if (!regNum.test($(this).siblings("input[name='price']").val())) {
                _this.$cm.onError('只能填写数字', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "price":
              if (self.val() == "") {
                _this.$cm.onError('服务价格不能为空', self);
              } else if (!regNum.test(self.val())) {
                _this.$cm.onError('只能填写数字', self);
              } else if ($(this).siblings("select[name='salaryType']").val() == "") {
                _this.$cm.onError('薪资类型不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "experience":
              if (self.val() == "") {
                _this.$cm.onError('从业经验不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            case "serviceArea":
              if (self.val() == "") {
                _this.$cm.onError('服务区域不能为空', self);
              } else {
                _this.$cm.onSuccess(self);
              }
              break;
            default:
              break;
          }
        });
      }
    }
  }
</script>
