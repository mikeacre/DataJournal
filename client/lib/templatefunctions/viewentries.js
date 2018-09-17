Template.ViewEntries.helpers({
  entries:  ()=> {
    return Entry.find({createdBy: Meteor.userId()});
  }
});
