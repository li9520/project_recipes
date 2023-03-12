const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  //Заменяем в нашей функции style-loader на mini-css-extract-plugin
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    //Добавим плагин в plugins
    new MiniCssExtractPlugin({
      // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        // если файл заканчивается на .css,  то вебпак должен обрабатывать его с помощью двух лоадеров,
        //при это очень важна последовательность применяемых лоадеров сначала применяется css-loader,
        // чтобы обработать все импортируемые стили и потом style-loader, который вставит указанные стили
        //в тег style
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_moduls/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      styles: path.join(srcPath, 'styles'),
      utils: path.join(srcPath, 'utils'),
      store: path.join(srcPath, 'store'),
      pages: path.join(srcPath, 'App/pages'),
      appComponents: path.join(srcPath, 'App/components'),
    },
  },
  devServer: {
    host: '127.0.0.1', // хост нашего сервера
    port: 9000, // порт по которому к нему можно обращаться
    hot: true, // подключение Hot Module Replacement.
    historyApiFallback: true, //чтобы сборка не падала и отображала нужную страницу, когда возвращается страница 404.
  },
};
