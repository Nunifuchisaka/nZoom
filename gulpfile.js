var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    concat = require("gulp-concat"),
    plumber = require("gulp-plumber"),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify");


/*
## browser sync
*/

gulp.task("browser-sync", function(){
  browserSync.init({
    proxy: "n-zoom.lcl:8888/demo/"
  });
});

gulp.task("bs-reload", function(){
  browserSync.reload();
});



/*
## scss
*/

gulp.task("scss_compile", function(){
  return gulp.src("src/scss/**/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 2 version", "iOS >= 8.1", "Android >= 4.4"],
      cascade: false
    }))
    .pipe(gulp.dest("dst"))
    .pipe(browserSync.stream());
});



/*
## javascript
*/

gulp.task("js_compile", function(){
  gulp.src([
      "src/js/110_header.js",
      "src/js/410_nZoom.js",
      "src/js/410_Carousel.js",
      "src/js/990_footer.js"
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("jquery.nZoom.js"))
    .pipe(gulp.dest("dst"))
    .pipe(uglify({output:{comments: /^!/}}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dst"))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: ".sourcemap"}))
    .pipe(gulp.dest("dst"));
});



/*
## watch
*/

gulp.task("default", ["browser-sync"], function(){
  
  gulp.watch("src/scss/**/*.scss", ["scss_compile"]);
  
  gulp.watch("src/js/**/*.js", ["js_compile"]);
  
  gulp.watch("demo/**/*.html", ["bs-reload"]);
  gulp.watch("demo/**/*.css", ["bs-reload"]);
  gulp.watch("demo/**/*.js", ["bs-reload"]);
  
});
