
var vm = new Vue({
	el: '#lession',
	mounted: function() {
		$('.my-slider').unslider({
			autoplay: true,
			arrows: false,
			delay: 6000
		});
	}
})