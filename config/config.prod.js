/**
 * @fileOverview 生产配置
 * @name config.prod.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const SEMICOLON = ';';

function dsnGen(dsn) {
  if (!dsn) { return {}; }
  const {
    hostname, port, username
    , password, pathname,
  } = new URL(dsn);
  return { host: hostname, port, username, password, database: pathname.substr(1) };
}


function redisGen(dsn) {
  const { database, ...opts } = dsnGen(dsn);
  return { ...opts, db: parseInt(database) };
}

function getEnv(env, defaultVal) {
  return env && env.length > 0 ? env : defaultVal;
}

module.exports = () => {

  const exports = {};

  // rabbitmq
  exports.rabbitmq = {
    clients: {
      producer: {
        url: getEnv(process.env.RABBITMQ_PRODUCER_DSN, process.env.RABBITMQ_DSN),
      },
      consumer: {
        url: getEnv(process.env.RABBITMQ_CONSUMER_DSN, process.env.RABBITMQ_DSN),
      },
    },
  };

  // mysql
  const DB_READ_DSN = getEnv(process.env.DB_READ_DSN);
  const DB_WRITE_DSN = getEnv(process.env.DB_WRITE_DSN);
  const DB_DSN = getEnv(process.env.DB_DSN);
  if (DB_READ_DSN || DB_WRITE_DSN) {
    const pool_max = parseInt(getEnv(process.env.DB_POOL_MAX, 5));
    exports.sequelize = {
      connectionUri: undefined,
      replication: {
        read: DB_READ_DSN ? DB_READ_DSN.split(SEMICOLON).map(dsnGen) : dsnGen(DB_DSN),
        write: dsnGen(DB_WRITE_DSN || DB_DSN),
      },
      pool: {
        max: isNaN(pool_max) ? 5 : pool_max,
      },
    };

  } else {
    exports.sequelize = {
      connectionUri: process.env.DB_DSN,
    };
  }

  // redis
  const REDIS_DSN = getEnv(process.env.REDIS_DSN);
  const REDIS_CLUSTER = getEnv(process.env.REDIS_CLUSTER);
  if (REDIS_CLUSTER) {
    exports.redis = {
      client: {
        cluster: true,
        nodes: REDIS_CLUSTER ? REDIS_CLUSTER.split(SEMICOLON).map(redisGen) : redisGen(REDIS_DSN),
        scaleReads: getEnv(process.env.REDIS_SCALEREADS, 'slave'),
      },
    };
  } else if (REDIS_DSN) {
    exports.redis = {
      client: redisGen(REDIS_DSN),
    };
  }

  return exports;

};
