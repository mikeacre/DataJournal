Template.Analysis.onRendered(function() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'bubble',
    data: {
        datasets: [{
          data: [{
            x : 0.1,
            y : 0.2,
            r : 100,
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
