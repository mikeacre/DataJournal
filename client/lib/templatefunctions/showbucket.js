Template.ShowBucket.onCreated(
  function loadBuckets(){
    this.list = new ReactiveVar([]);
    urls= [];
    Meteor.call('getBucket', (error,result)=> {
      for(item in result.Contents){
        Meteor.call('getTempUrl', result.Contents[item].Key, (error, result) => {
          urls.push(result);
          console.log(result);
          this.list.set(urls);
        });
      };
    });
  }
);

Template.ShowBucket.helpers({
  bucketItem: () => {
    return Template.instance().list.get();
  }
})
