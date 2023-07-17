const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: "https://fpt.onrender.com:9000" || "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
