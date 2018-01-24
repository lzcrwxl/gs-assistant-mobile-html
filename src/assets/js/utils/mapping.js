// var publicPath = "http://" + window.location.host + "/fbeeConsole_web";
var publicPath = "";
var  publicPathSP = "";
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

window.publicPath=publicPath;


if(local.indexOf("cs-m.jiacer.com")!=-1||local.indexOf("ysc-m.jiacer.com")!=-1||local.indexOf("localhost")!=-1){
  publicPathSP = "http://test.jiacersxy.com:8000";
}else if(local.indexOf("m.jiacer.com")!=-1){
  publicPathSP = "http://common.jiacedu.com";
}
window.global_config = {
  // ordersList: publicPath + "/api/orders/ordersList",
  ordersList:publicPath+"/api/orders/ordersList",
  getReserveOrdersList:publicPath+"/api/orders/getReserveOrdersList",
  getCaptcha: publicPath+"/api/user/getCaptcha",
  login:publicPath+"/api/user/login",
  queryStaff:publicPath+"/api/staffs/queryStaff",
  jobsList:publicPath+"/api/job",
  releaseJob:publicPath+"/api/job/info",
  getServiceType:publicPath+"/api/website/getServiceType",
  resume:publicPath+"/api/job/resume/mine/box",
  resumeDetail:publicPath+"/api/job/resume",
  staffInfo:publicPath+"/api/staffs/getDetails/part/base",
  mediaInfo:publicPath+"/api/staffs/getDetails/part/media",
  apply:publicPath+"/api/job/resume/mine/apply",
  getStaffList:publicPath+"/api/orders/getStaffList",
  getReserve:publicPath+"/api/orders/getReserve",
  getReserveMember:publicPath+"/api/orders/getReserveMember",
  getReserveService:publicPath+"/api/orders/getReserveService",
  getReserveStaff:publicPath+"/api/orders/getReserveStaff",
  getReserveStaffList:publicPath+"/api/orders/getReserveStaffList",
  updateStaff:publicPath+"/api/orders/updateStaff",
  updateReserve:publicPath+"/api/orders/updateReserve",
  orderInfo:publicPath+"/api/orders/orderInfo",
  orderMemberInfo:publicPath+"/api/orders/orderMemberInfo",
  orderServiceInfo:publicPath+"/api/orders/orderServiceInfo",
  orderStaffInfo:publicPath+"/api/orders/orderStaffInfo",
  orderPayInfo:publicPath+"/api/orders/orderPayInfo",
  getSKillsData:publicPath+"/api/common/getSKillsData/c005",
  getServicesType:publicPath+"/api/common/getDictionaryData/c004",
  getAgeRange:publicPath+"/api/common/getDictionaryData/c008",
  getZodic:publicPath+"/api/common/getDictionaryData/c009",
  getBloodType:publicPath+"/api/common/getDictionaryData/c017",
  getEudcationData:publicPath+"/api/common/getDictionaryData/c012",
  getNativePlace:publicPath+"/api/common/getDictionaryData/c010",
  getPriceRange:publicPath+"/api/common/getDictionaryData/c035",
  getExperience:publicPath+"/api/common/getDictionaryData/c007",
  passInterview:publicPath+"/api/orders/passInterview",
  getSalaryRange:publicPath+"/api/website/getSalaryRange",
  createOrder:publicPath+"/api/orders/createOrder",
  share:publicPath+"/api/WechatInfo/share/sign",
  //省份
  getAreaData:publicPath+"/api/common/getAreaData/c001",
  //市
  getCityData:publicPath+"/api/common/getAreaData/c002",
  //区
  getDistrictData:publicPath+"/api/common/getAreaData/c003",
  deleteMediaPath:publicPath+"/api/staffs/deleteMediaPath",
  uploadMediaPath:publicPath+"/api/staffs/uploadMediaPath",
  addBaseInfo:publicPath+"/api/staffs/add/baseInfo",
  addJobInfo:publicPath+"/api/staffs/add/jobInfo",
  getTenatsUserListSel:publicPath+"/api/user/getTenatsUserListSel",
  getServiceIncome:publicPath+"/api/common/getServiceIncome",
  getCreateStaffList:publicPath+"/api/orders/getCreateStaffList",
  saveServiceToReserve:publicPath+"/api/orders/saveServiceToReserve",
  saveMemberToReserve:publicPath+"/api/orders/saveMemberToReserve",
  saveReserve:publicPath+"/api/orders/saveReserve",
  remark:publicPath+"/api/orders/remark/modify",
  changeStaff:publicPath+"/api/orders/changeStaff",
  //保存服务信息
  saveServiceInfo:publicPath+"/api/orders/saveServiceInfo",
  saveOrder:publicPath+"/api/orders/saveOrder",
  saveCustomerInfo:publicPath+"/api/orders/saveCustomerInfo",
  depositPayment:publicPath+"/api/orders/depositPayment",
  now:publicPath+"/api/common/now",
  refresh:publicPath+"/api/job/refresh",
  info:publicPath+"/api/index/info",
  recharge:publicPath+"/api/payment/recharge",
  auth:publicPath+"/api/WechatInfo/auth/url",
  sendSms:publicPath+"/api/user/sendSms",
  getServiceMold:publicPath+"/api/website/getServiceMold",
  mainPageData:publicPath+"/api/user/mainPageData",
  savePush:publicPath+"/api/subscribe/setting",
  subscribe:publicPath+"/api/subscribe",



  //上传图片视频
  uploadImg:publicPathSP+"/image/upload",
  // uploadImg:publicPathSP+"http://test.jiacersxy.com:8000/image/upload",
  uploadVideo:publicPathSP+"/video/upload"
}
