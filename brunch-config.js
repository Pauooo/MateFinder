exports.config = {
  files: {
    stylesheets: {
      joinTo: 'css/app.css',
      order: {
        before: 'app/styles/reset.css',
      },
    },
    javascripts: {
      joinTo: 'js/app.js',
    },
  },
  plugins: {
    postcss: {
      processors: [require('autoprefixer')],
    },
  },
};
