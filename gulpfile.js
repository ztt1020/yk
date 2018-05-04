var gulp = require("gulp");

var server = require("gulp-webserver");

var url = require("url");

var data = require("./src/data/data.json");
var detail = require("./src/data/detail.json");

gulp.task("default", function() {
    gulp.src("src")
        .pipe(server({
            port: 9999,
            livereload: true,
            middleware: function(req, res, next) {

                if (/\/api\/index/g.test(req.url)) {
                    var type = url.parse(req.url, true).query.type;

                    res.end(JSON.stringify(data[type]))
                } else if (/\/api\/detail/g.test(req.url)) {
                    var id = url.parse(req.url, true).query.id;
                    var list = detail.detailList;
                    var target = {};
                    for (var i = 0; i < list.length; i++) {
                        if (id == list[i].id) {
                            target = list[i];
                        }
                    }
                    res.end(JSON.stringify(target));
                }
                next()
            }
        }))
})