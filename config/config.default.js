/**
 * @fileOverview 默认配置
 * @name config.default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const path = require('path');

module.exports = appInfo => {

  const exports = {};

  exports.security = {
    xframe: {
      enable: false,
    },
    // See https://eggjs.org/zh-cn/core/security.html#安全威胁csrf的防范
    csrf: {
      enable: false,
    },
  };

  exports.customLoader = {
    httpApi: {
      directory: 'app/http',
      inject: 'app',
      loadunit: true,
      caseStyle: 'upper',
    },
  };

  exports.rabbitmq = {
    client: {
      url: 'amqp://guest:guest@localhost:5672',
    },
  };

  exports.sequelize = {
    dialect: 'mysql',
    connectionUri: `mysql://root:example@localhost:3306/${appInfo.name}`,
  };

  exports.redis = {
    client: {
      host: 'localhost',
      port: 6379,
      password: 'auth',
      db: 0,
    },
  };
  return exports;

};
