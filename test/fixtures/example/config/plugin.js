/**
 * @fileOverview 插件配置
 * @name plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.rabbitmq = {
  enable: false,
  package: 'egg-rabbitmq',
};

exports.redis = {
  enable: false,
  package: 'egg-redis',
};

exports.sequelize = {
  enable: false,
  package: 'egg-sequelize',
};
