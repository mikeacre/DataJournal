Template.SelectJournal.helpers({
  journals:  ()=> {
    var userJournals = Journal.find({createdBy:Meteor.userId()});
    if(userJournals.count() > 0 )
      return userJournals;
    else
        return false;
  }
});
