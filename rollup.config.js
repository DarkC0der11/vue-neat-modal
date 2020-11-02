import path from 'path'
import typescript from 'rollup-plugin-typescript'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import alias from '@rollup/plugin-alias'
import pkg from './package.json'

const inputFile = 'src/index.ts'

const plugins = [
  typescript({
    tsconfig: './tsconfig.json'
  }),
  babel({
    extensions: ['.jsx', '.tsx', '.ts', '.js']
  }),
  alias({
    entries: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }),
  scss({
    output: 'dist/vue-neat-modal.css'
  })
]

export default [
  {
    input: inputFile,
    output: {
      format: 'cjs',
      file: pkg.main
    },
    plugins,
    external: ['vue']
  },
  {
    input: inputFile,
    output: {
      format: 'esm',
      file: pkg.module
    },
    plugins,
    external: ['vue']
  }
]
