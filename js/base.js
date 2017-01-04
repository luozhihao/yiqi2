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
})