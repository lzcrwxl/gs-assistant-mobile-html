import router from '../../../router/index'
import wx from 'weixin-js-sdk';


var token={
  token:localStorage.getItem('token')
}


export default {
  //是否为空
  isEmpty: function (param) {
    if ($.trim(param) != "" && $.trim(param) != null) {
      return false;
    } else {
      return true;
    }
  },
  onError: function (msg, self) {
    if ($(".lc-validation").hasClass("lv_on")) {
      $(".lc-validation").text(msg);
      return;
    }
    $(".lc-validation").addClass("lv_on").text(msg);
  },
  onSuccess: function () {
    $(".lc-validation").removeClass("lv_on").text("");
  },
  params: {
    // token:"5_nKCMlcjALY1gVsEgUmc06r_-wjmVpPiwY_r3SN9Y91S8rogDOfGFYm8wEgCyvK001C2l-NAXiobBNwC7TlBYvDN0dKm43CQCrKuMe-Gdvcg",
    token:localStorage.getItem('token'),
  },
  getValue: function (value) {
    if (!value) return '';
    else if (value.indexOf(",") != -1) {
      value = value.split(",")[1]
    }
    return value;
  },
  //获取当前时间
  getNowTime:function () {
    let _this=this;
    var dateNow="";
    $.ajax({
      url: window.global_config.now,
      type: "get",
      headers:{
        token:localStorage.getItem('token')
      },
      data: {},
      dataType: "json",
      async:false,
      success: function success(data0) {
        dateNow = _this.newDate(data0);
      }
    });
    return dateNow;
  },
  newDate(strdate) {
    var arr = strdate.split(/[- : \/]/);
    var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  },
  pageNum: 1,
  pageSize: 8,
  classifyColor: function (value) {
    for (var idx in value) {
      var objs = value[idx];
      var obj = objs.serviceItemCode;
      if (obj == "月嫂" || obj == "育儿嫂") {
        objs.serviceStyle = this.backgroundObj.red
      } else if (obj == "保姆" || obj == "钟点工" || obj == "家庭管家") {
        objs.serviceStyle = this.backgroundObj.green
      } else if (obj == "医院护工" || obj == "老人陪护") {
        objs.serviceStyle = this.backgroundObj.blue
      }
    }
    return value;
  },
  backgroundObj: {
    red: {
      backgroundImage: "url(" + require("@/assets/img/red.png") + ")",
    },
    green: {
      backgroundImage: "url(" + require("@/assets/img/green.png") + ")",
    },
    blue: {
      backgroundImage: "url(" + require("@/assets/img/blue.png") + ")",
    },
  },
  formateTime(value){
    if (!value) return ''
    value=/\d{4}-\d{1,2}-\d{1,2}/g.exec(value).toString();
   /* var modifyTime = new Date(value),
      oYear = modifyTime.getFullYear(),
      oMonth = modifyTime.getMonth() + 1,
      oDay = modifyTime.getDate(),
      oMin = modifyTime.getMinutes();
    value = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);*/
    return value
  },
  getSalaryRange(){
    let _this=this;
    //				 薪资要求
    var value = "";
    $.ajax({
      url: window.global_config.getSalaryRange,
      type: "post",
      headers:{
        token:localStorage.getItem('token')
      },
      async: false,
      data: {},
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          var dataJD = data.jsonData;
          value = dataJD;
        } else {
          _this.checkAuth(data.code)
          console.log(data.msg);
        }
      },
    });
    return value;
  },
  getAgeRange(){
    let _this=this;
    //			    年龄要求
    var value = "";
    $.ajax({
      url: window.global_config.getAgeRange,
      type: "post",
      headers:{
        token:localStorage.getItem('token')
      },
      async: false,
      data: {},
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          var dataJD = data.jsonData;
          $.each(dataJD, function (i, item) {
            var name = "";
            if (item.name == "0,29") {
              item.value = "29岁以下";
            } else if (item.name == "29,39") {
              item.value = "29-39岁";
            } else if (item.name == "39,49") {
              item.value = "39-49岁";
            } else {
              item.value = "50岁以上";
            }
          })
          value = dataJD;
        } else {
          _this.checkAuth(data.code)
          console.log(data.msg);
        }
      },
    });
    return value;
  },
  getDirctoryData(url, params, method, headers){
    let _this = this;
    var value = ""
    $.ajax({
      url: url,
      type: method || "get",
      headers: headers || {token:localStorage.getItem('token')},
      data: params || "",
      async: false,
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          var dataJD = data.jsonData;
          value = dataJD;
        } else {
          _this.checkAuth(data.code)
          console.log(data.msg);
        }
      },
    });
    return value;
  },
  getSKillsData(params, skills){
    var url = window.global_config.getSKillsData;
    var value = this.getDirctoryData(url, params, "post")
    var key = [];
    if (skills != "") {
      for (var i in value) {
        var vk = value[i].skillsKey;
        for (var j in skills) {
          // key.push(skills[i].skillsKey)
          var sk = skills[j].skillsKey;
          if (vk == sk) {
            value[i].isChecked = true
          } else {
            value[i].isChecked = false
          }
        }
      }
    } else {
      for (var i in value) {
        value[i].isChecked = false;
      }
    }
    console.log(value);
    return value;
  },
