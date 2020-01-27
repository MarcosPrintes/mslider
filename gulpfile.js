
const { parallel, series ,src, dest, watch, task } = require('gulp');
var sass = require('gulp-sass');

function cssTask() {
	return src('./src/css/style.css')
	.pipe(sass({ outputStyle: 'compressed'}))
	.pipe(dest('./dist/styles'))
}

exports.default = function () {
	watch('./src/css/style.css', cssTask())
}

// exports.default = series(parallel(cssTask))