
var vm = new Vue({
	el: '#lession',
	mounted: function() {
		$('.my-slider').unslider({
			autoplay: false,
			arrows: false,
			delay: 6000
		});
	}
})