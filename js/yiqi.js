/**
 * author: luozh
 * time: 2016-11-05
 * version: 1.0.0
 */

$(function() {

    // $('#fullpage').fullpage();
    
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
    
    // 鼠标移入课程图片效果
    $('.lession-img').hover(function() {
        $(this).parent().find('.l-box').addClass('bounce animated');
    }, function() {
        $(this).parent().find('.l-box').removeClass('bounce animated');
    })

    // 定时轮播
    setInterval(function () {
        $('.swiper-button-next').trigger('click');
    }, 10000);
    
    // 导航定位
    $(document).on('click', '.nav > li > a', function (e) {
        var target = $(this).attr('data-target'),
            w = $(window).width();

        if (target) {
            e.preventDefault();

            var top = $('#' + target).offset().top;

            if (w > 1023) {
                $("html, body").animate({ scrollTop: top }, 500, 'swing');
            } else {
                $("html, body").animate({ scrollTop: top - 81 }, 500, 'swing');
            }            
        }
    });

    // 计算满屏高度
    (function () {
        var fullFn = function(full) {
            $('.banner .contents').height(full - 81);
        }

        function fullScreen (fullFn) {
            var h = $(window).height(),
                $sect = $('.section');

            if (h < 700) {
                $sect.height(700);
            } else if (h > 1800) {
                $sect.height(1800);
            } else {
                $sect.height(h);
            }

            setTimeout(function() {
                var full = $('.section').css('height');

                fullFn(full);
            }, 1000);
        }

        fullScreen(fullFn);
    })();

    // 数字跳动
    (function () {
        function countFn (count, num, obj, final, time, span) {
            var timespan = (span ? time * span : time);

            count = setInterval(function () {
                if (!span) {
                    num++
                } else {
                    num = num + span;
                } 

                obj.text(num);

                if (num >= final) {
                    clearInterval(count);
                    count = null;
                }
            }, timespan);
        }

        // 动态数字效果
        function increase () {

            // 执行总时间
            var total = 2300;

            // 最终数字
            var final1 = 88,
                final2 = 197,
                final3 = 386,
                final4 = 1000;

            // 一次执行时间
            var time1 = total / final1,
                time2 = total / final2,
                time3 = total / final3,
                time4 = total / final4;

            // 初始化数字
            var num1 = 0,
                num2 = 0,
                num3 = 0,
                num4 = 0;

            // 初始化定时器
            var count1 = null,
                count2 = null,
                count3 = null,
                count4 = null;

            countFn(count1, num1, $('.count1'), final1, time1);
            countFn(count2, num2, $('.count2'), final2, time2);
            countFn(count3, num3, $('.count3'), final3, time3);
            countFn(count4, num4, $('.count4'), final4, time4, 10);
        }

        // 单例模式
        var setCount = (function() {
            
            // 是否执行过数字动画
            var iscount = false;

            return function() {
                if (!iscount) {
                    increase();

                    iscount = true;
                }

                return iscount
            }
        })();

        // 判断是否执行数字动画
        $(window).scroll(function () {
            if ($(window).scrollTop() > $(window).height()) {
                setCount();
            }
        });
    })();

    // 背景晃动
    (function () {
        var w = $(window).width() / 2,
            h = $(window).height() / 2;

        $('#partner, #contact, #member').mousemove(function(e) {
            var x = 50 + (e.clientX - w) / 50;
            
            var y = 50 + (e.clientY - h) / 50;

            $(this).css('background-position', x + '% ' + y + '%');
        });
    })();

    // 桌面课程晃动
    (function () {
        if ($(window).width() >= 640) {
            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene);

            var scene2 = document.getElementById('lession');
            var parallax2 = new Parallax(scene2);
        }
    })();

    // 回到顶部
    $(".go-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    // 首页轮播
    (function() {
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
    })();
});
