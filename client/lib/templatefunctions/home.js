Template.Home.helpers({
  user: ()=> {
    return Meteor.user().profile;
  }
});
