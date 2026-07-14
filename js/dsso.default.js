
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


$(document).ready(function () {
	var url = document.location.href;
	var main = url.match("main");
	
	if($(window).width()>991){
		function scrollFn(){
			var scTop = $(window).scrollTop();
			if (scTop >= 218) {
				$(".lnb").css({position:"fixed", left:"0", top:"0", width:"100%", marginTop:"0"});
			} else {
				$(".lnb").css({position:"relative",width:"100%", zIndex:"999"});
			}
		};
		$(window).scroll(function(){
			 scrollFn();
		});
	} else {
		function scrollFn(){
			var scTop = $(window).scrollTop();
			if (scTop >= 166) {
				$(".lnb").css({position:"fixed", left:"0", top:"0", width:"100%", marginTop:"0"});
			} else {
				$(".lnb").css({position:"relative",width:"100%", zIndex:"999"});
			}
		};
		$(window).scroll(function(){
			 scrollFn();
		});
	}
	
});

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