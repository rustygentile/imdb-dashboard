/*   Project 3: imdb-dashboard 
JavaScript file: Purpose- Plots for the feachured page   */

//----------------------------------------
function buildRickAndMortyMania() {

  d3.json("/rick_and_morty_mania").then(function (data) {
    //console.log(data);
    traceLineRating1 = [{
        x: data[0]["season_number"],
        y: data[0]["rating"],
        name: data[0]["title"],
        showlegend: false,
        mode: 'lines+markers'
      },
      {
        x: [7, 20],
        y: [8.5, 7.25],
        showlegend: false,
        mode: "text",
        align: "center",
        text: ["Simpsons Mania", "Zombie Simpsons"],
        type: "scattergl",
        textfont: {
          size: 20
        }
      }
    ];

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

    traceLineRating2.push({
      x: [9, 30],
      y: [9, 7.5],
      showlegend: false,
      mode: "text",
      align: "center",
      text: ["Rick and Morty Mania", "???"],
      type: "scattergl",
      textfont: {
        size: 20
      }
    });

    var layoutRating1 = {

      width: 800,
      height: 600,

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

  });

};
/*************** Initialize the plots ***********/
buildRickAndMortyMania();
/************************ End of feachured_plot1.js JavaScript file ************************ */