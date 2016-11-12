/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),

    isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window,
    c3ChartsArray = [],
    onloadCaptchaCallback,

    plugins = {
        pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
        smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
        bootstrapTooltip: $("[data-toggle='tooltip']"),
        bootstrapTabs: $(".tabs"),
        rdParallax: $(".rd-parallax"),
        rdAudioPlayer: $(".rd-audio"),
        rdVideoPlayer: $(".rd-video-player"),
        responsiveTabs: $(".responsive-tabs"),
        rdGoogleMaps: $("#rd-google-map"),
        rdInputLabel: $(".form-label"),
        rdNavbar: $(".rd-navbar"),
        rdVideoBG: $(".rd-video"),
        regula: $("[data-constraints]"),
        stepper: $("input[type='number']"),
        radio: $("input[type='radio']"),
        checkbox: $(".checkbox-custom"),
        toggles: $(".toggle-custom"),
        textRotator: $(".text-rotator"),
        owl: $(".owl-carousel"),
        swiper: $(".swiper-slider"),
        counter: $(".counter"),
        photoSwipeGallery: $("[data-photo-swipe-item]"),
        flickrfeed: $(".flickr"),
        twitterfeed: $(".twitter"),
        progressBar: $(".progress-linear"),
        circleProgress: $(".progress-bar-circle"),
        isotope: $(".isotope"),
        countDown: $(".countdown"),
        stacktable: $("table[data-responsive='true']"),
        customToggle: $("[data-custom-toggle]"),
        customWaypoints: $('[data-custom-scroll-to]'),
        resizable: $(".resizable"),
        selectFilter: $("select"),
        calendar: $(".rd-calendar"),
        productThumb: $(".product-thumbnails"),
        imgZoom: $(".img-zoom"),
        facebookfeed: $(".facebook"),
        pageLoader: $(".page-loader"),
        search: $(".rd-search"),
        searchResults: $('.rd-search-results'),
        rdMailForm: $(".rd-mailform"),
        iframeEmbed: $("iframe.embed-responsive-item"),
        bootstrapDateTimePicker: $("[data-time-picker]"),
        checkoutRDTabs: $(".checkout-tabs"),
        higCharts: {
            charts: $(".higchart"),
            legend: $(".chart-legend")
        },
        d3Charts: $('.d3-chart'),
        flotCharts: $('.flot-chart'),
        captcha: $('.recaptcha'),
        galleryRDTabs: $(".gallery-tabs")
    };

/**
 * Initialize All Scripts
 */
