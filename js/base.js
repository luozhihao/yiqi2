$(function () {
	
	// 回到顶部
	$(".go-top").click(function() {
		$("html, body").animate({ scrollTop: 0 }, 500);
	});

	// 移动端导航效果
	$(document).on('click', '.nav-btn', function() {
	    var e = $(this);

	    if (e.hasClass('btn-an')) {
	        e.removeClass('btn-an');

	        $('.nav').animate({
	            right: '-125px',
	        }, 500);

	    } else {
	        e.addClass('btn-an');

	        $('.nav').animate({
	            right: '0px',
	        }, 500);
	    }
	});

	// 导航高亮
	function isActive() {
		w = $(window).width();

		if (w > 1023) {
			$('.nav li').hover(function() {
			    $(this).addClass('active');
			}, function() {
				if (!$(this).hasClass('cur')) {
					$(this).removeClass('active');
				}
			})
		} else {
			$('.nav li').removeClass('active cur');
		}
	}

	isActive();

	$(window).resize(isActive);
})