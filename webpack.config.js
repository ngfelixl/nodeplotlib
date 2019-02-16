const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  entry: {
    'nodeplotlib.min': './src/www/script.ts'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    /* minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        include: /\.min\.js$/
      })
    ] */
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Nodeplotlib',
      template: './src/www/index.html'
    })
  ],
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'www'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'nodeplotlib',
    umdNamedDefine: true
  }
},
{
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.json"
          }
        },
        exclude: [/node_modules/, /src\/www/]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    // new DtsBundlePlugin('lib-esm')
  ],
  target: 'node',
  name: 'nodeplotlib',
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  node: {
    __dirname: false
  }
},
/* {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: [/node_modules/, /src\/www/],
      }
    ]
  },
  output: {
    filename: './lib/index.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  name: 'nodeplotlib',
  resolve: {
    extensions: [ '.ts', '.js' ]
  }
}*/
];


/* function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');
    dts.bundle({
      name: 'nodeplotlib',
      main: `dist/lib-esm/index.d.ts`,
      out: `index.d.ts`,
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
    
    // Delete unneeded files
    
  });
}; */