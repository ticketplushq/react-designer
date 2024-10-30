const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const umdConfig = {
  mode: 'production',
  entry: './src/designer/index.js',
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    filename: 'index.umd.js',
    path: path.resolve(__dirname, 'lib'),
    library: {
      name: '@ticketplushq/react-designer',
      type: 'umd',
    },
    globalObject: 'this', // Asegurarse de que sea compatible con el entorno global
  },
  externals: {
    react: 'React', // Indica que React debe buscarse en el contexto global
    'react-dom': 'ReactDOM',
  },
}

module.exports = umdConfig
