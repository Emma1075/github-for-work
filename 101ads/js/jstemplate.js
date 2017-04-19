//显示页面加载loading
function showLoading(flag) {
  var _PageHeight = document.documentElement.clientHeight,
      _PageWidth = document.documentElement.clientWidth,
      _LoadingTop = _PageHeight > 64 ? (_PageHeight - 64) / 2 : 0,
      _LoadingLeft = _PageWidth > 64 ? (_PageWidth - 64) / 2 : 0,
      _LoadingHtml = '<div id="loadingDiv" style="position:absolute; top:'+$(document).scrollTop()+'px; left:0; width:100%; height:'+_PageHeight+'px; z-index:20000;"><div style="width:100%; height:'+_PageHeight+'px; background:#ffffff; opacity:0.6; filter:alpha(opacity=60);"></div><div style="position:absolute; cursor:wait; top:'+_LoadingTop+'px; left:'+ _LoadingLeft+'px; width:64px; height:64px; border:0;"><img src="images/loading1.gif"></div></div>',
      loadingMask = document.getElementById('loadingDiv');

  loadingFlag=flag;

  if (!loadingMask) {
    $("body").prepend(_LoadingHtml);
  };
};

//取消页面加载loading
function cancelLoading() {
  var loadingMask = document.getElementById('loadingDiv');

  loadingFlag-=1;

  if (loadingMask && loadingFlag==0) {
    loadingMask.parentNode.removeChild(loadingMask);
  };
};
