import autoprefixer from 'autoprefixer';
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [autoprefixer, postcssJitProps(OpenProps)]
};

module.exports = config;
