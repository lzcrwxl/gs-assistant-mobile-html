// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import cm from './assets/js/utils/common'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import store from './store/store'
import './assets/js/utils/mapping'
//通用方法

import wx from 'weixin-js-sdk';
//混合
import  {ToastPlugin} from 'vux'
import {AjaxPlugin} from 'vux'
import {DatetimePlugin} from 'vux'
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)

// import { WechatPlugin} from 'vux'
// Vue.use(WechatPlugin); //  微信
// const wx = Vue.wechat;

Vue.config.productionTip = false

// Vue.prototype.$http = axios;
Vue.prototype.$cm = cm;

require('es6-promise').polyfill();

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;



// http request 拦截器
axios.interceptors.request.use(function (config) {
  config.headers.token = localStorage.getItem("token")//将接口返回的token信息配置到接口请求中
  return config;
}, function (error) {
  return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use(function(response){
  if(response.data.code=='20002'){//具体的判断token失效的参数
    localStorage.clear();
    cm.auth();
  }else if(response.data.code=='20004'){
    window.location.href="/login"
  }  else{
    return response
  }
}, function (error) {
  return Promise.reject(error);
});
// For request

//引入图表
// Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */


//路由守卫

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
// const FastClick = require('fastclick')
// FastClick.attach(document.body)




router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  var token01=localStorage.getItem('token')
  var uid=localStorage.getItem('uid');
  var token="";
  if(token01!="null"&&token01){
    token=token01;
  }else {
    token = cm.getUrlParam("token");
  }
  if (!token) {
    // next();
    cm.auth();
  }else {
    // shareWechat();
    next();
  }
  window.scrollTo(0,0);
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})



//分割逗号
Vue.filter('getValue', function (value) {
  if (!value) return '';
  if (value.indexOf(",") != -1) {
    value = value.split(",")[1]
  }
  return value;
})
//过滤
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

//订单状态
Vue.filter('toText', function (value) {
  if (value == "01") {
    value = "待定金";
  } else if (value == "02") {
    value = "待面试";
  } else if (value == "03") {
    value = "待尾款";
  } else if (value == "04") {
    value = "已完成";
  } else if (value == "05") {
    value = "已取消";
  } else if (value == "06") {
    value = "待退款";
  } else if (value == "08") {
    value = "待更换阿姨";
  }
  return value;
})


Vue.filter('status', function (value) {
  if (!value) return ''
  if (value == "1") {
    value = "待处理";
  } else if (value == "2") {
    value = "待面试";
  } else if (value == "3") {
    value = "已拒绝";
  } else if (value == "4") {
    value = "已完成";
  } else if (value == "5") {
    value = "已取消";
  }
  return value;
})


//转成电话
Vue.filter('toTel', function (value) {
  if (!value) return '';
  value = "tel:" + value;
  return value;
})
//日期
Vue.filter('formateTime', function (value) {
  if (!value) return ''
  // value=value.Format('yyyy-MM-dd');
  value=/\d{4}-\d{1,2}-\d{1,2}/g.exec(value).toString()
  /*var modifyTime = new Date(value),
   oYear = modifyTime.getFullYear(),
   oMonth = modifyTime.getMonth() + 1,
   oDay = modifyTime.getDate(),
   oMin = modifyTime.getMinutes();
   value = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);*!/*/
  return value
})

Vue.filter('formateTimeBefore', function (value) {
  if (!value) return ''
  // alert(value);
  // var arr = value.split(/[- : \/]/);
  // alert(arr)
  // var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  var modifyTime = new Date(value),
    oYear = modifyTime.getFullYear(),
    oMonth = modifyTime.getMonth() + 1,
    oDay = modifyTime.getDate(),
    oMin = modifyTime.getMinutes();
  var now = new Date();
  var time = now - modifyTime;
  var minutes = parseInt(time / 1000 / 60);//计算剩余的分钟
  if (minutes < 1) {
    value = "刚刚"
  } else if (minutes < 60 && minutes >= 1) {
    value = minutes + "分钟以前"
  } else {
    value=/\d{4}-\d{1,2}-\d{1,2}/g.exec(value).toString()
    // value = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);
  }
  return value
})
Vue.filter('age', function (value) {
  if (isEmpty(value)) {
    value = "不限"
  }
  return value
})
//金额千位分隔
Vue.filter('money', function (num) {
  num = parseFloat(num).toFixed(2);
  var source = String(num).split(".");
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
  return source.join(".");
})

function newDate(strdate) {
  var arr = strdate.split(/[- : \/]/);
  var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  return date;
}






function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
};
function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null) {
    return false;
  } else {
    return true;
  }
}

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
