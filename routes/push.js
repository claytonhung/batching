"use strict";

const Twitter = require('twitter');
const SMS = require('textbelt');

// Application Based
const tweet = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

exports.sendSMS = function(phone, message) {

  const opts = {
    fromAddr: 'hung.clayton@gmail.com',  // "from" address in received text
    fromName: 'Clayton',       // "from" name in received text
    region:   'canada',              // region the receiving number is in: 'us', 'canada', 'intl'
    subject:  'testing'        // subject of the message
  };
  SMS.sendText(phone, message, opts);

};

exports.tweet = function(user, message) {
  const msg = '@' + user + ' ' + message;
  console.log('message', msg);
  // tweet.post('statuses/update', {status: msg},  function(error, tweet, response) {
  //   if(error) throw error;
  //   console.log(tweet);  // Tweet body.
  //   console.log(response);  // Raw response object.
  // });
};

exports.sendFB = function() {

};