$(function() {

	// 一级tab切换
	$('.ex-nav-menu .menu').on('click', function(event) {
		var e = $(this),
			index = e.index();

		event.preventDefault();

		e.addClass('active').siblings().removeClass('active');

		$('.ex-tab').eq(index).addClass('active').siblings().removeClass('active');
	})

	// 二级tab切换 
	$('.ex-nav-tabs a').on('click', function(event) {
		var e = $(this),
			$parent = e.parent(),
			$tab = e.parents('.ex-tab'),
			index = $parent.index();

		event.preventDefault();

		$parent.addClass('cur').siblings().removeClass('cur');

		var obj = $tab.find('.ex-tab-pane').eq(index);

		obj.addClass('active').siblings().removeClass('active');
	});

	// 翻页切换
	$('.ex-page li').on('click', function() {
		var e = $(this),
			index = e.index();

		e.addClass('active').siblings().removeClass('active');

		var obj = e.parents('.ex-tab-pane').find('.ex-tab-list').eq(index);

		obj.addClass('active').siblings().removeClass('active');
	});

	$('.prev').on('click', function() {
		var e = $(this),
			$parent = e.parent(),
			$index = $parent.find('li.active').index();

		if ($index === 0) {
			return false;
		} else {
			$parent.find('.ex-page li').eq($index - 1).trigger('click');
		}
	});

	$('.next').on('click', function() {
		var e = $(this),
			$parent = e.parent(),
			$index = $parent.find('li.active').index();

		if ($index === $parent.find('li').length - 1) {
			return false;
		} else {
			$parent.find('.ex-page li').eq($index + 1).trigger('click');
		}
	});
});