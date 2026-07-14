jQuery(document).ready(function(){
	//gnb
	jQuery("#gnb").hover(function(){
		jQuery("#header .twoDbg").stop(true, true).slideDown(200);
		jQuery("#gnb .twoD").stop(true, true).slideDown(200);
		jQuery("#header").addClass("bgWhite");
		jQuery(this).addClass("on");
	}, function(){
		jQuery("#header .twoDbg").stop(true, true).slideUp(200);
		jQuery("#gnb .twoD").stop(true, true).slideUp(200);
		jQuery("#header").removeClass("bgWhite");
		jQuery(this).removeClass("on");
	});

	jQuery("#gnb").focusin(function(){
		jQuery("#header .twoDbg").stop(true, true).slideDown(200);
		jQuery("#gnb .twoD").stop(true, true).slideDown(200);
		jQuery("#header").addClass("bgWhite");
		jQuery(this).addClass("on");
	});

	jQuery("#gnb").focusout(function(){
		jQuery("#header .twoDbg").stop(true, true).slideUp(200);
		jQuery("#gnb .twoD").stop(true, true).slideUp(200);
		jQuery("#header").removeClass("bgWhite");
		jQuery(this).removeClass("on");
	});
	
	jQuery("#gnb .oneD").hover(function(){
		jQuery(this).addClass("on");
		jQuery(this).next().addClass("on");
	}, function(){
		jQuery(this).removeClass("on");
		jQuery(this).next().removeClass("on");
	});

	jQuery("#gnb .oneD").focusin(function(){
		jQuery(this).addClass("on");
		jQuery(this).next().addClass("on");
	});

	jQuery("#gnb .oneD").focusout(function(){
		jQuery(this).removeClass("on");
		jQuery(this).next().removeClass("on");
	});

	jQuery("#gnb .twoD").hover(function(){
		jQuery(this).addClass("on");
		jQuery(this).prev().addClass("on");
	}, function(){
		jQuery(this).removeClass("on");
		jQuery(this).prev().removeClass("on");
	});

	jQuery("#gnb .twoD").focusin(function(){
		jQuery(this).addClass("on");
		jQuery(this).prev().addClass("on");
	});

	jQuery("#gnb .twoD").focusout(function(){
		jQuery(this).removeClass("on");
		jQuery(this).prev().removeClass("on");
	});

	jQuery("#gnb .twoD a").hover(function(){
		jQuery(this).addClass("on");
	}, function(){
		jQuery(this).removeClass("on");
	});

	jQuery("#gnb .twoD a").focusin(function(){
		jQuery(this).addClass("on");
	});

	jQuery("#gnb .twoD a").focusout(function(){
		jQuery(this).removeClass("on");
	});

	//lnb
	/*jQuery("#lnb .thrD").slideUp(0);
	
	if(parseInt(twoNum) > -1)
	{
		jQuery("#lnb .twoD").eq(twoNum).addClass("on");
		jQuery("#lnb .twoD").eq(twoNum).next("#lnb .thrD").stop(true, true).slideDown(0);
		
		if(parseInt(thrNum) > -1)
		{
			jQuery("#lnb .twoD").eq(twoNum).next("#lnb .thrD").find("a").eq(thrNum).addClass("on");
		}
	}

	jQuery("#lnb .twoD").on("mouseenter", function(){
		jQuery("#lnb .twoD").next("#lnb .thrD").find("a").removeClass("on");
		jQuery("#lnb .twoD").next("#lnb .thrD").stop(true, true).slideUp(300);
		jQuery("#lnb .twoD").removeClass("on");
		
		jQuery(this).addClass("on");
		jQuery(this).next("#lnb .thrD").stop(true, true).slideDown(300);
	});

	jQuery("#lnb").on("mouseleave", function(){
		jQuery("#lnb .twoD").next("#lnb .thrD").find("a").removeClass("on");
		jQuery("#lnb .twoD").next("#lnb .thrD").stop(true, true).slideUp(300);
		jQuery("#lnb .twoD").removeClass("on");
		
		if(parseInt(twoNum) > -1)
		{
			jQuery("#lnb .twoD").eq(twoNum).addClass("on");
			jQuery("#lnb .twoD").eq(twoNum).next("#lnb .thrD").stop(true, true).slideDown(0);
			
			if(parseInt(thrNum) > -1)
			{
				jQuery("#lnb .twoD").eq(twoNum).next("#lnb .thrD").find("a").eq(thrNum).addClass("on");
			}
		}
	});*/

	//mobile lnb
	var curMlnb = -1;
	var curMlnb2;
	var isOpening = false;
	jQuery("#mobileLnb .mLnbDiv .lnbOne").each(function(q){
		jQuery(this).click(function(){
			if(curMlnb != q){
				if(isOpening == false){
					 isOpening = true;
					 jQuery("#mobileLnb .mLnbDiv .lnbOne").eq(curMlnb).removeClass("on");
					 jQuery("#mobileLnb .mLnbDiv .lnbTwo").eq(curMlnb).stop().slideUp(200);
					 curMlnb = q;
					 jQuery("#mobileLnb .mLnbDiv .lnbOne").eq(curMlnb).addClass("on");
					 jQuery("#mobileLnb .mLnbDiv .lnbTwo").eq(curMlnb).stop().slideDown(200, function(){
						isOpening = false;
					 });
				}
			}else if(curMlnb == q){
				if(isOpening == false){
					 isOpening = true;
					 jQuery("#mobileLnb .mLnbDiv .lnbOne").eq(curMlnb).removeClass("on");
					 jQuery("#mobileLnb .mLnbDiv .lnbTwo").eq(curMlnb).stop().slideUp(200, function(){
						isOpening = false;
					 });
					 curMlnb = -1;
				}
			}
		});
	});

	//tab2
	jQuery(".tab2 a").last().css('backgroundImage', 'none');

	//mobile gnb
	jQuery("#gnbM .gnbDiv .two").each(function(q){
		jQuery(this).find(".twoD").last().css('borderBottom', 'none');
	});

	var curMgnb = false;
	jQuery(".mobileMenu").click(function(){
		if(curMgnb == false){
			jQuery("#gnbM").stop().animate({right:0}, 250);
			jQuery(".dimdBg").stop().fadeIn(250);
			curMgnb = true;
		}
	});

	jQuery("#gnbM .mobileMenuXbt").click(function(){
		if(curMgnb == true){
			jQuery("#gnbM").stop().animate({right:-300}, 250);
			jQuery(".dimdBg").stop().fadeOut(250);
			curMgnb = false;
		}
	});

	var curMgnb1 = -1;
	var curMgnb2 = -1;
	jQuery("#gnbM .gnbDiv .two").slideUp(0);
	jQuery("#gnbM .gnbDiv .two .thr").slideUp(0);
	jQuery("#gnbM .gnbDiv .one").removeClass("on");
	jQuery("#gnbM .gnbDiv .one").each(function(q){
		jQuery(this).click(function(){
			if(curMgnb1 != q){
				jQuery("#gnbM .gnbDiv .one").eq(curMgnb1).removeClass("on");
				jQuery("#gnbM .gnbDiv .two").eq(curMgnb1).stop().slideUp('fast');
				curMgnb1 = q;
				jQuery("#gnbM .gnbDiv .one").eq(curMgnb1).addClass("on");
				jQuery("#gnbM .gnbDiv .two").eq(curMgnb1).stop().slideDown('fast');
			}else if(curMgnb1 == q){
				jQuery("#gnbM .gnbDiv .one").eq(curMgnb1).removeClass("on");
				jQuery("#gnbM .gnbDiv .two").eq(curMgnb1).stop().slideUp('fast');
				curMgnb1 = -1;
			}
		});
	});

	jQuery("#gnbM .gnbDiv .two .twoD").each(function(q){
		jQuery(this).click(function(){
			if(curMgnb2 != q){
				jQuery("#gnbM .gnbDiv .two .thr").stop().slideUp('fast');
				jQuery(this).next(".thr").stop().slideDown('fast');
				curMgnb2 = q;
			}else if(curMgnb2 == q){
				jQuery(this).next(".thr").stop().slideUp('fast');
				curMgnb2 = -1;
			}
		});
	});
	
	//모바일 서브 메뉴
	var curMobileSub = false;
	jQuery(".mobileSubmenu a").each(function(q){
		jQuery(".mobileSubmenu a").last().css('borderBottom', 'none');
	});

	jQuery("#mobileSub .mNxt").click(function(){
		if(curMobileSub == false){
			jQuery(".mobileSubmenu").stop().slideDown(250);
			curMobileSub = true;
		}else if(curMobileSub == true){
			jQuery(".mobileSubmenu").stop().slideUp(250);
			curMobileSub = false;
		}
	});

	//적응형 관련
	jQuery(window).resize(function(){
		//mobile gnb
		jQuery(".dimdBg").height(jQuery(document).height());
		jQuery("#gnbM").height(jQuery(document).height());

		if(jQuery(window).width() <= 1262 && jQuery(window).width() > 1006)
		{ 
			//1280
			jQuery(".dimdBg").css('display', 'none');
			jQuery(".mobileSubmenu").slideUp(0);
			jQuery("#gnbM").css('right', -300);
			curMgnb = false;
			curMobileSub = false;
		}
		else if(jQuery(window).width() <= 1006)
		{ 
			//768

		}
		else
		{ 
			//1920

		}
	});
	
	jQuery(window).resize();
	
	//가로스크롤
	jQuery(window).resize(function(){
		jQuery(".scrollX .widthScbg").each(function(q){
			jQuery(".scrollX .widthScbg").eq(q).height(jQuery(".scrollX").eq(q).height());
		});
	});
	
	jQuery(window).resize();
}); 