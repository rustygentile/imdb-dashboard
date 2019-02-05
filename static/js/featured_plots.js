function buildFeatured1() {

  var x_ = [1,2,3,4];
  var y_ = [10,2,300,4000];

  traceFeatured1 = {
    x: x_,
    y: y_,
    type: 'scatter'
  };

  var featured1 = document.getElementById('featured-chart1');
  Plotly.newPlot(featured1,traceFeatured1);

};

buildFeatured1();