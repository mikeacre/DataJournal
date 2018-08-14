import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import '/collections/tracker.js';

SimpleSchema.extendOptions(['autoform']);



Meteor.startup(() => {
  // code to run on server at startup
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://www.strikesparks.com:3000';
  ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: "redirect",
      clientId: Meteor.settings.GOOGLE_CLIENTID, // See table below for correct property name!
      secret: Meteor.settings.GOOGLE_SECRET,

    }
  }
);
});
