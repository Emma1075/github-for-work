// 筛选功能
function filterTable(ele, option) {
	var index = 0;
	$("#" + ele).submit(function() {
		showLoading(1);

		wageNowTable.fnClearTable();//清空数据.fnClearTable();//清空数据  
		wageNowTable.fnDestroy(); //还原初始化了的datatable  

		createtable(option,false);

		return false;
	});
};

function exportCSV(ele, option) {
	$("#" + ele + " button:last").click(function() {
		var url = getURL(option,true);
		// 利用 window.open() 下载，不支持 IE8
		// window.open(url);

		// 利用 iframe 下载, 兼容性好
		var eleIframe = document.createElement("iframe");
		eleIframe.src = url;
		eleIframe.style.display = "none";
		document.body.appendChild(eleIframe);
	});
};

function clickModal(ele, option) {
	$("#" + ele + " table tbody").on("click","td a",function() {
		var _this=$(this),
			_tempArr = [],
			_temptds,
			params = option.params,
			paramsLen = params.length;
		if (option.formId === "materielqueryterm") {
			// 只要 .origin-data 的列
			_temptds = _this.parents("tr").find("td.origin-data");

			params.forEach(function(ele,index) {
				if (typeof(ele) == "string") {
					var _tempObj = {};
					_tempObj.name = ele;
					// index + 1 ： 因为第一项是 物料id ；我们需要的是 物料名称
					_tempObj.value = _temptds[index+1].innerHTML;
					_tempArr.push(_tempObj);
				} else {						
					ele.value = _temptds[index+1].innerHTML;
					_tempArr = params;
				}
				
			});
		} else {
			_temptds = _this.parents("tr").find("td");
			params.forEach(function(ele,index) {
				if (typeof(ele) == "string") {
					var _tempObj = {};
					_tempObj.name = ele;
					_tempObj.value = _temptds[index].innerHTML;
					_tempArr.push(_tempObj);
				} else {
					ele.value = _temptds[index].innerHTML;
					_tempArr = params;
				}
			});
		}
		
		option.params = _tempArr.concat();

		$("#ViewDate").modal({
			remote:"viewdate.html"
		});
		$("#ViewDate").on('loaded.bs.modal', function() {
			createViewDate(option);			
		});
	});
};

// ie: arr.forEach 兼容 IE 浏览器
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