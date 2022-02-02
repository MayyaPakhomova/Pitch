const { src, dest, series, watch, registry } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dest"]);
};

const fonts = () => {
  return src("src/fonts/**").pipe(dest("dest/fonts"));
};

const config = {
  shape: {
    dimension: {
      maxWidth: 300,
      maxHeight: 300,
    },
    spacing: {
      padding: 0,
    },
  },
  mode: {
    stack: {
      sprite: "../sprite.svg",
    },
  },
};
const svgSprites = () => {
  return src("src/img/svg/*.svg")
    .pipe(svgSprite(config))
    .pipe(dest("dest/images"));
};
const imagesDev = () => {
  return src(["src/img/**/*.jpg", "src/img/**/*.png", "src/img/**/*.jpeg"])
    .pipe(image())
    .pipe(dest("dest/images"));
};

const stylesDev = () => {
  return (
    src("src/css/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write("./"))
      .pipe(dest("dest/style"))
      .pipe(browserSync.stream())
  );
};

const htmlMinifyDev = () => {
  return src("src/**/*.html").pipe(dest("dest")).pipe(browserSync.stream());
};
const scriptsDev = () => {
  return src(["src/js/index.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dest/js"))
    .pipe(browserSync.stream());
};

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: "dest",
    },
  });
};
watch("src/**/*.html", htmlMinifyDev);
watch("src/css/**/*.scss", stylesDev);
watch("src/images/svg/**/*.svg", svgSprites);
watch("src/js/**/*.js", scriptsDev);
watch("src/fonts/**", fonts);

exports.clean = clean;
exports.svgSprites = svgSprites;

exports.dev = series(
  clean,
  fonts,
  htmlMinifyDev,
  scriptsDev,
  stylesDev,
  svgSprites,
  imagesDev,
  watchFilesDev,
);

const imagesBuild = () => {
  return src(["src/img/**/*.jpg", "src/img/**/*.png", "src/img/**/*.jpeg"])
    .pipe(image())
    .pipe(dest("dest/images"));
};

const stylesBuild = () => {
  return  (src("src/css/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest("dest/style")));
};
const htmlMinifyBuild = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dest"));
};
const scriptsBuild = () => {
  return src(["src/js/index.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(dest("dest/js"))
};
exports.build = series(
  clean,
  fonts,
  htmlMinifyBuild,
  scriptsBuild,
  stylesBuild,
  imagesBuild,
  svgSprites,
);
