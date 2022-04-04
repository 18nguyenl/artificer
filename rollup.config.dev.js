import json from '@rollup/plugin-json';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';
import path from 'path';
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
        }
    ],
    plugins: [del({ targets: "dist/**", runOnce: true }), alias({
        entries: [
            {
                find: "three",
                replacement: path.resolve("./node_modules/three"),
            }
        ]
    }), commonjs(), resolve({
        // pass custom options to the resolve plugin
        browser: true,
        moduleDirectories: ['node_modules'],
    }), typescript(), json()],
}