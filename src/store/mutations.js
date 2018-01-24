/**
 * Created by hasee on 2017/7/24.
 */
import {
  FOOTER_HIDE,
  FOOTER_SHOW
} from './types'

export default {
  /*footer*/
  [FOOTER_HIDE](state){
    state.footerShow = false;
  },
  [FOOTER_SHOW](state){
    state.footerShow = true;
  },
  showHome(state){
    state.isHome = true;
    state.isOrder = false;
    state.isJob = false;
    state.isAunt = false;
  },
  hideHeader(state, payload){
    if(payload!=undefined){
      state.headerTitle = payload.name;
      if (payload.link != "") {
        state.headerLink = payload.link;
      }
      state.headerText = payload.text || "修改信息";
    }
    state.headerShow = false
  },
  showHeader(state){
    state.headerShow = true
  },
  modifyCtn(state,payload){
    console.log(payload.priceShow);
    state.priceShow=payload.priceShow
  },
  orderInfo(state,payload){
    state.order=payload;
  },
  memberInfo(state,payload){
    state.member=payload;
  },
  baseInfo(state,payload){
    state.base=payload;
  },
  jobInfo(state,payload){
    state.job=payload;
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
}
