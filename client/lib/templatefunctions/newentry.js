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
