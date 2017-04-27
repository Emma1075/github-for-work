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