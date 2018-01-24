<template>
  <div>
    <HeadView></HeadView>
    <div class="pushCtn">
      <h1 class="bar">根据自身需求设置工作机会提醒</h1>
      <h2 class="bar">微信公众号提醒
        <label class="r">
          <input type="checkbox" class="mui-switch mui-switch-animbg" name="switch" v-model="isOn" @click="switchBtn">
        </label>
      </h2>
      <div class="serviceFrame" v-show="isOn">
        <h2>关注工种</h2>
        <ul class="pushService">
          <li class="skillBox" v-for="(item,index) in serviceTypes" :data-code="item.code">{{item.name}}
            <input type="checkbox" class="skillInput" :value="item.code" name="salarySkills" @change="selectSkill">
          </li>
        </ul>
      </div>
      <div class="serviceFrame ovh" v-show="isOn">
        <h2>服务区域<span class="tip ml20">可最多指定3个区域</span>
        </h2>
        <div>
          <div class="selWrapper">
            <label class="selBar">全部区域
              <input type="radio" class="rdoDot" value="1" id="rdo1" name="selAddr"
                     @click="selAll">
            </label>
          </div>
          <div class="selWrapper" id="selAreaBar">
            <label class="selBar">
              指定区域
              <input type="radio" class="rdoDot" id="rdo0" value="0" name="selAddr" @click="selAdd">
            </label>
            <div class="rel" v-if="isPicked">
              <ul class="showAddr">
                <li class="rd1" v-for="(item,index) in addrArray" :data-pcode="item.province" :data-ccode="item.city" v-if="item.province!='0'">
                  {{item.provinceValue}}-{{item.cityValue||'不限'}}<em class="del" @click="delAddr(index)"></em></li>
                <!--<li class="rd1">上海-全城<em class="del"></em></li>-->
                <!--<li class="rd1">上海-全城<em class="del"></em></li>-->
              </ul>
              <button class="btnAdd" @click="addAddr" v-show="addrArray&&addrArray.length<3">添加区域</button>
            </div>
          </div>
        </div>
      </div>
      <div class="btnctrl">
        <router-link to="/grap" class="btn-white btn-bottom">取消</router-link>
        <button class="btn-fill btn-bottom" @click="savePush" :disabled="noClickAble" :class="{'noClick':noClickAble}">
          保存
        </button>
      </div>
    </div>
    <LayerTemplate :isPushAddress.sync="isPushAddress" @confirmAddr="getAddr"></LayerTemplate>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .skillBox {
    position: relative;
  }

  .skillInput {
    position: absolute;
    -moz-opacity: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    cursor: pointer;
    right: 0;
    bottom: 0;
  }

  @import "../../assets/css/common";
  .mui-switch.mui-switch-animbg:checked {
    box-shadow: #dfdfdf 0 0 0 0 inset;
    background-color: #0a7ee3;
    transition: border-color 0.4s, background-color ease 0.4s;
  }

  .mui-switch.mui-switch-animbg {
    transition: background-color ease 0.4s;
  }

  .mui-switch:checked {
    border-color: #0a7ee3;
    box-shadow: #0a7ee3 0 0 0 .16rem inset;
    background-color: #0a7ee3;
  }

  .mui-switch.mui-switch-animbg:checked:before {
    transition: left 0.3s;
  }

  .mui-switch.mui-switch-animbg:before {
    transition: left 0.3s;
  }

  .mui-switch:checked:before {
    left: .26rem;
  }

  .mui-switch:before {
    content: '';
    width: .35rem;
    height: .35rem;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius: .35rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .mui-switch {
    width: .64rem;
    height: .39rem;
    position: relative;
    border: 1px solid #dfdfdf;
    background-color: #fdfdfd;
    box-shadow: #dfdfdf 0 0 0 0 inset;
    border-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-clip: content-box;
    display: inline-block;
    -webkit-appearance: none;
    user-select: none;
    outline: none;
  }

  .pushService {
    padding-bottom: .1rem;
  }

  .btnctrl {
    margin-top: 1.22rem;
    margin-bottom: .3rem;
    text-align: center;
    .btn-fill {
      margin-left: .3rem;
    }
  }

  .skillBox {
    width: 1.52rem;
    height: .54rem;
    margin-bottom: .2rem;
    &:not(:nth-child(4)) {
      margin-right: .24rem;
    }
  }

  .bar {
    height: .88rem;
    line-height: .88rem;
    padding: 0 .3rem;
  }

  .selWrapper {
    border-radius: .08rem;
    background: #fafafa;
    position: relative;
    border: 1px solid #e5e5e5;
    margin-bottom: .24rem;
    padding: 0 .2rem;

    ul {
      min-height: .9rem;
      /*line-height: .9rem;*/
      border-top: 1px solid #e5e5e5;
      li {
        height: .9rem;
        line-height: .9rem;
        &:not(:last-child) {
          margin-right: .4rem;
        }
        font-size: .26rem;
        color: #333;
        display: inline-block;
        .del {
          margin-top: .21rem;
          padding: .1rem;
          /*vertical-align: middle;*/
          display: inline-block;
          width: .26rem;
          height: .26rem;
          background: url("../../assets/img/icons/delIco.png") no-repeat center;
          background-size: .26rem;
        }
      }
    }
  }

  .btnAdd {
    right: 0;
    top: .2rem;
    font-size: .26rem;
    position: absolute;
    width: 1.54rem;
    height: .54rem;
    text-align: center;
    border-radius: .08rem;
    line-height: .54rem;
    border: 1px solid #0080ff;
    color: #0080ff;
  }

  .selBar {
    display: block;
    font-size: .26rem;
    color: #888;
    height: .88rem;
    line-height: .88rem;
    input {
      /*position: absolute;*/
      float: right;
      margin-top: .25rem;
    }
  }

  #selAreaBar {
    margin-bottom: .3rem;

  }

  .pushCtn {
    h1 {
      font-size: .26rem;
      color: #888;
    }
    h2 {
      font-size: .3rem;
      background: #ffffff;
      .tip {
        font-size: .24rem;
        color: #d6d6d6;
      }
    }
    .serviceFrame {
      background: #ffffff;
      margin: .24rem 0;
      padding: 0 .3rem;
      h2 {
        height: .88rem;
        line-height: .88rem;
      }
    }
  }
