const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

// proxy 미들웨어 설치 없이 단순히 package.json의 dependecy에 "proxy": "http://localhost:5000"해도 됨
