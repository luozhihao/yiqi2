
var vm = new Vue({
	el: '#lession',
	data: {
		active: 1,
		lists: ['企业高级内训', '精品课程', '公益演讲', '线下精英特训营', '名师阵容', '绎奇动态'],
		teachers: [{
			name: '陆长淼',
			honor: '金牌讲师',
			leader: '绎奇传媒设计总监',
			intro: '精通版式设计、配色设计、动画制作等，累计PPT设计达2000多页，积累了大量的行业经验',
			flipInY: false
		}, {
			name: '胡必洋',
			honor: '资深讲师',
			leader: '绎奇传媒设计总监',
			intro: '精通版式设计、配色设计、动画制作等，累计PPT设计达2000多页，积累了大量的行业经验',
			flipInY: false
		}, {
			name: '彭祥和',
			honor: '资深讲师',
			leader: '绎奇传媒设计总监',
			intro: '精通版式设计、配色设计、动画制作等，累计PPT设计达2000多页，积累了大量的行业经验',
			flipInY: false
		}]
	},
	mounted: function() {
		
		// 轮播
		$('.my-slider').unslider({
			autoplay: true,
			arrows: false,
			delay: 6000
		});

		// 图片晃动
		var scene = document.getElementById('speeking');
		var parallax = new Parallax(scene);

		// 分享动画
		$('.le-share-item').hover(function() {
			var box = $(this).find('.box');

			box.stop().animate({
				width: box.attr('data-width')
			}, 200);
		}, function() {
			var box = $(this).find('.box');

			box.stop().animate({
				width: 0
			}, 200);
		})

		this.moveScreen();

		// 客服QQ
		var qq_kefu = "3348656075";

		$(".qq-kefu").on('click', function(){
    		var url = "http://wpa.qq.com/msgrd?v=3&uin="+qq_kefu+"&Site=绎奇传媒&Menu=yes";
    		window.open(url);
		});

		// 获取激活导航
		if (location.search) {
			var active = location.search.split('=')[1];

			this.active = parseInt(active);
			location.hash='#lession';
		}
	},
	methods: {

		// 激活导航
		isActive: function(index) {
			this.active = index + 1;
		},

		// 添加动画
		addflip: function(index) {
			this.clearflip();

			this.teachers[index].flipInY = true;
		},

		// 清空动画
		clearflip: function() {
			this.teachers.forEach(function(e, i) {
				e.flipInY = false;
			});
		},

		// 电脑屏幕切换
		moveScreen: function() {
			var obj = $('.course-scroll .scroll'),
				len = obj.find('li').length,
				i = 1,
				time = null;

			clearInterval(time);

			time = setInterval(function () {
				if (i <= len - 1) {
					obj.stop().animate({
						top: (-185 * i) + 'px'
					}, 800);
				} else {
					i = 0;

					obj.stop().animate({
						top: '0px'
					}, 800);
				}

				i++;
			}, 4000);
		}
	},
	watch: {
		active: function(val) {
			if (val !== 1) {
				$('.unslider-nav').addClass('hide');
			} else {
				$('.unslider-nav').removeClass('hide');
			}

			if (val === 5) {
				this.clearflip();
			}
		}
	}
})