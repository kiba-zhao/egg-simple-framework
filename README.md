# simple-framework

简易http应用框架

## Install

```bash
$ npm install git://github.com:kiba-zhao/egg-simple-framework.git --save
```

## Configuration

```js
// {app_root}/package.json
{
  "egg": {
    "framework": "simple-framework"
  }
}
```

## 包含插件说明 ##

* [egg-swagger](https://github.com/kiba-zhao/egg-swagger): 加载app/docs/openapi.yml来提供swagger接口说明文档
* [egg-http-error](https://github.com/kiba-zhao/egg-http-error)：定义http异常处理方式，支持抛出对象，数组及Error等多种异常．
* [egg-http-logger](https://github.com/kiba-zhao/egg-http-logger)：http请求内容日志记录．支持app.curl请求内容记录．`PS:测试时无效`
* [egg-params-inject](https://github.com/kiba-zhao/egg-params-inject)：`ctx.params`参数注入．将`ctx.headers`中的`App-ID`和`Auth-ID`注入到`ctx.params`中的`appId`以及`authId`中．
* [egg-router-simple](https://github.com/kiba-zhao/egg-router-simple)： 简化符合约定rest规范的service路由访问设置．避免定义重复的controller代码.
* [egg-http-simple](https://github.com/kiba-zhao/egg-http-simple)：支持通过构建函数，简单快速构建http接口模型.以便于访问调用其他服务的http接口.
* [egg-healthy](https://github.com/eggjs/egg-healthy)：提供支持k8s服务发现以及服务状态相关接口
* [egg-rabbitmq](https://github.com/kiba-zhao/egg-rabbitmq)：支持服务定义和使用rabbitmq的生产者和消费者．
* [egg-redis](https://github.com/eggjs/egg-redis)：支持服务以redis-client的形式，对redis服务进行操作控制．
* [egg-sequelize](https://github.com/eggjs/egg-sequelize)：支持服务定义和使用sequelize模型，来存储或请求数据．

## 默认配置说明 ##

``` javascript
// 定义http接口模型加载目录，以及模型注入的属性名'httpApi'
exports.customLoader = {
    httpApi: {
        directory: 'app/http',
        inject: 'app',
        loadunit: true,
        caseStyle: 'upper',
    },
};

// rabbitmq本地服务地址配置
exports.rabbitmq = {
    client: {
        url: 'amqp://guest:guest@localhost:5672',
    },
};

// mysql本地服务地址配置
exports.sequelize = {
    dialect: 'mysql',
    connectionUri: `mysql://root:example@localhost:3306/${appInfo.name}`,
};

// redis本地服务地址配置
exports.redis = {
    client: {
        host: 'localhost',
        port: 6379,
        password: 'auth',
        db: 0,
    },
};

```

## 环境变量说明 ##
生产环境使用环境变量，方便在部署时，更改和设置服务地址．

### RabbitMQ ###

* `RABBITMQ_PRODUCER_DSN`：生产者连接的rabbitmq服务dsn内容
* `RABBITMQ_CONSUMER_DSN`：消费者连接的rabbitmq服务dsn内容
* `RABBITMQ_DSN`: 默认连接的rabbitmq服务dsn内容
  
### Sequelize ###

* `DB_READ_DSN`: 读取数据的dsn连接．支持设置多个服务dsn地址，以`;`分割
* `DB_WRITE_DSN`：　写入数据的dsn连接
* `DB_DSN`: 默认数据读写的dsn连接
* `DB_POOL_MAX`: 线程池最大连接数．仅在设置了`DB_READ_DSN`或`DB_WRITE_DSN`时有效．

### Redis ###

* `REDIS_DSN`: redis默认连接dsn
* `REDIS_CLUSTER`: redis-cluster的node连接dsn.．支持设置多个dsn地址，以`;`分割
* `REDIS_SCALEREADS`: redis的读写模式（master/all/slave）,默认为slave模式.仅仅在`REDIS_CLUSTER`设置后有效．

> REDIS_SCALEREADS具体参数说明，请参考[ioredis](https://github.com/luin/ioredis)相关文档

## 插件禁用说明 ##
实际应用很可能出现不需要使用某些插件的情况．
  * 禁用redis：应用没有需要使用redis的业务功能
  * 禁用rabbitmq: 应用没有需要使用rabbitmq的业务功能
  * 禁用sequelize: 应用没有需要使用数据库的业务功能

``` javascript
// {app_root}/config/plugin.js

// 禁用redis
exports.redis = {
    enable: false,
    package: 'egg-redis',
};

// 禁用数据库
exports.sequelize = {
    enable: false,
    package: 'egg-sequelize',
};

// 禁用rabbitmq
exports.rabbitmq = {
    enable: false,
    package: 'egg-rabbitmq',
};

```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

