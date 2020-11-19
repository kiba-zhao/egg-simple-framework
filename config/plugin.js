/**
 * @fileOverview 插件配置
 * @name plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.swagger = {
  enable: true,
  package: 'egg-swagger',
  env: [ 'local' ],
};

exports.httpError = {
  enable: true,
  package: 'egg-http-error',
};

exports.httpLogger = {
  enable: true,
  package: 'egg-http-logger',
  env: [ 'local', 'prod' ],
};

exports.paramsInject = {
  enable: true,
  package: 'egg-params-inject',

};

exports.routerSimple = {
  enable: true,
  package: 'egg-router-simple',
};