$document.ready(function() {

    /**
     * Swiper 3.1.7
     * @description  Enable Swiper Slider
     */
    if (plugins.swiper.length) {
        plugins.swiper.each(function() {
            var s = $(this);

            var pag = s.find(".swiper-pagination"),
                next = s.find(".swiper-button-next"),
                prev = s.find(".swiper-button-prev"),
                bar = s.find(".swiper-scrollbar"),
                h = getSwiperHeight(plugins.swiper, "height"),
                mh = getSwiperHeight(plugins.swiper, "min-height"),
                parallax = s.parents('.rd-parallax').length;

            s.find(".swiper-slide")
                .each(function() {
                    var $this = $(this),
                        url;

                    if (url = $this.attr("data-slide-bg")) {
                        $this.css({
                            "background-image": "url(" + url + ")",
                            "background-size": "cover"
                        })
                    }

                })
                .end()
                .find("[data-caption-animate]")
                .addClass("not-animated")
                .end()
                .swiper({
                    autoplay: s.attr('data-autoplay') === "true" ? 5000 : false,
                    direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
                    effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
                    speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
                    keyboardControl: s.attr('data-keyboard') === "true",
                    mousewheelControl: s.attr('data-mousewheel') === "true",
                    mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
                    nextButton: next.length ? next.get(0) : null,
                    prevButton: prev.length ? prev.get(0) : null,
                    pagination: pag.length ? pag.get(0) : null,
                    simulateTouch: false,
                    paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
                    paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function(index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    } : null : null,
                    scrollbar: bar.length ? bar.get(0) : null,
                    scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
                    scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
                    loop: s.attr('data-loop') !== "false",
                    loopAdditionalSlides: 0,
                    loopedSlides: 0,
                    onTransitionStart: function(swiper) {
                        toggleSwiperInnerVideos(swiper);
                    },
                    onTransitionEnd: function(swiper) {
                        toggleSwiperCaptionAnimation(swiper);
                        $(window).trigger("resize");
                    },

                    onInit: function(swiper) {
                        if (plugins.pageLoader.length) {
                            var srcFirst = $("#page-loader").attr("data-slide-bg"),
                                image = document.createElement('img');

                            image.src = srcFirst;
                            image.onload = function() {
                                plugins.pageLoader.addClass("loaded");
                            };
                        }
                        toggleSwiperInnerVideos(swiper);
                        toggleSwiperCaptionAnimation(swiper);

                        // Create parallax effect on swiper caption
                        s.find(".swiper-parallax")
                            .each(function() {
                                var $this = $(this),
                                    speed;

                                if (parallax && !isIE && !isMobile) {
                                    if (speed = $this.attr("data-speed")) {
                                        makeParallax($this, speed, s, false);
                                    }
                                }
                            });
                        /*$(window).on('resize', function () {
                          swiper.update(true);
                        })*/
                    },
                    onSlideChangeStart: function(swiper) {
                        var activeSlideIndex, slidesCount, thumbsToShow = 3;

                        activeSlideIndex = swiper.activeIndex;
                        slidesCount = swiper.slides.not(".swiper-slide-duplicate").length;

                        //If there is not enough slides
                        if (slidesCount < thumbsToShow)
                            return false;

                        //Fix index count
                        if (activeSlideIndex === slidesCount + 1) {
                            activeSlideIndex = 1;
                        } else if (activeSlideIndex === 0) {
                            activeSlideIndex = slidesCount;
                        }

                        //Lopp that adds background to thumbs
                        for (var i = -thumbsToShow; i < thumbsToShow + 1; i++) {
                            if (i === 0)
                                continue;

                            //Previous btn thumbs
                            if (i < 0) {
                                //If there is no slides before current
                                if ((activeSlideIndex + i - 1) < 0) {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[slidesCount + i + 1].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-prev .preview__img-' + Math.abs(i))
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }

                                //Next btn thumbs
                            } else {
                                //If there is no slides after current
                                if (activeSlideIndex + i - 1 > slidesCount) {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[i].getAttribute("data-preview-bg") + ")");
                                } else {
                                    $(swiper.container).find('.swiper-button-next .preview__img-' + i)
                                        .css("background-image", "url(" + swiper.slides[activeSlideIndex + i].getAttribute("data-preview-bg") + ")");
                                }
                            }
                        }
                    },
                });

            /*      $(window)
                      .on("resize", function () {
                        var mh = getSwiperHeight(s, "min-height"),
                            h = getSwiperHeight(s, "height");
                        if (h) {
                          s.css("height", mh ? mh > h ? mh : h : h);
                        }
                      })
                      .load(function () {
                        s.find("video").each(function () {
                          if (!$(this).parents(".swiper-slide-active").length) {
                            this.pause();
                          }
                        });
                      }).trigger("resize");*/
        });
    }

    /**
     * getSwiperHeight
     * @description  calculate the height of swiper slider basing on data attr
     */
    function getSwiperHeight(object, attr) {
        var val = object.attr("data-" + attr),
            dim;
        if (!val) {
            return undefined;
        }

        dim = val.match(/(px)|(%)|(vh)$/i);

        if (dim.length) {
            switch (dim[0]) {
                case "px":
                    return parseFloat(val);
                case "vh":
                    return $(window).height() * (parseFloat(val) / 100);
                case "%":
                    return object.width() * (parseFloat(val) / 100);
            }
        } else {
            return undefined;
        }
    }

    /**
     * toggleSwiperInnerVideos
     * @description  toggle swiper videos on active slides
     // */
    function toggleSwiperInnerVideos(swiper) {
        var videos;

        $.grep(swiper.slides, function(element, index) {
            var $slide = $(element),
                video;

            if (index === swiper.activeIndex) {
                videos = $slide.find("video");
                if (videos.length) {
                    videos.get(0).play();
                }
            } else {
                $slide.find("video").each(function() {
                    this.pause();
                });
            }
        });
    }


    /**
     * toggleSwiperCaptionAnimation
     * @description  toggle swiper animations on active slides
     */
    function toggleSwiperCaptionAnimation(swiper) {
        if (isIE && isIE < 10) {
            return;
        }

        var prevSlide = $(swiper.container),
            nextSlide = $(swiper.slides[swiper.activeIndex]);

        prevSlide
            .find("[data-caption-animate]")
            .each(function() {
                var $this = $(this);
                $this
                    .removeClass("animated")
                    .removeClass($this.attr("data-caption-animate"))
                    .addClass("not-animated");
            });

        nextSlide
            .find("[data-caption-animate]")
            .each(function() {
                var $this = $(this),
                    delay = $this.attr("data-caption-delay");

                setTimeout(function() {
                    $this
                        .removeClass("not-animated")
                        .addClass($this.attr("data-caption-animate"))
                        .addClass("animated");
                }, delay ? parseInt(delay) : 0);
            });
    }

    /**
     * makeParallax
     * @description  create swiper parallax scrolling effect
     */
    function makeParallax(el, speed, wrapper, prevScroll) {
        var scrollY = window.scrollY || window.pageYOffset;

        if (prevScroll != scrollY) {
            prevScroll = scrollY;
            el.addClass('no-transition');
            el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
            el.height();
            el.removeClass('no-transition');

            if (el.attr('data-fade') === 'true') {
                var bound = el[0].getBoundingClientRect(),
                    offsetTop = bound.top * 2 + scrollY,
                    sceneHeight = wrapper.outerHeight(),
                    sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
                    layerDevider = offsetTop + el.outerHeight() / 2.0,
                    pos = sceneHeight / 6.0,
                    opacity;
                if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
                    el[0].style["opacity"] = 1;
                } else {
                    if (sceneDevider - pos < layerDevider) {
                        opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
                    } else {
                        opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
                    }
                    el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
                }
            }
        }
    }
});
