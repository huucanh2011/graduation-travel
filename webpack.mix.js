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
//   .sourceMaps()
  // .extract(["vue"])
  .sass("resources/sass/app.scss", "public/css");
