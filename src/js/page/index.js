require(['jquery', 'swiper', 'iScroll', 'handlebars'], function($, swiper, iScroll, handlebars) {
    var type = "recommed"; //默认给推荐

    //点击类别
    $(".nav").on("click", "li", function() {
        type = $(this).attr("data-type");
        $(this).addClass("active").siblings().removeClass("active")
        getData(type);
    })
    //实例化iscroll

    var navItemW = $(".nav li").outerWidth(true);
    var length = $(".nav li").length;
    $(".nav").css("width", navItemW * length + "px");

    var navScroll = new iScroll(".nav-wrap", {
        scrollX: true,
        scrollY: false,
        click: true
    })


    function getData(type) {
        $.ajax({
            url: '/api/index?type=' + type,
            dataType: 'json',
            success: function(res) {

                render(res)
                
            },
            error: function(error) {
                console.wran(error)
            }
        })
    }



    function render(res) {
        var swiperTpl = $("#list").html();

        var template = handlebars.compile(swiperTpl);
        var swiperArr = res.swiper ? res.swiper : [];

        var html = template(swiperArr);

        $(".content").html(html);
    }

    function initPage() {
        getData(type)
    }

    initPage()

})