// var pathUrl = "http://ggtj.chinaedu.com/rec/";
// var pathUrl = "http://172.16.16.96:9080/rec/";
var pathUrl = "/rec/";

// wang yue's computer
// var pathUrl = "http://172.16.16.136:9080/rec/";
var picUrl = "http://www.chinaedu.com"

// var picUrl = "";

function createtable(opt,isExport) {

	var tableId = opt.tableId,
		columns = opt.columns;
	
	var url = getURL(opt,isExport);
	var modalURL = "";
	$.ajax(url,{
		type:"get",
		success:function(data) {
			var dataList=eval("("+data+")"),
			dataListLen=dataList.length,
			columnArr=columns.split(";"),
			tbHtml="",
			clicks=0;

			for (var i=0; i<dataListLen; i++) {
				tbHtml+="<tr>";
				for (var j=0; j<columnArr.length; j++) {
					
					// 如果有值，往表格 td 中添加对应内容 
					if (dataList[i][columnArr[j]]) {

						// 如果是物料报告， 要对广告物料预览进行特殊处理
						// 给 columnArr 的列都加上 class 为 origin-data
						// 便于通过 filter(.td.origin-data) 操作进行筛选
						if (tableId == "materiel") {
							// 给点击量的 td 添加 a 标签 => 点击数字弹出模态框
							if (columnArr[j]=="hitnum") {
								tbHtml+="<td class=\"origin-data numeric text-center\"><a href=\"javascript:void(0);\">"+dataList[i][columnArr[j]]+"</a></td>";
							} else if (columnArr[j] == "am_img_position" || columnArr[j] == "am_font_content" || columnArr[j] == "am_type") {

								// “图片链接地址”项 ， “文字说明” 项 和 “类型id”项 不展示在页面中 
								// 通过样式（.materiel-hidden）设置 display: none
								// 这样处理的优势： 该列不显示在 table 中， 但是可以通过 dom 操作获取到。
								if (columnArr[j] != "am_type") {
									tbHtml+="<td class=\"origin-data materiel-hidden\">"+dataList[i][columnArr[j]]+"</td>";
								} else {
									tbHtml+="<td class=\"origin-data materiel-hidden\">"+dataList[i][columnArr[j]]+"</td>";

									// 增加物料预览列，由于此列非 columnArr 里直接数据(此列只是用于页面展示)，故不加 class “origin-data”
									// 如果是类型id， 要分情况展示 1: 文字； 2：图片； 3：文字 + 图片
									if (dataList[i].am_type == 1) {

										// 类型为文字： 展示文字说明 am_font_content
										tbHtml+="<td class=\"numeric text-center\">"+dataList[i].am_font_content+"</td>";
									} else if (dataList[i].am_type == 2) {

										// 类型为图片： 展示图片 am_img_position 放置在 img 标签中
										// 图片未找到
										tbHtml+="<td class=\"numeric text-center\"><img class=\"materiel-img\" src=\""+picUrl+dataList[i].am_img_position+"\"></td>";
										// tbHtml+="<td class=\"numeric text-center\"><img src=\"http://img.mukewang.com/5704a68f0001e20206000338-240-135.jpg\"></td>";

									} else if (dataList[i].am_type == 3) {

										// 类型为文字 + 图片： 二者均展示
										tbHtml+="<td class=\"numeric text-center\"><img class=\"materiel-img\" src=\""+picUrl+dataList[i].am_img_position+"\"></br>"+dataList[i].am_font_content+"</td>";
										// tbHtml+="<td class=\"numeric text-center\"><img src=\"http://img.mukewang.com/5704a68f0001e20206000338-240-135.jpg\"></br>"+dataList[i].am_font_content+"</td>";
									}
								}
								
							} else {
								tbHtml+="<td class=\"origin-data numeric text-center\">"+dataList[i][columnArr[j]]+"</td>";
							}
						} else {

							// 如果不是物料报告，给点击量的 td 添加 a 标签（除了整体报告外都可点击弹出模态框）
							if (columnArr[j]=="hitnum" && tableId!="resultList") {
								tbHtml+="<td class=\"numeric text-center\"><a href=\"javascript:void(0);\">"+dataList[i][columnArr[j]]+"</a></td>";
							}else{
								tbHtml+="<td class=\"numeric text-center\">"+dataList[i][columnArr[j]]+"</td>";
							};
						}
					}else{
						// 如果无值， td 内容为空
						if (columnArr[j] == "am_img_position" || columnArr[j] == "am_font_content") {
							tbHtml+="<td class=\"origin-data materiel-hidden\">"+dataList[i][columnArr[j]]+"</td>";
						} else {
							tbHtml+="<td class=\"numeric text-center\">&nbsp;</td>";
						}
					};
					if (columnArr[j]=="hitnum") {
						clicks+=Number(dataList[i][columnArr[j]]);
					};
				};
				tbHtml+="</tr>";
			};

			$("#"+tableId+" table tbody").html(tbHtml);
			$("#"+tableId+" .f20 span").text(clicks);
			
			// datatables using

			wageNowTable = $("#"+tableId+" table").dataTable({
				language:{
					emptyTable: '表格无数据'
				},
				info: false,
				searching: false,
				paging: false,
				ordering: true,
				lengthChange: false,
				destroy: true,
				retrieve: true,
				bDestroy: true
			})
		
			cancelLoading();
		}
	});
};

