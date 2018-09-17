Template.ViewJournals.helpers({
  journals:  ()=> {
    return Journal.find({createdBy:Meteor.userId()});
  },
  username: ( id ) => {
    return Meteor.users.findOne({_id:id}).profile.firstName;
  }
});
