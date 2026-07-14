
var deviceCk = "win16|win32|win64|mac|macintel";
var device;
if(navigator.platform){
	if( deviceCk.indexOf(navigator.platform.toLowerCase())<0 ){
		device = "mobile";
	}else{
		device = "pc";
		$("[href*='tel:']").contents().unwrap();
		$("area[href*='tel:']").remove();
	}
}

$(document).ready(function (){
	if($("*").hasClass("sameH_maxH_div")){
		var maxH;
		$(window).resize(function(){
			$(".sameH_maxH_div").children().css({minHeight:""});
			$(".sameH_maxH_div").children().children().css({minHeight:""});
			
			if($(window).width()>768){
				$(".sameH_maxH_div").each(function(idx){
					var itemH = $(".sameH_maxH_div:eq("+idx+")").children().map(function(){  
						return $(this).height() + 1;  
					}).get(),
					maxH = Math.max.apply(null, itemH);
					$(".sameH_maxH_div:eq("+idx+")").children().css({minHeight:maxH, overflow:"hidden"});
					$(".sameH_maxH_div:eq("+idx+")").children().children().css({minHeight:maxH, overflow:"hidden"});
					console.log(idx+"번째 : "+maxH);
				});
			}
			
		});
		return false;
	};
});

$(document).ready(function (){
	if($("*").hasClass("sameH_maxH_div2")){
		var maxH;
		$(".sameH_maxH_div2").children().css({minHeight:""});
		$(".sameH_maxH_div2").children().children().css({minHeight:""});
		
		if($(window).width()>768){
			$(".sameH_maxH_div2").each(function(idx){
				var itemH = $(".sameH_maxH_div2:eq("+idx+")").children().map(function(){  
					return $(this).height() + 1;  
				}).get(),
				maxH = Math.max.apply(null, itemH);
				$(".sameH_maxH_div2:eq("+idx+")").children().css({minHeight:maxH, overflow:"hidden"});
				$(".sameH_maxH_div2:eq("+idx+")").children().children().css({minHeight:maxH, overflow:"hidden"});
				console.log(idx+"번째 : "+maxH);
			});
		}
		$(window).resize(function(){
			$(".sameH_maxH_div2").children().css({minHeight:""});
			$(".sameH_maxH_div2").children().children().css({minHeight:""});
			
			if($(window).width()>768){
				$(".sameH_maxH_div2").each(function(idx){
					var itemH = $(".sameH_maxH_div2:eq("+idx+")").children().map(function(){  
						return $(this).height() + 1;  
					}).get(),
					maxH = Math.max.apply(null, itemH);
					$(".sameH_maxH_div2:eq("+idx+")").children().css({minHeight:maxH, overflow:"hidden"});
					$(".sameH_maxH_div2:eq("+idx+")").children().children().css({minHeight:maxH, overflow:"hidden"});
					console.log(idx+"번째 : "+maxH);
				});
			}
			
		});
		return false;
	};
});

$(document).ready(function(){
	if($("*").hasClass("sameH_maxH")){
		var maxH;
		$(window).resize(function(){
			$(".sameH_maxH").children().css({minHeight:""});
			// $(".sameH_maxH").children().children().css({minHeight:""});
			if($(window).width()>767){
				$(".sameH_maxH").each(function(idx){
					var itemH = $(".sameH_maxH:eq("+idx+")").children().map(function(){
						return $(this).height() + 1;
					}).get(),
					maxH = Math.max.apply(null, itemH);
					$(".sameH_maxH:eq("+idx+")").children().css({minHeight:maxH, overflow:"hidden"});
					// $(".sameH_maxH:eq("+idx+")").children().children().css({minHeight:maxH, overflow:"hidden"});
					console.log(idx+"번째 : "+maxH);
				});
			}
		});
		return false;
	};
});

$(document).ready(function (){
	$('.lnb .depth a').click(function(){
		$('.lnb .depth ul').not($(this).siblings('ul')).hide();
		$(this).siblings('ul').toggle();
	});
});

$(document).ready(function(){
	function tab(){
		$(".tab > ul > li").attr("class","off");
		$(".tab > ul > li").click(function(){
			var num = $(this).index()
			$(".tab_con > ul > li").hide();
			$(".tab_con > ul > li").eq(num).show();
			$(".tab > ul > li").attr("class","off");		
			$(this).attr("class","on");		
		});
		$(".tab > ul > li").eq(0).click();
	};
	tab();
});

