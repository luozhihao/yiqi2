
var vm = new Vue({
	el: '#lession',
	data: {
		active: 1,
		lists: ['企业高级内训', '精品课程', '线下精英特训营', '公益演讲', '名师阵容', '绎奇动态']
	},
	mounted: function() {
		$('.my-slider').unslider({
			autoplay: true,
			arrows: false,
			delay: 6000
		});
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