const { series, src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const del = require('delete');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const fs = require('fs');

const srcRoot = 'src';
const destRoot = 'docs';

const cssSrc = `${srcRoot}/css`;
const jsSrc = `${srcRoot}/js`;
const imgSrc = `${srcRoot}/img`;
const cssDest = `${destRoot}/css`;
const jsDest = `${destRoot}/js`;
const imgDest = `${destRoot}/img`;


function createFolderStructure(cb) {
  folders = [destRoot, cssDest, jsDest, imgDest];

  folders.forEach(dir => {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log('📁  folder created:', dir);
    }
  });

  cb();
}

function deployCss() {
  return src(`${cssSrc}/**/*.css`)
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(dest(`${cssDest}`));
}


function deployJs() {
  return src(`${jsSrc}/**/*.js`)
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(dest(`${jsDest}`));
}


function deployHtml() {
  return src(`${srcRoot}/**/*.html`)
    .pipe(dest(`${destRoot}`));
}


function deployResources() {
  return src([`${imgSrc}/**/*`])
    .pipe(dest(`${imgDest}`));
}


function clean() {
  return del([`${destRoot}/**/*`, `!${destRoot}`]);
  //, {read: false, allowEmpty: true})
  //  .pipe(del());
}


function build(cb) {
  series(createFolderStructure, parallel(deployCss, deployJs, deployResources, deployHtml))(cb);
}

exports.createFolderStructure = createFolderStructure;
exports.deployCss = deployCss;
exports.deployJs = deployJs;
exports.deployHtml = deployHtml;
exports.deployResources = deployResources;
exports.clean = clean;
exports.build = build;
exports.default = series(clean, build);