// ie: arr.forEach
if (typeof Array.prototype.forEach != "function") {
  Array.prototype.forEach = function (fn, scope) {
    var i, len;
    for (i = 0, len = this.length; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  }
};

// ie: object.assign
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
     'use strict';
     if (target === undefined || target === null) {
       throw new TypeError('Cannot convert undefined or null to object');
     }
    
     var output = Object(target);
     for (var index = 1; index < arguments.length; index++) {
       var source = arguments[index];
       if (source !== undefined && source !== null) {
         for (var nextKey in source) {
           if (source.hasOwnProperty(nextKey)) {
             output[nextKey] = source[nextKey];
           }
         }
       }
     }
     return output;
    };
  })();
}

// 兼容 ie 事件
function addEvent(ele, type, fn) {
  if (ele.addEventListener) {
    ele.addEventListener(type, fn, false);
  } else if(ele.attachEvent) {
    ele.attachEvent('on' + type, fn)
  }
}

// 兼容 ie dataset
function get_dataset(ele){  
  if(ele.dataset){
    return ele.dataset;  
  } else {  
      //兼容代码  
      var dataset = {};  
      var ele_split = ele.outerHTML.split(" ");  
      for(var i = 0,element; i < ele_split.length; i++) {  
         element = ele_split[i];  
         if (element.substring(0,4) == "data") {   
             if (element.indexOf(">") !=  -1) {   
                 element = element.split(">")[0];  
             };  
             ele_key=element.split("=")[0].slice(5);  
             ele_value=element.split("=")[1].slice(1,-1);  
             if(ele_key.indexOf("-") ==  -1){  
                 dataset[ele_key] = ele_value;  
             }else{  
                 ele_keys=ele_key.split("-");  
                 ele_key=ele_keys[0];  
                 for(i=1;i<ele_keys.length;i++){  
                     ele_key+=replaceReg(ele_keys[i]);  
                 }                 
             }  
         };  
      }  
      return dataset;  
  }  
}
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

