/**
 * 
 * @authors wgqth (wgqth@qq.com)
 * @date    2016-01-25 16:16:55
 */
$(document).ready(function() {
	//检测浏览器

    var _w = $(window).width();
    //alert(_w)


});

//select 美化
if($('.form-control').length >0){
	// $('.select-default').chosen({
	// 	disable_search:true
	// });
	$('.select-sea').chosen({
		disable_search:false
	});
}

//select 美化
// if($('.setPage').length >0){
// 	$('.select-page').chosen({
// 		disable_search:true
// 	});
// }

function CenList(){
	var CenList=$(".CenList");
	if(CenList.is(':visible')){
	    $(".NoSelect").hide();
	    //alert("1");
	} else{   
	    $(".NoSelect").show();
	    //alert("2");
	}
}
CenList();

/*目录*/
$.levelMenu = function(box,level,btn,el) {
	$('body').delegate(level + ' ' + btn,"click",function(){
		var isHover = $(this).is('.fa-angle-down');
		if(isHover) {
			$(this).parents(box).find(el).show();
			$(this).removeClass('fa-angle-down').addClass('fa-angle-up');
		} else {
			$(this).parents(box).find(el).hide();
			$(this).removeClass('fa-angle-up').addClass('fa-angle-down');
		};
		
	});
};

if($('.singleToggle').length >0){
	$('.singleToggle').click(function() {
			var isOn = $(this).is('.on');
			if(!isOn) {
				$(this).find('.toggleOff').hide().parent().find('.toggleOn').show();
				$(this).addClass('on');
			} else {
				$(this).find('.toggleOn').hide().parent().find('.toggleOff').show();
				$(this).removeClass('on');
			};
	});	
}






function PCmenu(){
	//PC菜单
	var menu=$("#menu");
    var _w = $(window).width();
    var _h = $(window).height();
    var _li = ($("ul.page-sidebar-menu > li").length)-1;
    //console.log(_li);
	menu.on("mouseenter","li.PCList",function(){
		$(this).children("a").addClass("cur")
		$(this).children("a").children("span.arrow").addClass("open")
		var elem_ul=$(this).find("ul.PcMenu");
		elem_ul.show();
	});
	menu.on("mouseleave","li.PCList",function(){
		$(this).children("a").removeClass("cur");
		$(this).children("a").children("span.arrow").removeClass("open");
		$(this).find("ul.PcMenu").hide();
	});
	if (_w > 768){
		menu.on("click","li.PCList",function(){
			$(this).children(".sub-menu").addClass('noneOvh');
		});
    }else{
    }
	if (_li > 8 && _h < 600){
		$("ul.page-sidebar-menu > li:gt(8) .PcMenu").css({
			top: 'auto',
			bottom: '0px'
		});
    }else{

    }

}


// 判断是否为移动端运行环境 
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent)||(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
 if(window.location.href.indexOf("?mobile")<0){ 
  try{ 
   if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){ 
    // 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry 
    //console.log("移动设备");

		$(".scrolbar").mCustomScrollbar({
			theme:"dark-3",
			mouseWheelPixels:"200"
		});

		$(".date-picker,.date-picker-right").find('input.form-control').attr("type","date");
   } 
   else if(/iPad/i.test(navigator.userAgent)){ 
    // 判断访问环境是 iPad 
    //console.log("平板设备");

		$(".scrolbar").mCustomScrollbar({
			theme:"dark-3",
			mouseWheelPixels:"200"
		});

		$(".date-picker,.date-picker-right").find('input.form-control').attr("type","date");
   } 
  } 
  catch(e){} 
 } 
}
// 判断访问环境是 PC 
else{
    PCmenu();

    //日期空间
    if (jQuery().datepicker) {
        // $('.date-picker').datepicker({
        //     rtl: Metronic.isRTL(),
        //     orientation: "left",
        //     autoclose: true
        // });
    }



	$(window).load(function(){
		var _w = $(window).width();
		$("body").find('.portlet-body').removeClass('flip-scroll');
		$(".portletTable").find('table').removeClass('table');
		//$(".portletTable").find('table').css('width',_w);

		$(".portletTable").mCustomScrollbar({
			axis:"x",
			//theme:"minimal-dark",
			theme:"dark",
			mouseWheelPixels:"200",
			scrollButtons:{
				enable:true,
				scrollSpeed:10,
				scrollAmount:200,
				scrollType:"stepped"
			}
		});

		$(".scrolbar").mCustomScrollbar({
			theme:"dark-3",
			mouseWheelPixels:"200"
		});

	});

};


$(window).resize(function(){

});


