import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [postcssImport, autoprefixer, postcssJitProps(OpenProps)]
};

export default config;
