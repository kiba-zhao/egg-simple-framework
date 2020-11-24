/**
 * @fileOverview 默认配置
 * @name config.default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const path = require('path');

module.exports = app => {

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


  exports.static = {
    prefix: '/docs/',
    dir: path.join(app.baseDir, 'app/docs'),
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000
  };

  return exports;

};
