/*
function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null) {
    return false;
  } else {
    return true;
  }
};
*/

export function toText(value) {
  if (value=="01"){
    value="待支付定金";
  } else if (value=="02") {
    value="待面试";
  } else if (value=="03") {
    value="待支付尾款";
  } else if (value=="04") {
    value="已完成";
  } else if (value=="05") {
    value="已取消";
  } else if (value=="06") {
    value="待退款";
  } else if (value=="07") {
    value="已结单";
  } else if (value=="08") {
    value="待更换阿姨";
  } else if (value=="09") {
    value="待完成（淘分享）";
  }
  return value;
}
