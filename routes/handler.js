"use strict";

const cronJob = require('./cronJob.js');
const push = require('./push.js');

const handler = module.exports = {};

handler.postItems = function *postItems(next) {
  if ('POST' != this.method) return yield next;

  const that = this.request.body;
  const _tw = that.social.twitter;
  const _sms = that.social.sms;
  const _fb = that.social.facebook;
  const items = that.items;

  for(let i = 0; i < items.length; i++) {
    cronJob.create(items[i], _tw, _sms, _fb);
  };

  const res = 1;
  // const res = yield venue.getById(id);

  this.type = 'application/vnd.api+json';
  this.body = JSON.stringify(res);

  // return value to frontend
  this.res.end(this.body);

  yield next;
};






