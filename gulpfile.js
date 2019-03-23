const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

gulp.task("default", ["copy-html", "copy-images", "styles"], function() {
  gulp.watch("sass/**/*.scss", ["styles"]);
  gulp.watch("./index.html", ["copy-html"]);
  gulp.watch("./dist/index.html").on("change", browserSync.reload);

  browserSync.init({
    server: "./dist"
  });
});

gulp.task("copy-html", function() {
  gulp.src("./index.html")
      .pipe(gulp.dest("dist"));
});

gulp.task("copy-images", function() {
  gulp.src("images/*")
      .pipe(gulp.dest("dist/images"));
});

gulp.task("styles", function() {
  gulp.src("sass/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ["last 2 versions"]
      }))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});
