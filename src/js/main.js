import swiper from 'swiper'
import clipboard from 'clipboard'

// 初始化动画函数
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});


$(document).ready(() => {
    // 平滑滚动
    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                        scrollTop: targetOffset
                    },
                    500);
                return false;
            }
        }
    });

    var isPC = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    var checkScroll = function (itemDom) {
        //滚动条高度+视窗高度 = 可见区域底部高度
        var visibleBottom = window.scrollY + document.documentElement.clientHeight;
        //可见区域顶部高度
        var visibleTop = window.scrollY;

        var domTop = itemDom.offset().top
        var domBottom = itemDom.offset().top + itemDom.height()
        var show = domTop < visibleBottom && domBottom > visibleTop;
        if (show) {
            return true
        } else {
            return false
        }
    }

    // 语言切换
    $(document).on('click', '.switch-lng', function () {
        $('.drop-box').show()
        $(':not(.drop-box)').one('click', function () {
            $('.drop-box').hide()
        })
    })

    const mySwiper = new swiper('.swiper-container', {
        // direction: '',
        loop: true,
        autoplay: true,
        delay: 3000,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    // 顶部菜单点击
    $(document).on('click', '.ham', function () {
        $('.top').toggleClass('open')
        $(this).toggleClass('open')
        $('.menu-wrap').toggleClass('d-none')
        if ($(this).hasClass('open')) {
            $('.menus .item').animateCss('fadeInLeft')
        } else {
            $('.menus .item').animateCss('fadeOutLeft')
        }
    })

    // 顶部菜单点击
    $('.menus .item').on('click', function () {
        $('.top').removeClass('open')
        $('.ham').removeClass('open')
        $('.menu-wrap').addClass('d-none')
    })

    // 滚动监测
    $(window).on('scroll', function (event) {
        // 顶部显示
        if (window.scrollY > 0) {
            $('.top').removeClass('hidden')
        } else {
            $('.top').addClass('hidden')
        }

        $('.effect').each(function () {
            if (checkScroll($(this))) {
                $(this).animateCss('zoomIn')
                $(this).removeClass('effect')
            }
        })
    })

    // 剪贴板复制
    var clip = new clipboard('.clip')

    clip.on('success', function (e) {

    })

    clip.on('error', function (e) {
        console.log(e);
    });

    let pop = $('.clip').popover().on('shown.bs.popover', function () {
        setTimeout(function () {
            pop.popover('hide')
        }, 1000)

    })

})
