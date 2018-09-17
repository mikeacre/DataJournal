Template.ViewEntry.events({
  'click .delete': (  ) => {
    var id = FlowRouter.getParam('id');
    Entry.remove(id);
    alert("Entry has been deleted")
    FlowRouter.go('home');
  }
});

Template.ViewEntry.helpers({
  entry:  ()=> {
    var id = FlowRouter.getParam('id');
    this.id = id;
    return Entry.findOne({_id:id});
  }
});
