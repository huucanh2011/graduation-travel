const mix = require("laravel-mix");

mix.webpackConfig({
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "resources/js")
    }
  }
});

mix
  .js("resources/js/app.js", "public/js")
  .sourceMaps()
  // .extract(["vue"])
  .less("resources/js/assets/less/app.less", "public/css");
