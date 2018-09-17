import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import SimpleSchema from 'simpl-schema';
import Chart from 'chart.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './lib/routes.js';
import '/client/layouts/templates.html';
import './main.css';
import './lib/constants.js';
import './lib/formmask.js';
import './lib/templatefunctions'


Meteor.startup(() => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://www.strikesparks.com:3000';

  AutoForm.hooks({
    newEntry: {
      onSuccess: function(newEntry) {
        FlowRouter.go('home');
      }
    }
  });
  document.title = "Data Journal";

});

Template.Nav.events({
  "click .menu li" : function(){
    $('#menuToggle').removeAttr('checked');
  },
  "click .menu button": function(){
    $('#menuToggle').removeAttr('checked');
  }

});

Template.Nav.helpers({
  user: ()=> {
    return Meteor.user().profile;
  }
});
