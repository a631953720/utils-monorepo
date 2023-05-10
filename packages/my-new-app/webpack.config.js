const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // 當前端要用我寫好的winston logger實惠需要下面的設定
  // 下面的設定會處理程式碼在瀏覽器的runtime如何去引用lib
  // 但在fs的引用上不可行，因為瀏覽器無法操作檔案系統，因此推測無論如何取代都會有runtime error
  // 理論上前端也不會直接取用可能操作DB的lib，所以下面的設定就留作紀念吧

  // config.resolve.fallback = {
  //   os: require.resolve('os-browserify'),
  //   fs: require.resolve('fs'),
  //   // fs: false,
  //   zlib: require.resolve('browserify-zlib'),
  //   http: require.resolve('stream-http'),
  //   https: require.resolve('https-browserify'),
  //   path: require.resolve('path-browserify'),
  //   url: require.resolve('url'),
  //   stream: require.resolve('stream-browserify'),
  //   assert: require.resolve('assert/'),
  // };
  return config;
});
