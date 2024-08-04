const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7004';

console.log(target);

const PROXY_CONFIG = [
  {
    context: [
       "/api/**",
    ],
    target,
    pathRewrite: {"^/api" : ""},
    changeOrigin:true,
    logLevel: "debug",
    secure: false
  }
]


module.exports = PROXY_CONFIG;