</style>
<script>
  import HeadView from "@/components/Header/headView"
  import LayerTemplate from 'components/template/layerTemplate'
  export default{
    data(){
      return {
        isPushAddress: false,
        addrObj: {},
        addrArray: [],
        serviceTypes: [],
        subscribe: "",
        pushData: "",
        isOn: false,
        isPicked: false,
        noClickAble: false,
        params:{
          token:localStorage.getItem('token'),
        }
      }
    },
    components: {
      HeadView,
      LayerTemplate
    },
    created(){
      this.$cm.shareWechat();
      this.getServicesType();
    },
    mounted(){
      this.getPushSetting();
    },
    methods: {
      selAll(){
        this.addrArray=[
          {
            province:0,
            city:0,
          }
        ];
        this.isPicked=false
      },
      selAdd(){
        this.addrArray=[];
        this.isPicked=true
      },
      addAddr(){
        this.isPushAddress = true;
      },
      getAddr(addrObj){
        console.log(addrObj)
        if (addrObj.ctext.indexOf("全部") != -1) {
          addrObj.ctext = "不限";
        }
        var tempObj = {
          province: addrObj.pcode,
          provinceValue: addrObj.ptext,
          city: addrObj.ccode,
          cityValue: addrObj.ctext,
        }
        if (this.addrArray.length <= 3) {
          this.addrArray.push(tempObj);
        }
        console.log(this.addrArray)
      },
      //      服务工种
      getServicesType(){
        let _this = this;
        $.ajax({
          url: window.global_config.getServicesType,
          type: "post",
          headers: _this.params,
          data: {},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var dataJD = data.jsonData;
              _this.serviceTypes = dataJD;
            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      查询推送
      getPushSetting(){
        let _this = this;
        $.ajax({
          url: window.global_config.subscribe,
          type: "get",
          headers: _this.params,
          data: {},
          dataType: "json",
          async: false,
          success: function success(data) {
            if (data.success) {
              console.log(data)
              var dataJD = data.jsonData;
              _this.pushData = dataJD;
              if (dataJD.isOn == "1") {
                _this.isOn = true;
              } else if (dataJD.isOn == '0') {
                _this.isOn = false;
              }
              var salarySkillskey = "";
              if (!_this.$cm.isEmpty(dataJD.services)) {
                for (var i = 0; i < dataJD.services.length; i++) {
                  salarySkillskey += dataJD.services[i];
                }
                $("input[name='salarySkills']").each(function (i, v) {
                  var value = $(v).val();
                  console.log(value)
                  if (salarySkillskey.indexOf(value) != -1) {
                    $(v).prop("checked", true);
                    $(v).parent('.skillBox').addClass('pillActive')
                  }
                })
              }
              if (!_this.$cm.isEmpty(dataJD.addressInfos)&&dataJD.addressInfos[0].province!="0") {
                _this.isPicked = true;
                $("#rdo0").prop("checked", true)
                _this.addrArray = dataJD.addressInfos;
                console.log(_this.addrArray)
              } else {
                _this.addrArray = [
                  {
                    province:0,
                    city:0,
                  }
                ];
                _this.isPicked = false;
                $("#rdo1").prop("checked", true)
              }

            } else {
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      删除区域
      delAddr(index){
        this.addrArray.splice(index, 1)
        console.log(index)
      },
      selectSkill(e){
        var self = $(e.target);
        if (self.is(':checked')) {
          self.parent('.skillBox').addClass('pillActive')
        } else {
          self.parent('.skillBox').removeClass('pillActive')
        }
      },
      savePush(){
        let _this = this;
        console.log(_this.addrArray);
        if (_this.isPicked && _this.addrArray.length ==0) {
          _this.$vux.toast.text("请选择区域")
          return;
        }
        _this.noClickAble = true;
        var isOn = ""
        if (_this.isOn) {
          isOn = "1"
        } else {
          isOn = "0"
        }
        var services = [];
        $("input[name='salarySkills']:checked").each(function (i, v) {
          services.push($(v).val());
        })
        console.log(services)
        var addressInfos = [];

        var addr = _this.addrArray;
        for (var i in addr) {
          var obj = {}
          console.log(addr[i]);
          obj.province = addr[i].province;
          obj.city = addr[i].city;
          console.log(obj);
          addressInfos.push(obj)
        }
        $.ajax({
          url: window.global_config.savePush,
          type: "post",
          headers: _this.params,
          dataType: "json",
          data: JSON.stringify({
            isOn: isOn,
            services: services,
            addressInfos: addressInfos
          }),
          contentType: "application/json;charset=UTF-8",
          async: false,
          success: function success(data) {
            if (data.success) {
              var dataJD = data.jsonData;
              console.log(dataJD)
              _this.$vux.toast.show({
                text: '保存成功',
                onHide () {
                  _this.noClickAble = false;
                  _this.$router.push({name: 'grap'});
                }
              })
            } else {
              _this.noClickAble = false;
              _this.$cm.checkAuth(data.code)
              console.log(data.msg);
            }
          }
        });
      },
//      开关
      switchBtn(){
        if (this.isOn) {
          $("input[name='salarySkills']").each(function (i, v) {
            var value = $(v).val();
            console.log(value)
            $(v).prop("checked", false);
            $(v).parent('.skillBox').removeClass('pillActive')
          })
          this.isPicked=false;
          this.addrArray=[
            {
              province:0,
              city:0,
            }
          ];
          $("#rdo1").prop("checked", true)
        }
      }
    }
  }
</script>
