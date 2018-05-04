require(['jquery', 'handlebars'], function($, handlebars) {
    var url = location.search;
    var params = {};

    if (url.indexOf("?") != -1) {
        var arr = url.slice(1).split("&");
        for (var i = 0, len = arr.length; i < len; i++) {
            var obj = arr[i].split("=");
            params[obj[0]] = obj[1]
        }
    }

    console.log(params);

    $.ajax({
        url: '/api/detail?id=' + params.id,
        dataType: 'json',
        success: function(res) {
            console.log(res);
        },
        error: function(error) {
            console.log(error)
        }
    })
})