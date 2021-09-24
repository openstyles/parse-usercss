import cjs from 'rollup-plugin-cjs-es';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

function base({
  output = {},
  plugins = []
}) {
  return {
    input: 'index.js',
    output: {
      format: 'iife',
      name: 'usercssMeta',
      freeze: false,
      ...output
    },
    plugins: [
      resolve({
        browser: true
      }),
      cjs({
        nested: true
      }),
      ...plugins
    ]
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  base({
    output: {
      file: 'dist/usercss-meta.js'
    }
  }),
  base({
    output: {
      file: 'dist/usercss-meta.min.js'
    },
    plugins: [
      terser({
        compress: {
          passes: 3
        }
      })
    ]
  })
];