$(document).ready(function(){
	function info_dep(){
		$(".info_dep > ul > li").attr("class","off");
		$(".info_dep > ul > li").mouseenter(function(){
			var num = $(this).index()
			$(".info_con > ul > li").css("background","none");
			$(".info_con > ul > li").eq(num).css("background","#e2eeed");
			$(".info_dep > ul > li").attr("class","off");		
			$(this).attr("class","on");		
		});
		$(".info_dep > ul > li").eq(0).mouseenter();
	};
	info_dep();
});

$(document).ready(function () {
	$(".slide > a").mouseenter(function() {
		$(this).siblings().css('top','0');
	});

	$(".slide > a").mouseleave(function() {
		$(this).siblings().css('top','100%');
	});

	$(".item_detail").mouseenter(function() {
		$(this).css('top','0');
	});

	$(".item_detail").mouseleave(function() {
		$(this).css('top','100%');
	});
});


// $(document).ready(function () {
// 	var url = document.location.href;
// 	var main = url.match("main");
	
// 	if($(window).width()>1220){
// 		function scrollFn(){
// 			var scTop = $(window).scrollTop();
// 			if (scTop >= 218) {
// 				$(".lnb").css({position:"relative",width:"100%", zIndex:"999"});
// 			} else {
// 				$(".lnb").css({position:"relative",width:"100%", zIndex:"999"});
// 			}
// 		};
// 		$(window).scroll(function(){
// 			 scrollFn();
// 		});
// 	} else {
// 		function scrollFn(){
// 			var scTop = $(window).scrollTop();
// 			if (scTop >= 166) {
// 				$(".lnb_wrap").css({position:"fixed", left:"0", top:"0", width:"100%", marginTop:"0"});
// 			} else {
// 				$(".lnb_wrap").css({position:"relative",width:"100%", zIndex:"2"});
// 			}
// 		};
// 		$(window).scroll(function(){
// 			 scrollFn();
// 		});
// 	}
// 	
// }); 

// $(document).ready(function () {
// 	$(".lnb .top").click(function(){
// 		$("html, body").stop().animate({scrollTop:0}, 500);
// 		return false;
// 	});
// });


var displayTab = function(number) {
	$('.tabexa_con').css('display', 'none');
	$('.tab_' + number).css('display', 'block');
	$('.tab_btn_' + number).parents("li").addClass("on");
};

$(document).ready(function () {
	$(window).scroll(function(){
		var scTop = $(window).scrollTop();
		if (scTop > $("header").outerHeight()) {
			$("#gotop").fadeIn(300);
		} else {
			$("#gotop").fadeOut(300);
		}
	});
	$("#gotop").click(function(){
		$("html, body").stop().animate({scrollTop:0}, 500);
		return false;
	});
});


