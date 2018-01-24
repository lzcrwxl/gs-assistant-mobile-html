/**
 * Created by hasee on 2017/7/24.
 */
import * as types from './types'

export default {
  /*底部条*/
  hideFooter: ({commit}) => {
    commit(types.FOOTER_HIDE);
  },
  showFooter: ({commit}) => {
    commit(types.FOOTER_SHOW)
  },
  showHome: ({commit}) => {
    // console.log(payload)
    commit('showHome')
  },
  hideHeader: ({commit}, payload) => {
    if(payload!=undefined){
      commit('hideHeader', payload)
    }else {
      commit('hideHeader')
    }
  },
  showHeader:({commit})=>{
    commit('showHeader')
  },
  modifyCtn:({commit},payload)=>{
    commit('modifyCtn',payload)
    console.log(payload)
  },
  orderInfo:({commit},payload)=>{
    commit('orderInfo',payload)
  },
  memberInfo:({commit},payload)=>{
    commit('memberInfo',payload)
  },
  baseInfo:({commit},payload)=>{
    commit('baseInfo',payload)
  },
  jobInfo:({commit},payload)=>{
    commit('jobInfo',payload)
  },
}
