import babel from 'rollup-plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';

export default [
	{
		input: './src/index.jsx',
		output: [
			{
				file: 'dist/index.jsx',
				format: 'cjs',
			},
			{
				file: 'dist/index.es.js',
				format: 'es',
				exports: 'named'
			}
		],
		plugins: [
			postcss({
				plugins: [],
				minimize: true,
			}),
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-react']
			}),
			external(),
			resolve(),
			terser(),
			commonjs(),
		]
	}
]
