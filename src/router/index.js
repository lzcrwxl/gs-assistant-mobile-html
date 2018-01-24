import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home/homeView'
// import Aunt from '@/components/Aunt/auntView'


//职位路由
// import Job from '@/components/Job/jobView'
import JobRelease from '@/components/Job/jobRelease'

//订单路由
// import Order from '@/components/Order/orderView'
import CreateOrder from '@/components/Order/createOrder'
import ModifyOrder from '@/components/Order/modifyOrder'
import paymentOrder from '@/components/Order/paymentOrder'
import Deposit from '@/components/Order/deposit'
//订单状态
import OrderRelease from '@/components/Order/lists/orderRelease'
import OrderDetail from '@/components/Order/lists/orderDetails'
import OrderInProcess from '@/components/Order/lists/orderInProcess'

import Payment from '@/components/Order/lists/payment/paymentDetail'

//阿姨路由
import AuntDetail from '@/components/Aunt/lists/auntDetail'
import AuntOrderDetail from '@/components/Aunt/lists/auntDetailOrder'
import ModifyAunt from '@/components/Aunt/lists/modifyAunt'
import ReplaceAunt from '@/components/Aunt/replaceAunt'
import MatchAunt from '@/components/Aunt/matchAunt'
import CreateAunt from '@/components/Aunt/createAunt'
import ReserveAunt from '@/components/Aunt/reserveMatchAunt'

//抢单路由
// import GrapOrder from '@/components/Grap/grapView'
import GrapDetail from '@/components/Grap/grapDetails'
import push from '@/components/Grap/push'

//首页&登录
import Login from '@/components/Login/login'
import LandingPage from '@/components/Login/LandingPage'

//简历箱路由
// import Resume from '@/components/Resume/resumeView'
// import ResumePending from '@/components/Resume/status/resumePending'
// import Interview from '@/components/Resume/status/interview'
// import IntvCancelled from '@/components/Resume/status/intvCancelled'
// import IntvCompleted from '@/components/Resume/status/intvCompleted'
// import IntvRefused from '@/components/Resume/status/intvRefused'
import ResumeAuntDetail from '@/components/Resume/resumeAuntDetail'
import ResumeDetails from '@/components/Resume/resumeDetails'

Vue.use(Router)




