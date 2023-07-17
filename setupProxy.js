const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: process.env.URL_BACKEND || "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
