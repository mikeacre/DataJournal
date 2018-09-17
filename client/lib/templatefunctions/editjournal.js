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
      $('[name="'+tochange+'"]').prop('class', 'form-control');
    }
    else
      $('[name="'+tochange+'"]').prop('type', 'hidden');
  },
  'change .frequency': function(event){
    thisone = this.name.split('.');
    var tochange = 'datapoints.'+thisone[1]+'.custom_frequency';
    if(event.target.value == 'set'){
      $('[name="'+tochange+'"]').prop('type', 'text');
      $('[name="'+tochange+'"]').prop('class', 'form-control');
    }
    else
      $('[name="'+tochange+'"]').prop('type', 'hidden');
  }
});
