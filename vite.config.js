import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

import path from 'node:path';

// https://vitejs.dev/config/

export default (args) => {
  // https://www.youtube.com/watch?v=Sgcfiow4fVQ
  const isProduction = args.mode === 'production';
  const generateScopedName = isProduction
    ? '[hash:base64:3]'
    : '[local]_[hash:base64:3]';

  // console.log(`Running ${args.mode} mode ...\n`);
  // console.log(args);

  return defineConfig({
    base: './',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        {
          find: '@css',
          replacement: path.resolve(__dirname, './src/assets/css'),
        },
        {
          find: '@js',
          replacement: path.resolve(__dirname, './src/assets/js'),
        },
        {
          find: '@context',
          replacement: path.resolve(__dirname, './src/context'),
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './src/components'),
        },
      ],
    },
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
      postcss: {
        plugins: [postcssCustomMedia(), postcssNesting()],
      },
    },
  });
};
