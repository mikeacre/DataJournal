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

  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });



});

Meteor.methods({
  getBucket(){
    var params = {
      Bucket: 'datajournal',
    };
    s3 = new AWS.S3();
    var data = s3.listObjects(params).promise();
    return data;
  },
  getTempUrl(key){
    var params = {
      Bucket: 'datajournal',
      Key: key,
      Expires: 6000
    };
    s3 = new AWS.S3();
    return s3.getSignedUrl('getObject', params);

  },
  getImage(key){
    var params = {
      Bucket: 'datajournal',
      Key: key
    };
    s3 = new AWS.S3();
    var data = s3.getObject(params).promise();
    data.then(function(result){
      encoded = Meteor.call('encode', result.Body);
      console.log("got promise: "+ encoded)
    });
    return data.Body;

  },
  encode(body){
    var str = body.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    encodedData = btoa(str).replace(/.{76}(?=.)/g,'$&\n');
    return "data:image/jpeg;base64," + encodedData;
  }
});
