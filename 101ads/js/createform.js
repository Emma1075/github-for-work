// var pathUrl = "http://ggtj.chinaedu.com/rec/";
// var pathUrl = "http://172.16.16.96:9080/rec/";
var pathUrl = "/rec/";


// wang yue's computer
// var pathUrl = "http://172.16.16.136:9080/rec/";


function createform(opt,fn) {
	var queryterm = opt.queryterm.split("_"),
		tableId = opt.tableQuery.tableId,
		querytermLen=queryterm.length,
		tplid=0;

	for (var j=0; j<querytermLen; j++) {
		switch (queryterm[j]) {
			case"site":
				// $("#"+tableId+" select[name='site']").html("<option value=\"\">101教育PC</option>");
				$.ajax(pathUrl + "adver.adv?method=querySite&t="+new Date().getTime()+"",{
					type:"get",
					async:false,
					success:function(data) {
						var pageList=eval("("+data+")"),
							pageListLen=pageList.length,
							html="";

						for (var i=0; i<pageListLen; i++) {
							if (i==0) {
								site=pageList[i].site_id;
							};
							html+="<option value=\""+pageList[i].site_id+"\">"+pageList[i].site_name+"</option>";
						};

						$("#"+tableId+" select[name='site']").html(html);
					}
				});
				break;
			case"tplid":
				$.ajax(pathUrl + "gateway.mvc?method=queryTemplate&t="+new Date().getTime()+"",{
					type:"get",
					async:false,
					success:function(data) {
						var pageList=eval("("+data+")"),
							pageListLen=pageList.length,
							html="";

						for (var i=0; i<pageListLen; i++) {
							if (i==0) {
								tplid=pageList[i].tpl_id;
							};
							html+="<option value=\""+pageList[i].tpl_id+"\">"+pageList[i].tpl_name+"</option>";
						};

						$("#"+tableId+" select[name='tplid']").html(html);
					}
				});
				break;
			case"apid":
				// createAdspace(tplid,tableId);
				// fn(opt);
				$.ajax(pathUrl + "gateway.mvc?method=queryPosition&tplid="+tplid+"&t="+new Date().getTime()+"",{
					type:"get",
					async:false,
					success:function(data) {
						var adspaceList=eval("("+data+")"),
						adspaceListLen=adspaceList.length,
						html="<option value=\"\">所有广告位</option>";

						for (var i=0; i<adspaceListLen; i++) {
							html+="<option value=\""+adspaceList[i].id+"\">"+adspaceList[i].name+"</option>";
						};
						$("#"+tableId+" select[name='apid']").html(html);
					}
				});
				break;
			case"cid":
				$.ajax(pathUrl + "gateway.mvc?method=queryCategory&cid=0&t="+new Date().getTime()+"",{
					type:"get",
					async:false,
					success:function(data) {
						var columnList=eval("("+data+")"),
						columnListLen=columnList.length,
						html="";

						for (var i=0; i<columnListLen; i++) {
							html+="<label class=\"radio-inline\"><input type=\"checkbox\" name=\"cid\" value=\""+columnList[i].id+"\" checked=\"checked\">"+columnList[i].name+"</label>";
						};

						$("#"+tableId+" .radio-list:last").html(html);

						//列表checkbox全选/反选
						var isChecked = false,
							checkedNum = $("#"+tableId+" .radio-list:last :checkbox:not(:disabled)").length;
						$("#"+tableId+" .radio-list:first :checkbox").on("click",function() {
							isChecked = !isChecked;

							if (isChecked) {
								$("#"+tableId+" .radio-list:first :checkbox").attr("checked",true).parent().addClass("checked");
								$("#"+tableId+" .radio-list:last :checkbox:not(:disabled)").attr("checked",true).parent().addClass("checked");
							}else{
								$("#"+tableId+" .radio-list:first :checkbox").removeAttr("checked").parent().removeClass("checked");
								$("#"+tableId+" .radio-list:last :checkbox:not(:disabled)").removeAttr("checked").parent().removeClass("checked");
							};
						});
						$("#"+tableId+" .radio-list:last :checkbox:not(:disabled)").on("click",function() {
							if (checkedNum==$("#"+tableId+" .radio-list:last :checkbox:not(:disabled):checked").length) {
								isChecked = true;
								$("#"+tableId+" .radio-list:first :checkbox").attr("checked",true).parent().addClass("checked");
							}else{
								isChecked = false;
								$("#"+tableId+" .radio-list:first :checkbox").removeAttr("checked").parent().removeClass("checked");
							};
						});

						Metronic.init();
					}
				});
				break;
		};
	};
	fn(opt.tableQuery,false);
};

function createAdspace(tplid,tableId) {
	$.ajax(pathUrl + "gateway.mvc?method=queryPosition&tplid="+tplid+"&t="+new Date().getTime()+"",{
		type:"get",
		success:function(data) {
			var adspaceList=eval("("+data+")"),
			adspaceListLen=adspaceList.length,
			html="<option value=\"\">所有广告位</option>";

			for (var i=0; i<adspaceListLen; i++) {
				html+="<option value=\""+adspaceList[i].id+"\">"+adspaceList[i].name+"</option>";
			};

			$("#"+tableId+" select[name='apid']").html(html);
		}
	});
};
