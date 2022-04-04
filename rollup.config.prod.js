import json from '@rollup/plugin-json';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
// import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.ts',
    external: ["three", "anime"],
    output: [
        {
            file: 'dist/artificer.mjs',
            sourcemap: true,
            format: 'esm',
        },
        {
            file: 'dist/artificer.cjs',
            sourcemap: true,
            format: 'cjs',
        },
        {
            file: 'dist/artificer.js',
            format: 'iife',
            name: 'artificer',
            sourcemap: true,
        },
        {
            file: 'dist/artificer.min.mjs',
            sourcemap: true,
            plugins: [terser()],
            format: 'esm',
        },
        {
            file: 'dist/artificer.min.cjs',
            sourcemap: true,
            plugins: [terser()],
            format: 'cjs',
        },
        {
            file: 'dist/artificer.min.js',
            format: 'iife',
            name: 'artificer',
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [del({ targets: "dist/**", runOnce: true }), commonjs(), resolve({
        // pass custom options to the resolve plugin
        browser: true,
        moduleDirectories: ['node_modules'],
    }), typescript(), json()],
}