$(document).ready(function(){
	if($("*").is(".slider")){
		var countNow = new Array; 
		var countPrev = new Array; 
		var sType = new Array; 
		var sTime = new Array; 
		var sBtn = new Array;
		var sPage = new Array; 
		var sSpeed = new Array; 
		var timer = new Array; 
		var sMax = new Array;
		var arrow = new Array; 
		var clickNow = new Array;
		var clickState = new Array; 
		var stopState = new Array; 
		var easing = "easeInOutCubic"; 

		$(".slider").each(function(idx){
			sType[idx] = $(this).attr("data-type");
			sTime[idx] = Number($(this).attr("data-time"));
			sMax[idx] = Number($(this).find(".sliderObj").children().length -1);
			sSpeed[idx] = Number($(this).attr("data-speed"));
			sBtn[idx] = $(this).attr("data-btn");
			sPage[idx] = $(this).attr("data-page");
			arrow[idx] = "next"; 
			clickState[idx] = false; 
			stopState[idx] = false; 
			countNow[idx] = 0;
			
			if(sMax[idx] == 0){
				$(this).find(".sliderPage").css({display:"none"});
				$(this).find(".sliderBtn").css({display:"none"});
			}
			$(this).find(".sliderObj").addClass(sType[idx]); 
			$(this).find(".sliderButton").addClass(sBtn[idx]); 
			$(this).find(".sliderPage").addClass(sPage[idx]);
			$(this).find(".sliderObj").children().each(function(i){ 
				$(this).css({backgroundImage:"url("+$(this).find("img").attr("src")+")"});
				$(this).parent().siblings(".sliderPage").children("div").append("<a href='#void'><span>"+(i+1)+"</span></a>"); 
			});
			$(".slider").eq(idx).find(".sliderPage").children("div").children(":first-child").addClass("on"); 

			function sliderFn(){
				if(!$(".slider").eq(idx).find(".sliderObj").children().is(":animated") && (sMax[idx] > 0)){ 
					clearInterval(timer[idx]);
					$item = $(".slider").eq(idx).find(".sliderObj").children();
					$page = $(".slider").eq(idx).find(".sliderPage").children("div").children();					
					if(!clickState[idx]){ 
						if(arrow[idx] == "next"){ 
							if(countNow[idx] < sMax[idx]){
								countPrev[idx] = countNow[idx];
								countNow[idx]++;
							}else if(countNow[idx] = sMax[idx]){
								countPrev[idx] = countNow[idx];
								countNow[idx] = 0;
							};
						}else{
							if(countNow[idx] > 0){
								countPrev[idx] = countNow[idx];
								countNow[idx]--;
							}else if(countNow[idx] == 0){
								countPrev[idx] = countNow[idx];
								countNow[idx] = sMax[idx];
							};
						}
					}else{
						countPrev[idx] = countNow[idx];
						countNow[idx] = clickNow[idx]+1;
						clickState[idx] = false;
					}
					$page.eq(countPrev[idx]).removeClass("on"); 
					$page.eq(countNow[idx]).addClass("on"); 

					if(sType[idx] =="normal"){
						if(arrow[idx] == "next"){ 
							$item.eq(countPrev[idx]).stop().animate({left:"-100%"},sSpeed[idx],easing,function(){
								$(this).css({left:"100%"});
							});
							$item.eq(countNow[idx]).css({left:"100%"});
						}else{ 
							$item.eq(countPrev[idx]).stop().animate({left:"100%"},sSpeed[idx],easing,function(){
								$(this).css({left:"-100%"});
								arrow[idx] = "next";
							});
							$item.eq(countNow[idx]).css({left:"-100%"});
						}
						$item.eq(countNow[idx]).animate({left:"0"},sSpeed[idx],easing);
						if(!stopState[idx]){ 
							timer[idx] = setInterval(sliderFn, sTime[idx]);
						}
					}
					
					if(sType[idx] =="updown"){
						if(arrow[idx] == "next"){ 
							$item.eq(countPrev[idx]).stop().animate({top:"-100%"},sSpeed[idx],easing,function(){
								$(this).css({top:"100%"});
							});
							$item.eq(countNow[idx]).css({top:"100%"});
						}else{ 
							$item.eq(countPrev[idx]).stop().animate({top:"100%"},sSpeed[idx],easing,function(){
								$(this).css({top:"-100%"});
								arrow[idx] = "next";
							});
							$item.eq(countNow[idx]).css({top:"-100%"});
						}
						$item.eq(countNow[idx]).animate({top:"0"},sSpeed[idx],easing);
						if(!stopState[idx]){ 
							timer[idx] = setInterval(sliderFn, sTime[idx]);
						}
					}
					
					if(sType[idx] =="fade"){
						$item.eq(countNow[idx]).css({opacity:"1"});
						$item.eq(countPrev[idx]).css({opacity:"0"});
						if(!stopState[idx]){ 
							timer[idx] = setInterval(sliderFn, sTime[idx]);
						}
					}
				};

			}; 
			timer[idx] = setInterval(sliderFn, sTime[idx]);

			$(this).find(".bPrev").click(function(){
				arrow[idx] = "prev";				
				sliderFn();
			});
			$(this).find(".bNext").click(function(){
				arrow[idx] = "next";
				sliderFn();
			});
			$(this).find(".sliderPage>div>a").click(function(){
				if($(this).index() != countNow[idx]){ 
					if($(this).index() > countNow[idx]){
						arrow[idx] = "next";
					}else{
						arrow[idx] = "prev";
					}
					clickNow[idx] = $(this).index()-1;
					clickState[idx] = true;
					sliderFn();
				};
			});			
			$(this).find(".sliderPage .bState").click(function(){
				if($(this).is(".play")){
					$(this).removeClass("play");
					stopState[idx] = false;
					timer[idx] = setInterval(sliderFn, sTime[idx]);
				}else{
					$(this).addClass("play");
					stopState[idx] = true;
					clearInterval(timer[idx]);
				}
			});

		}); 
	};
});