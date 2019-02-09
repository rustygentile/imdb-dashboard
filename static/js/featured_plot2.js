/*   Project 3: imdb-dashboard 
JavaScript file: Purpose- Plot for the feachured page   */

//----------------------------------------
function buildLifeOfBrian() {

  d3.json("/life_of_brian").then(function (data) {
    console.log(data);
    var dates = data.original_air_date;
    var rating = data.rating;
    var votes = data.votes;

    var traceLifeOfBrian = {
      x: dates,
      y: rating,
      hovertext: data.hover_text,
      hoverinfo: {
        bordercolor: 'black'
      },
      mode: 'markers'
    };

    var layoutFeaturedBrian = {
      width: 800,
      height: 600,

      title: {
        text: 'Family Guy Episodes'
      },

      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      hovermode: 'closest',
      xaxis: {
        title: 'Original Air Date',
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

      paper_bgcolor: "rgba(0,0,0,0)",

      annotations: [
        {
          x: '2013-11-24',
          y: 4.3,
          xref: 'x',
          yref: 'y',
          text: 'Life of Brian',
          showarrow: true,
          arrowhead: 2,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: '#ff0000',
          ax: -100,
          ay: -20,
          bordercolor: '#000000',
          borderwidth: 1,
          borderpad: 4,
          bgcolor: '#ffffff',
          opacity: 0.8
        },     {
          x: '2013-12-15',
          y: 7.6,
          xref: 'x',
          yref: 'y',
          text: 'Christmas Guy',
          showarrow: true,
          arrowhead: 2,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: '#ff0000',
          ax: 100,
          ay: -50,
          bordercolor: '#000000',
          borderwidth: 1,
          borderpad: 4,
          bgcolor: '#ffffff',
          opacity: 0.8
        }
    ]
    };

    var featuredBrian = document.getElementById('featured-brian');
    Plotly.newPlot(featuredBrian, [traceLifeOfBrian], layoutFeaturedBrian);

  });

};
/*************** Initialize the plot ***********/
buildLifeOfBrian();
/************************ End of feachured_plot2.js JavaScript file ************************ */