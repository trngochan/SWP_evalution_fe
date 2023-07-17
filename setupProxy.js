const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: "https://fpt.onrender.com" || "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
