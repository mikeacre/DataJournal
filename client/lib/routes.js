import '/client/layouts/templates.html';
import '/collections/tracker.js';


Accounts.onLogin(function(){
  if(!Meteor.user().profile)
    FlowRouter.go('profile');
});

Accounts.onLogout(function(){
   FlowRouter.go('home');
});



FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()){
    FlowRouter.go('home');
  }
}])

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'Home'});
    GAnalytics.pageview("home");
  }
});

FlowRouter.route('/_oauth/google', {
  name: 'oauth',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'Registration'});
  }
});

FlowRouter.route('/journals', {
  name: 'journals',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'ViewJournals'});
    GAnalytics.pageview("journals");
  }
});

FlowRouter.route('/editjournal/:id', {
  name: 'journals',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'EditJournal'});
    GAnalytics.pageview("journals");
  }
});

FlowRouter.route('/newjournal', {
  name: 'newjournal',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'NewJournal'});
  }
});
FlowRouter.route('/selectjournal', {
  name: 'selectjournal',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'SelectJournal'});
  }
});
FlowRouter.route('/entries', {
  name: 'entries',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'ViewEntries'});
    GAnalytics.pageview("entries");
    GAnalytics.event("entry", "ViewEntries");
  }
});
FlowRouter.route('/profile', {
  name: 'profile',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'Profile'});
    GAnalytics.pageview("profile");
  }
});
FlowRouter.route('/NewEntry/:id', {
  name: 'newentry',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'NewEntry'});
  }
});
FlowRouter.route('/ViewEntry/:id', {
  name: 'ViewEntry',
  action: function() {
    BlazeLayout.render('MainLayout', {main:'ViewEntry'});
  }
});