// 服务类型
  getServiceNature(serviceItem,headers){
    var value=""
    let _this=this;
    $.ajax({
      url:window.global_config.getServiceMold,
      type:"post",
      data:{
        serverType:serviceItem
      },
      headers:headers||{token:localStorage.getItem('token')},
      dataType:"json",
      async:false,
      success:function success(data){
        if(data.success){
          var dataJD = data.jsonData;
          console.log(dataJD);
          value=dataJD;
          console.log(data.msg);
        }else{
          _this.checkAuth(data.code)
          console.log(data.msg);
        }
      },
    })
    return value;
  },
//  获取血型
  getBloodTypeData(){
    var url = window.global_config.getBloodType;
    var value = this.getDirctoryData(url)
    console.log(value);
    return value;
  },
  onError(msg, self) {
    if (self.parent().nextAll().hasClass('validation')) {
      self.parent().nextAll('.validation').text(msg);
      return;
    }
    self.parent().after("<p class='validation' style=' color: red; font-size: .2rem;padding-left:1.7rem;line-height: .4rem'>" + msg + "</p>")
  },
  onSuccess(self) {
    self.parent().nextAll('.validation').remove();
  },
  forEachPullDown(headers){
    for (let i = 0; i < lurl.length; i++) {
      this.pullDown(lurl[i], name[i],headers);
    }
  },
  //下拉选择框
  pullDown(lurl, name,headers){
    let _this = this;
    var publicPath = "";
    var local = window.location.host;

    if(local.indexOf("cs-m.jiacer.com")!=-1||local.indexOf("localhost")!=-1){
      publicPath = "http://cs-m.jiacer.com/fbeeConsole_web";
    }else if(local.indexOf("ysc-m.jiacer.com")!=-1){
      publicPath = "http://ysc-m.jiacer.com/fbeeConsole_web";
    }else if(local.indexOf("m.jiacer.com")!=-1){
      publicPath = "http://m.jiacer.com/fbeeConsole_web";
    }else {
      publicPath = "http://cs-m.jiacer.com/fbeeConsole_web";
    }
    if ($("select[name='" + name + "']").length < 1)return;
    $.ajax({
      url: publicPath+"/api/common/getDictionaryData/" + lurl,
      type: "post",
      data: {},
      async: false,
      headers:headers||{},
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          if (data.code == 0) {
            var dataJD = data.jsonData;
            var html = "";
            console.log(dataJD)
            $.each(dataJD, function (i, item) {
              if (lurl == "c007") {
                var name = "";
                if (item.name == "0,1") {
                  name = "一年以下";
                } else if (item.name == "1,2") {
                  name = "1-2年";
                } else if (item.name == "3,5") {
                  name = "3-5年";
                } else if (item.name == "5,") {
                  name = "5年以上";
                }
                html += "<option value='" + item.code + "'>" + name + "</option>";
              } else if (lurl == "c008") {
                var name = "";
                if (item.name == "0,29") {
                  name = "29岁以下";
                } else if (item.name == "29,39") {
                  name = "29-39岁";
                } else if (item.name == "39,49") {
                  name = "39-49岁";
                } else if (item.name == "50,") {
                  name = "50岁以上";
                }
                html += "<option value='" + item.code + "'>" + name + "</option>";
              } else {
                html += "<option value='" + item.code + "'>" + item.name + "</option>";
              }
            });
            $("select[name='" + name + "']").html("<option value=''>请选择</option>" + html);
            console.log(data.msg);
          } else {
            console.log(data.msg);
          }
        } else {
          _this.checkAuth(data.code)
          console.log(data.msg);
        }
      }
    });
  },
