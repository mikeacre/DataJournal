import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import SimpleSchema from 'simpl-schema';

import './lib/routes.js';
import '/client/layouts/templates.html';
import './lib/constants.js';
import './main.css';

Meteor.startup(() => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://www.strikesparks.com:3000';

  AutoForm.hooks({
    newEntry: {
      onSuccess: function(newEntry) {
        FlowRouter.go('home');
      }
    }
  });

});

Template.MainLayout.helpers({
  user: ()=> {
    return Meteor.user();
  }
});

Template.NewJournal.events({
  'change .testing': function(event){
    console.log(event);
  }
});

Template.Home.helpers({
  user: ()=> {
    return Meteor.user().profile;
  }
});

Template.ViewEntries.helpers({
  entries:  ()=> {
    return Entry.find({});
  }
});

Template.ViewJournals.helpers({
  journals:  ()=> {
    return Journal.find({});
  },
  username: ( id ) => {
    return Meteor.users.findOne({_id:id}).profile.name;
  }
});

Template.SelectJournal.helpers({
  journals:  ()=> {
    return Journal.find({});
  }
});

Template.NewEntry.helpers({
  journals:  ()=> {
    var id = FlowRouter.getParam('id');
    this.id = id;
    return Journal.findOne({_id:id});
  },
  test: (options)=>{
    return options.split(',');
  },
  checkFor: (value, check)=> {
    if(value == check)
      return true;
    return false;
  }
});

Template.Profile.helpers({
  user: ()=> {
    return Meteor.user().services;
  }
});


Template.ViewEntry.helpers({
  entry:  ()=> {
    var id = FlowRouter.getParam('id');
    this.id = id;
    return Entry.findOne({_id:id});
  }
});
