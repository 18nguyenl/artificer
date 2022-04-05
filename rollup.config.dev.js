import json from '@rollup/plugin-json';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';
import path from 'path';
import * as tsconfig from './tsconfig.json';
// import babel from '@rollup/plugin-babel';

function resolveAliases() {
    return Object.entries(
        tsconfig.compilerOptions.paths
    ).map(([find, [replacement]]) => ({ find, replacement }));
}

export default {
    input: 'src/index.ts',
    treeshake: false,
    globals: p => /^three/.test(p) ? 'THREE' : null,
    external: p => /^three/.test(p),
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
    plugins: [del({ targets: "dist/**", runOnce: true }), commonjs(), resolve({
        // pass custom options to the resolve plugin
        browser: true,
        moduleDirectories: ['node_modules'],
    }), alias({
        resolve: ['ts'],
        entries: resolveAliases(),
    }), typescript(), json()],
}