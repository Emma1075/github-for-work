// 设置 线上地址
var onlineURL = 'http://static.cj.chinaedu.net/web-public-static/rsc/';

// 获取当前url的参数
function getParameters() {
  var url = location.search;
  // 取"?"后面的字符串
  var str = url.substr(1);
  var strToArr = str.split('&');
  var obj = {};
  // 将参数放在obj对象中
  strToArr.forEach(function(ele) {
    var tempArr = ele.split('=');
    obj[tempArr[0]] = tempArr[1];
  })
  return obj;
};

// 得到总的数据的请求参数（去掉itemSyystemIds => 每一列的id)
function WithoutitemSystemIds() {
  var params = getParameters();
  delete params.itemSystemIds;
  return params;
};

// 获取当前url的地址
function getSite() {
  var url = window.location.href;
  var strUrl = url.split('/res')[0] + '/res/xbase.mvc';
  return strUrl;
};

// 判断是否是 IE 浏览器
function myBrowser () {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  if (window.ActiveXObject) {
    Sys.ie = ua.match(/msie ([\d.]+)/)[1];
    //获取版本
    var ie_version = 6;
    if (Sys.ie.indexOf("7") > -1) {
        ie_version = 7;
    }
    if (Sys.ie.indexOf("8") > -1) {
        ie_version = 8;
    }
    if (Sys.ie.indexOf("9") > -1) {
        ie_version = 9;
    }
    if (Sys.ie.indexOf("10") > -1) {
        ie_version = 10;
    }
    if (Sys.ie.indexOf("11") > -1) {
        ie_version = 11;
    }
  };
  if (ie_version <= 8) {
    return true;
  } else {
    return false;
  }
}