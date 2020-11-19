'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.service.simple.find(ctx.query, ctx.params);
    ctx.body = data;
    ctx.status = 200;
  }
}

module.exports = HomeController;
