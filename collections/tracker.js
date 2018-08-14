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

/*
DataValueSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Data Name"
  },
})
*/
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
    allowedValues: ['yn', 'on', 'cv', 'string'],
    autoform: {
      options:{
        yn : "Yes/No",
        on : "Rating 1-10",
        string : "Text Entry",
        cv : "Custom Options"
      },
      class: "testing"
    }
  },
  custom_options: {
    type: String,
    label: "Custom Values",
    defaultValue: "None",
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
