import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import '/collections/tracker.js';

SimpleSchema.extendOptions(['autoform']);



Meteor.startup(() =>
{
  // code to run on server at startup
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://www.strikesparks.com:3000';

  //load in google oath infor
  ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: "redirect",
      clientId: Meteor.settings.GOOGLE_CLIENTID, // See table below for correct property name!
      secret: Meteor.settings.GOOGLE_SECRET,

    }
  });

  AWS.config.update({
    accessKeyId: Meteor.settings.AWS_KEY,
    secretAccessKey: Meteor.settings.AWS_SECRET,
    region: 'us-east-1',


  });


});

Meteor.methods({
  getBucket(){
    var params = {
      Bucket: 'datajournal',
    };
    s3 = new AWS.S3();
    var test;
    const bucketObjects = Promise.await(s3.listObjects(params, (err,data)=> {
      if(err)
        return err;
      else {
        return data;
      }
    }));
    return bucketObjects;
  }
});
