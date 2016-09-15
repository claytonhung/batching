"use strict";

const Twitter = require('twitter');

const tweet = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.tweet = function(user, message) {
  const msg = '@' + user + ' ' + message;

  tweet.post('statuses/update', {status: msg},  function(error, tweet, response) {
    if(error) throw error;
    // console.log(tweet);  // Tweet body.
    // console.log(response);  // Raw response object.
  });
};

exports.sendSMS = function(phone, message) {

};

exports.sendFB = function() {

};