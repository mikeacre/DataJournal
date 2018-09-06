import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import SimpleSchema from 'simpl-schema';
import Chart from 'chart.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './lib/routes.js';
import '/client/layouts/templates.html';
import './lib/constants.js';
import './main.css';
import './lib/formmask.js';


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


Template.Analysis.onRendered(function() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'bubble',
    data: {
        datasets: [{
          data: [{
            x : 0.1,
            y : 0.2,
            r : 50,
            label: 'hi'
          },{
            x : 0.3,
            y : 0.1,
            r : 50
          },{
            x : -0.1,
            y : -0.2,
            r : 50
          }],
          label: ["Red", "Blue", "Yellow"],
        }],

    },
    options: {
        scales: {
            xAxes: [{
                min: 200
            }]
        }
    }
  });
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});

Template.MainLayout.helpers({
  user: ()=> {
    return Meteor.user();
  }
});

Template.NewJournal.events({
  'change .testing': function(event){
    thisone = this.name.split('.');
    var tochange = 'datapoints.'+thisone[1]+'.custom_options';
    if(event.target.value == 'cv'){
      $('[name="'+tochange+'"]').prop('type', 'text');
    }
    else
      $('[name="'+tochange+'"]').prop('type', 'hidden');
  }
});

Template.EditJournal.helpers({
  journal: ( )=> {
    var id = FlowRouter.getParam('id');
    return Journal.findOne({_id:id});
  }
})

Template.EditJournal.onCreated(function(){
  //if($('#testhis').[0].value != ""){
////    $('#testhis').[0].prop('type', 'text');
  //}
});

Template.EditJournal.events({
  'click .delete': (  ) => {
    var id = FlowRouter.getParam('id');
    Journal.remove(id);
    FlowRouter.go('home');
  },
  'change .testing': function(event){
    thisone = this.name.split('.');
    var tochange = 'datapoints.'+thisone[1]+'.custom_options';
    if(event.target.value == 'cv'){
      $('[name="'+tochange+'"]').prop('type', 'text');
    }
    else
      $('[name="'+tochange+'"]').prop('type', 'hidden');
  },
  'load .body': ()=>{
    console.log('test');
  }
})

Template.Home.helpers({
  user: ()=> {
    return Meteor.user().profile;
  }
});

Template.ViewEntries.helpers({
  entries:  ()=> {
    return Entry.find({createdBy: Meteor.userId()});
  }
});
Template.ViewEntry.events({
  'click .delete': (  ) => {
    var id = FlowRouter.getParam('id');
    Entry.remove(id);
    alert("Entry has been deleted")
    FlowRouter.go('home');
  }
});

Template.ViewJournals.helpers({
  journals:  ()=> {
    return Journal.find({createdBy:Meteor.userId()});
  },
  username: ( id ) => {
    return Meteor.users.findOne({_id:id}).profile.firstName;
  }
});

Template.ShowBucket.onCreated(
  function loadBuckets(){
    this.list = new ReactiveVar([]);
    Meteor.call('getBucket', (error,result)=> {
      this.list.set(result);
    });
  }
);

Template.ShowBucket.helpers({
  bucketItem: () => {
    return Template.instance().list.get();

  }
})

Template.SelectJournal.helpers({
  journals:  ()=> {
    var userJournals = Journal.find({createdBy:Meteor.userId()});
    if(userJournals.count() > 0 )
      return userJournals;
    else
        return false;
  }
});

Template.NewEntry.helpers({
  journals:  ()=> {
    var id = FlowRouter.getParam('id');
    this.id = id;
    return Journal.findOne({_id:id});
  },
  checkFor: (value, check)=> {
    if(value == check)
      return true;
    return false;
  },
  buildOptions: (value, options) => {
    if (value == 'cv'){
      return options.split(',');
    }
    else if (value == 'on') {
      return Meteor.settings.public.options.on;
    }
    else if (value == 'yn'){
      return Meteor.settings.public.options.yn;
    }
    else {
      return false;
    }
  }
});

Template.Profile.helpers({
  user: ()=> {
    return Meteor.user();
  }
});


Template.ViewEntry.helpers({
  entry:  ()=> {
    var id = FlowRouter.getParam('id');
    this.id = id;
    return Entry.findOne({_id:id});
  }
});