export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '*',
      redirect: '/home',
    },
    {
      path: '/home',
      // component: Home,
      component: function (resolve) {
        require(['@/components/Home/homeView'], resolve)
      },
      meta: {navShow: true, footShow: true, cname: '', isBack: false},
    },
    {
      path: '/login',
      component: Login,
      // name:"login"
    },
    {
      path: '/landPage',
      component: LandingPage,
      name: 'landPage'
    },
    {
      props: ['orderId'],
      path: '/order/:orderId',
      // component: Order,
      component: function (resolve) {
        require(['@/components/Order/orderView'], resolve)
      },
      name: "order",
      props: true,
      // meta: { navShow: true, cname: '一级页面' },
      meta: {navShow: true, footShow: true, cname: '', isBack: false, showOrders: true},
      children: [
        {
          path: '/order/detail/:orderNo/:source',
          component: OrderDetail,
          name: 'detail',
          meta: {navShow: true, footShow: false, cname: '订单详情', modifyShow: true, routeBack: true},
        },
        {
          path: '/order/modifyOrder/:orderNo/:status',
          component: ModifyOrder,
          name: "modifyOrder",
          meta: {navShow: true, footShow: false, cname: '修改订单', btnBack: true},
        },
        {
          path: '/order/paymentOrder/:orderNo',
          component: paymentOrder,
          name: "paymentOrder",
          meta: {navShow: true, footShow: false, cname: '生成支付订单', isBack: true},
        },
        {
          path: '/order/createOrder',
          name: "createOrder",
          component: CreateOrder,
          meta: {navShow: true, cname: '新增订单', btnBack: true},
        },
        {
          path: '/order/inprocess/:orderNo/:source/:orderStatus',
          component: OrderInProcess,
          name: "process",
          meta: {navShow: true, cname: '订单详情', modifyShow: true, routeBack: true},
          children: [
            {
              path: '/order/inprocess/release/:orderNo',
              component: OrderRelease,
              name: "release",
              meta: {navShow: false, cname: '职位发布', btnBack: true},
            },
          ]
        },
        {
          path: '/order/payment/:orderNo',
          component: Payment,
          name: "payment",
          meta: {navShow: false, cname: '支付详情',isBack:true},
        },
      ]
    },
    {
      path: '/aunt',
      // component: Aunt,
      component: function (resolve) {
        require(['@/components/Aunt/auntView'], resolve)
      },
      name:"aunt",
      meta: {showAunts: true},
      children: [
        {
          path: 'detailInfo/:staffId',
          component: AuntDetail,
          name: "detailInfo",
          /*beforeEnter: (to, from, next) => {
            console.log(from)
            var meta=to.meta;
            if(from.name=="process"||from.name=="detail"){
              meta.modfyAunt=false;
            }else {
              meta.modfyAunt=true;
            }
            console.log(to.meta)
            next()
          },*/
          meta: {navShow: true, footShow: false, cname: '家政员详情', modfyAunt: true, isBack: true},
        },
        {
          path: 'detailOrderInfo/:staffId',
          component: AuntOrderDetail,
          name: "detailOrderInfo",
          meta: {navShow: true, footShow: false, cname: '家政员详情', modfyAunt: false, isBack: true},
        },
        {
          path: 'modifyAunt/:staffId',
          component: ModifyAunt,
          name:'modifyAunt',
          meta: {navShow: true, footShow: false, cname: '编辑家政员信息', btnBack: true},
        },
      ]
    },
    {
      path: '/replaceAunt/:orderNo',
      component: ReplaceAunt,
      name: 'replaceAunt',
      meta: {navShow: true, footShow: false, cname: ''},
    },
    {
      path: '/matchAunt/:orderNo/:jobId',
      component: MatchAunt,
      name: 'matchAunt',
      meta: {navShow: true, footShow: false, cname: '选择配单家政员',isBack:true},
    },
    {
      path: '/reserveAunt/:orderNo',
      component: ReserveAunt,
      name: 'reserveAunt',
      meta: {navShow: true, footShow: false, cname: '选择配单家政员',isBack:true},
    },
    {
      path: '/createAunt/:code',
      component: CreateAunt,
      name: 'createAunt',
      meta: {navShow: true, footShow: false, cname: '选择配单家政员',},
    },
    {
      path: '/job',
      // component: Job,
      component: function (resolve) {
        require(['@/components/Job/jobView'], resolve)
      },
      name: "job",
      meta: {navShow: true, footShow: true, cname: '', isJobLists: true},
      children: [
        {
          path: 'jobRelease/:jobId',
          component: JobRelease,
          meta: {navShow: true, footShow: false, cname: '职位详情', isBack: true, isJobLists: false, isProgess: false},
          name: "jobRelease"
        },
      ]
    },
    {
      path: '/grap',
      // component: GrapOrder,
      component: function (resolve) {
        require(['@/components/Grap/grapView'], resolve)
      },
      meta: {navShow: true, footShow: true, cname: '合作抢单', grapTitle: true,isRemind:true},
      name: 'grap',
      children: [
        {
          path: 'grapdetail/:jobId/:status',
          component: GrapDetail,
          name: "grapdetail",
          meta: {navShow: true, footShow: false, cname: '订单详情', grapTitle: false,grapBack:true},
        },
      ]
    },
    {
      path: '/push',
      component: push,
      meta: {cname: '提醒设置',pushBack:true},
      name: 'push',
    },
    {
      path: '/resume',
      // component: Resume,
      component: function (resolve) {
        require(['@/components/Resume/resumeView'], resolve)
      },
      name: 'resume',
      meta: {footShow: false, cname: '简历箱', isBackHome: true, isResumeLists: true},
      children: [
        {
          path: 'auntResume/:staffId',
          component: ResumeAuntDetail,
          name: "auntResume",
          meta: {footShow: false, cname: '家政员简历', resumeDetailBack: true},
        },
       /* {
          path: 'pending/:resumeId/:staffId',
          component: ResumePending,
          name: "pending",
          meta: {footShow: false, cname: '简历详情', resumeBack: true, isProgess: true},
        },*/
        {
          path: 'rmDetails/:resumeId/:staffId',
          component: ResumeDetails,
          name: "rmDetails",
          meta: {footShow: false, cname: '简历详情', resumeBack: true, isProgess: true},
        },
/*        {
          path: 'interview/:resumeId/:staffId',
          component: Interview,
          name: "interview",
          meta: {footShow: false, cname: '简历详情', resumeBack: true},
        },
        {
          path: 'cancelled/:resumeId/:staffId',
          component: IntvCancelled,
          name: "intCancelled",
          meta: {footShow: false, cname: '简历详情', resumeBack: true},
        },
        {
          path: 'completed/:resumeId/:staffId',
          component: IntvCompleted,
          name: "intCompleted",
          meta: {footShow: false, cname: '简历详情', resumeBack: true},
        },
        {
          path: 'refused/:resumeId/:staffId',
          component: IntvRefused,
          name: "refused",
          meta: {footShow: false, cname: '简历详情', resumeBack: true},
        },*/
      ]
    },
    {
      path: '/deposit',
      component: Deposit,
      name:"deposit",
      meta: {footShow: false, cname: '账户充值', depositBack: true},
    },
  ],
})