function createViewDate(opt) {
	var formId = opt.formId,
		tableId = opt.tableId,
		method = opt.method,
		columns = opt.columns,
		url = ""
		params = "",
		_tempstr = "";

	opt.params.forEach(function(ele,index) {
		_tempstr += "&" + ele.name + "=" + ele.value;
		return _tempstr
	});
	params = _tempstr;


	var date1=$("#dataSelect input[name='dataBegin']").val(),
		date2=$("#dataSelect input[name='dataEnd']").val();
	
	params += "&date1="+date1+"&date2="+date2;
	url = pathUrl + method + params + "&t=" + +new Date().getTime();

	$.ajax(url,{
		type:"get",
		success:function(data) {
			var dataList=eval("("+data+")"),
				dataListLen=dataList.length,
				columnArr=columns.split(";"),
				tbHtml="",
				clicks=0;

			for (var i=0; i<dataListLen; i++) {
				tbHtml+="<tr>";
				for (var j=0; j<columnArr.length; j++) {
					if (dataList[i][columnArr[j]]) {
						tbHtml+="<td class=\"numeric text-center\">"+dataList[i][columnArr[j]]+"</td>";
					}else{
						tbHtml+="<td class=\"numeric text-center\">&nbsp;</td>";
					};
				};
				tbHtml+="</tr>";
			};

			$("#"+tableId+"List").show();
			$("#"+tableId+"List tbody").html(tbHtml);
			$("#"+tableId+"List").dataTable({
				language:{
					emptyTable: '表格无数据'
				},
				info: false,
				searching: false,
				paging: false,
				lengthChange: false
			});
		}
	});
};


function getURL(opt, isExport) {
	var formId = opt.formId,
		method = opt.method;

	var date1=$("#dataSelect input[name='dataBegin']").val(),
		date2=$("#dataSelect input[name='dataEnd']").val(),
		formValues="",
		url="",
		formData=$("#"+formId).serializeArray(),
		formDataLen=formData.length;

	if (!date1 || !date2) {
		bootbox.alert({
			buttons: {
				ok: {
					label: '确定',
					className:'blue'
				}
			},
			message: '请选择日期！'
		});
	} else {
		formValues+="&date1="+date1+"&date2="+date2;

		for (var i=0; i<formDataLen; i++) {
			if (formData[i].value) {
				if (formValues.indexOf(formData[i].name+"=")>=0) {
					formValues+=";"+formData[i].value;
				} else {
					formValues+="&"+formData[i].name+"="+formData[i].value;
				};
			};
		};
	};

	if (isExport) {
		url = pathUrl+method+"&csv=1"+formValues+"&t="+new Date().getTime();
	} else {
		url = pathUrl+method+formValues+"&t="+new Date().getTime();
	}
	return url;
}

