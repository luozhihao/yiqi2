/**
 * author: luozh
 * time: 2016-11-05
 * version: 1.0.0
 */

$(function() {

    // $('#fullpage').fullpage();
    
    // 鼠标移入课程图片效果
    $('.lession-img').hover(function() {
        $(this).parent().find('.l-box').addClass('bounce animated');
    }, function() {
        $(this).parent().find('.l-box').removeClass('bounce animated');
    })
    
    // 导航定位
    $(document).on('click', '.nav > li > a', function (e) {
        var target = $(this).attr('data-target');

        if (target) {
            e.preventDefault();

            var top = $('#' + target).offset().top;

            $("html, body").animate({ scrollTop: top }, 500, 'swing');
        }
    });

    // 计算满屏高度
    (function () {
        var h = $(window).height();

        $('.section').height(h < 700 ? 700 : h);
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

    // 桌面晃动
    (function () {
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
    })();

    // 课程晃动
    (function () {
        var scene2 = document.getElementById('lession');
        var parallax2 = new Parallax(scene2);
    })();

    // 百度地图
    (function () {

        // 百度地图API功能
        var sContent ="中央金地广场";
        var map = new BMap.Map("l-map");
        var point = new BMap.Point(118.77, 32);

        map.centerAndZoom(point, 10);

        var local = new BMap.LocalSearch(map, {
            renderOptions: {map: map, panel: "r-result"}
        });

        local.search("中央金地广场");
    })();
});