'use strict';

const mock = require('egg-mock');
const sinon = require('sinon');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: true,
    });
    return app.ready();
  });

  after(() => app && app.close());

  afterEach(mock.restore);

  describe('router.get', () => {

    it('GET /', async () => {
      const query = { a: '1', b: '2' };
      const params = { appId: 'appId', authId: 'authId' };
      const res = { haha: 123, param2: 'param' };
      const mocked = sinon.mock('simple.find').withExactArgs(query, params).resolves(res)
        .once();
      app.mockService('simple', 'find', mocked);

      await app.httpRequest()
        .get('/')
        .set('Accept', 'application/json')
        .set('App-ID', params.appId)
        .set('Auth-ID', params.authId)
        .set('Client-Name', 'client1')
        .set('Body-Filter', 'haha,param2')
        .query(query)
        .expect(200, res);
    });

  });

  describe('router.simple', () => {

    it('GET /simple/:id', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = { appId: 'appId', authId: 'authId' };
      const res = { haha: 123, param2: 'param' };
      const mocked = sinon.mock('simple.findOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'findOne', mocked);

      await app.httpRequest()
        .get(`/simple/${id}`)
        .set('Accept', 'application/json')
        .set('App-ID', params.appId)
        .set('Auth-ID', params.authId)
        .set('Client-Name', 'client1')
        .set('Body-Filter', 'haha,param2')
        .query(query)
        .expect(200, res);

    });

  });

});