//  获取省份
  getAreaData(){
    var url = window.global_config.getAreaData;
    var value = this.getDirctoryData(url)
    return value;
  },
  //尘世
  getCityData(pcode){
    var url = window.global_config.getCityData;
    var value = this.getDirctoryData(url,pcode)
    return value;
  },
  //区
  getDistrictData(pcode){
    var url = window.global_config.getDistrictData;
    var value = this.getDirctoryData(url,pcode)
    return value;
  },
  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
//  获取学历
  getEudcationData(){
    var url = window.global_config.getEudcationData;
    var value = this.getDirctoryData(url)
    return value;
  },
  //获得籍贯
  getNativePlace(){
    var url = window.global_config.getNativePlace;
    var value = this.getDirctoryData(url)
    return value;
  },
  //获得属相
  getZodic(){
    var url = window.global_config.getZodic;
    var value = this.getDirctoryData(url)
    return value;
  },
//  获得价格单位
  getPriceRange(){
    var url = window.global_config.getPriceRange;
    var value = this.getDirctoryData(url)
    return value;
  },
  //获得薪资
  getServiceIncome(){
    var url = window.global_config.getServiceIncome;
    var value = this.getDirctoryData(url)
    return value;
  },
  getExperience(){
    var url = window.global_config.getExperience;
    var value = this.getDirctoryData(url)
    $.each(value, function (i, item) {
        var name = "";
        if (item.name == "0,1") {
          item.name = "一年以下";
        } else if (item.name == "1,2") {
          item.name = "1-2年";
        } else if (item.name == "3,5") {
          item.name = "3-5年";
        } else if (item.name == "5,") {
          item.name = "5年以上";
        }
    });
    return value;
  },
  clearValue(){
    $(".wrapper .service-on").removeClass("service-on");
    $(".wrapper .area-on").removeClass("area-on");
    $(".wrapper .sortCondition img").hide();
    $(".wrapper .sortCondition .city").hide();
    // $("#salaryType li:eq(0)").addClass('active').siblings().removeClass('active')
  },
//  重新授权
  checkAuth(code){
    if(code===20002){
      localStorage.clear();
      this.auth();
    }else if(code===20004||code===999010){
      var href=window.location.href;
      if(href.indexOf("login")==-1){
        localStorage.setItem("uid","");
        router.push({ path: '/login'})
      }
    }
  },
  auth(){
    let _this=this;
    $.ajax({
      url: window.global_config.auth,
      type: "get",
      async: false,
      data: {},
      dataType: "json",
      success: function success(data) {
        if (data.success) {
           console.log(data)
          var redirect=data.jsonData;
          window.location.href=redirect;
        }
      },
    });
  },
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  shareWechat() {
  var publicSharePath=location.href.split("#")[0];
  var imgUrl="http://m.jiacer.com";
  var link="http://m.jiacer.com/#/landPage";//window.location.href.split('#')[0];
  $.ajax({
    url: window.global_config.share,
    type: "get",
    data: {
      urlpath:publicSharePath
    },
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        var dataJD = data.jsonData;
        console.log(dataJD)
        console.log(data.msg);
        wx.config({
          debug: false,
          appId: data.jsonData.appId,
          timestamp: data.jsonData.timestamp,
          nonceStr: data.jsonData.nonceStr,
          signature: data.jsonData.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function () {
          // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
            title: "超好用的家政公司管理工具~", // 分享标题
            link:link,
            imgUrl: imgUrl+'/static/img/jiacerlogo.png', // 分享图标
          });
          wx.onMenuShareAppMessage({
            title: "超好用的家政公司管理工具~", // 分享标题
            desc: "家策门店助手，家政公司的好帮手！",
            link: link,
            imgUrl: imgUrl+'/static/img/jiacerlogo.png', // 分享图标
          });
          wx.error(function (res) {
            console.log('wx.error: '+JSON.stringify(res));
          });
        });
      } else {
        console.log(data.msg);
      }
    }
  });
}
}
function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
};


var lurl = ["c016", "c020", "c021", "c022", "c023", "c004", "c026", "c012", "c017", "c019", "c018", "c025", "c024", "c007", "c008", "c009", "c010", "c028", "c033", "c034"];
var name = ["sex", "houseType", "childrenAgeRange", "olderAgeRange", "selfCares", "serviceItemCode", "serviceNature", "education", "bloodType", "fertilitySituation", "maritalStatus", "manageWay", "inOutType", "experience", "age", "zodiac", "nativePlace", "certType", "authenticateGrade", "certificationBody"];


