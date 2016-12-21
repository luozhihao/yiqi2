
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
	},
	methods: {

		// 激活导航
		isActive: function(index) {
			this.active = index + 1;
		},

		// 添加动画
		addflip: function(index) {
			this.teachers.forEach(function(e, i) {
				e.flipInY = false;
			});

			this.teachers[index].flipInY = true;
		}
	},
	watch: {
		active: function(val) {
			if (val !== 1) {
				$('.unslider-nav').addClass('hide');
			} else {
				$('.unslider-nav').removeClass('hide');
			}
		}
	}
})