
var vm = new Vue({
	el: '#lession',
	data: {
		active: 1,
		lists: ['企业高级内训', '精品课程', '公益演讲', '线下精英特训营', '名师阵容', '绎奇动态']
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
		isActive: function(index) {
			this.active = index + 1;
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