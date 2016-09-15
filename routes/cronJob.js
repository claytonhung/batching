"use strict";

const CronJob = require('cron').CronJob;
const push = require('./push.js');

/*
  Runs once at the specified date
*/
exports.create = function(item, tw, sms, fb){
  const itemTime = item.time.split(':');
  const message = item.message;
  const _tw = tw;

  const time = new Date();
  time.setHours(itemTime[0]);
  time.setMinutes(itemTime[1]);

  const job = new CronJob(time, function() {
    push.tweet(_tw, message);
    // push.sendSMS
    // push.sendFB()
  }, function() {
    // execute when this job stops
  },
  true, // start of the job right now
  'America/Toronto'
  );

};
