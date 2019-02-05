function buildRickAndMortyMania() {

  d3.json("/rick_and_morty_mania").then(function (data) {
    console.log(data);

    traceLineRating1 = [{
      x: data[0]["season_number"],
      y: data[0]["rating"],
      name: data[0]["title"],
      showlegend: true,
      mode: 'lines+markers'
    }];

    var traceLineRating2 = [];

    for (var i = 0; i < data.length; i++) {
      traceLineRating2[i] = {
        x: data[i]["season_number"],
        y: data[i]["rating"],
        name: data[i]["title"],
        showlegend: true,
        mode: 'lines+markers'
      };
    };

    var layoutRating1 = {

      width: 800,
      height: 600,

      title: {
        text: 'Average Rating per Season'
      },

      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      hovermode: 'closest',
      xaxis: {
        title: 'Season Numbers',
        linecolor: 'lightgrey',
        linewidth: 2,
        mirror: true
      },
      yaxis: {
        title: 'Average Rating',
        hoverformat: '.2f',
        linecolor: 'lightgrey',
        linewidth: 2,
        mirror: true
      },

      paper_bgcolor: "rgba(0,0,0,0)"

    };

    var layoutRating2 = {

      width: 800,
      height: 600,

      title: {
        text: 'Average Rating per Season'
      },

      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      hovermode: 'closest',
      xaxis: {
        title: 'Season Numbers',
        linecolor: 'lightgrey',
        linewidth: 2,
        mirror: true
      },
      yaxis: {
        title: 'Average Rating',
        hoverformat: '.2f',
        linecolor: 'lightgrey',
        linewidth: 2,
        mirror: true
      },

      paper_bgcolor: "rgba(0,0,0,0)"

    };


    var lineRick1 = document.getElementById('featured-rick-1');
    Plotly.newPlot(lineRick1, traceLineRating1, layoutRating1);

    var lineRick2 = document.getElementById('featured-rick-2');
    Plotly.newPlot(lineRick2, traceLineRating2, layoutRating2);



    //var layoutVotes = layout_values('Average Votes per Season by Season Numbers', 'Season Numbers', 'Average Votes per Season');


    //   annotations: [
    //     {
    //       x: '2013-11-24',
    //       y: 4.3,
    //       xref: 'x',
    //       yref: 'y',
    //       text: 'Life of Brian',
    //       showarrow: true,
    //       arrowhead: 2,
    //       arrowsize: 1,
    //       arrowwidth: 2,
    //       arrowcolor: '#ff0000',
    //       ax: -100,
    //       ay: -20,
    //       bordercolor: '#000000',
    //       borderwidth: 1,
    //       borderpad: 4,
    //       bgcolor: '#ffffff',
    //       opacity: 0.8
    //     },     {
    //       x: '2013-12-15',
    //       y: 7.6,
    //       xref: 'x',
    //       yref: 'y',
    //       text: 'Christmas Guy',
    //       showarrow: true,
    //       arrowhead: 2,
    //       arrowsize: 1,
    //       arrowwidth: 2,
    //       arrowcolor: '#ff0000',
    //       ax: 100,
    //       ay: -50,
    //       bordercolor: '#000000',
    //       borderwidth: 1,
    //       borderpad: 4,
    //       bgcolor: '#ffffff',
    //       opacity: 0.8
    //     }
    // ]
    // };

    // var featured1 = document.getElementById('featured-chart1');
    // Plotly.newPlot(featured1, [traceLifeOfBrian], layoutFeatured1);

  });

};

buildRickAndMortyMania();