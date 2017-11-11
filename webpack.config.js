module.exports = {
  entry: './client/src/index.jsx',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/public'
  },

  devServer: {
    inline: true,
    port: 3000
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  }
}