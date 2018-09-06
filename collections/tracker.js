import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


SimpleSchema.extendOptions(['autoform']);

Entry = new Mongo.Collection('entries');
Journal = new Mongo.Collection('journals');

/*
Avatars.allow({
  /*insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  }
});
*/
CustomValue = new SimpleSchema({
  name:{
    type: String
  }
});

UserProfileSchema = new SimpleSchema({
    firstName: {
      type: String,
      label: "First Name"
    },
    lastName: {
      type: String,
      label: "Last Name"
    },
    birthday:{
      type: Date,
      autoform: {
        type: "bootstrap-datepicker",
        datePickerOptions: {
          autoclose: true
        }
      }
    },
    zipcode:{
      type: String,
      label: "Zip Code",
      autoform:{
        mask: '00000',
        type: 'masked-input',
        placeholder: '00000'
      }
    }
});

// if placeholder isnt working check for 'npm i jquery-mask-plugin'


UserSchema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    emails: {
        type: Array,
        blackbox: true
    },
    "emails.$": {
        type: Object,
        blackbox: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date,
    },
    profile: {
        type: UserProfileSchema,
        optional:true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(UserSchema);

DataPointSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Data Name"
  },
  description:{
    type: String,
    label: "Description"
  },
  type:{
    type: String,
    label: "Type",
    allowedValues: ['yn', 'on', 'cv', 'string', 'num'],
    autoform: {
      options:{
        yn : "Yes/No",
        on : "Rating 1-10",
        string : "Text Entry",
        cv : "Custom Options",
        num : "Number"
      },
      class: "testing"
    }
  },
  custom_options: {
    type: String,
    label: "Custom Values",
    autoform:{
      placeholder: 'Seperate Options with Commas',
      type : "hidden"
    },
    optional: true
  },
  value:{
    type: String,
    optional: true,
    autoform:{
      type: "hidden"
    }
  }
});

JournalSchema = new SimpleSchema({
  name:{
    type: String,
    label: "Journal Name"
  },
  datapoints:{
    type: Array
  },
  'datapoints.$':{
    type: DataPointSchema
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  createdBy: {
    type: String,
    label: "Created At",
    autoValue: function() {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden"
    }
  }

});

EntrySchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    defaultValue: function() {

      return dayoftheweek[new Date().getDay()];
    }
  },
  journalId: {
    type: String,
    label: "Journal ID",
    defaultValue: function() {
      return FlowRouter.getParam('id');
    },
    autoform:{
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  createdBy: {
    type: String,
    label: "Created At",
    autoValue: function() {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden"
    }
  },
  datapoints:{
    type: Array
  },
  'datapoints.$':{
    type: DataPointSchema
  },
  entry:{
    type: String,
    label: "Entry",
    optional: true
  }
});

Entry.attachSchema( EntrySchema );
Journal.attachSchema( JournalSchema );

Meteor.methods({
  getParamId: function(){
    return FlowRouter.getParam('id');
  }
})
