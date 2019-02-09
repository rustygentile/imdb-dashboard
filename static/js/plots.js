/*   Project 3: imdb-dashboard 
JavaScript file: plots.js - Get all the list of shows and plot different plots  */
/*************** Set all the variables ***********/
//---------------------
function defaultPlots() {
  var listDefaultID = get_show_id(listSerials);
  buildPlot(listDefaultID);
}
//-----------------------------------------------
// Update the page each time with new sample
function update_plots() {
  // Fetch new data each time a new sample is selected
  // Use the new sample from the list to build the updated plots
  var listID = get_show_id(listSerials);
  buildPlot(listID);
}
//--------------- End of main functions ------------
function get_show_id(ids) {
  var idNumbers = "";
  ids.forEach(function (d) {
    for (var i = 0; i < series.length; i++) {
      if (series[i] === d) {
        idNumbers = idNumbers.concat((seriesIds[i]).toString());
        idNumbers = idNumbers.concat(',');
      }
    }
  });
  return idNumbers;
}
//-------------
function buildPlot(sample) {
  // Use `d3.json` to fetch the sample data for the plots
  d3.json("/plotdata/all_plots/" + sample).then(function (data) {
    // Set all the variables for plots
    var traceBubble1 = [];
    var traceBubble2 = [];
    var xBar1 = [];
    var yBar1 = [];
    var yBar2 = [];
    var yBar3 = [];
    var traceLine1 = [];
    var traceLine2 = [];
    //------------
    // Read all the data for selected shows
    for (var i = 0; i < data.length; i++) {
      var showData = data[i].Episodes;
      var seriesData = data[i].Series;

      // console.log(seriesData);
      // Set all the traces for all the plots
      traceBubble1[i] = {
        x: showData["original_air_date"],
        y: showData["rating"],
        name: seriesData["title"],
        showlegend: true,
        hovertext: showData["title"],
        hoverinfo: {
          bordercolor: 'black'
        },
        color: "black",
        mode: 'markers'
      };

      traceBubble2[i] = {
        x: showData["original_air_date"],
        y: showData["votes"],
        name: seriesData["title"],
        showlegend: true,
        hovertext: showData["title"],
        hoverinfo: {
          bordercolor: 'black'
        },
        color: "black",
        mode: 'markers'
      };
      traceLine1[i] = {
        x: seriesData["season_number"],
        y: seriesData["season_avg_rating"],
        name: seriesData["title"],
        showlegend: true,
        mode: 'lines+markers'
      };
      traceLine2[i] = {
        x: seriesData["season_number"],
        y: seriesData["season_votes"],
        name: seriesData["title"],
        showlegend: true,
        mode: 'lines+markers'
      };

      xBar1.push(seriesData["title"]);
      yBar1.push(seriesData["series_avg_rating"]);
      yBar2.push(seriesData["series_votes"]);
      yBar3.push(seriesData["number_of_seasons"]);

    }
    //------- Display all the plots
    var layoutBubble1 = layout_values('Average Rating by Original Air Date ', 'Original Air Date', 'Average Rating');
    var BUBBLE1 = document.getElementById('bubble1');
    Plotly.newPlot(BUBBLE1, traceBubble1, layoutBubble1);

    var layoutBubble2 = layout_values('Number of Votes by Original Air Date ', 'Original Air Date', 'Number of Votes');
    var BUBBLE2 = document.getElementById('bubble2');
    Plotly.newPlot(BUBBLE2, traceBubble2, layoutBubble2);

    var layoutLine1 = layout_values('Average Rating per Season by Season Numbers', 'Season Numbers', 'Average Rating per Season');
    var LINE1 = document.getElementById('line1');
    Plotly.newPlot(LINE1, traceLine1, layoutLine1);

    var layoutLine2 = layout_values('Total Votes per Season by Season Numbers', 'Season Numbers', 'Total Votes per Season');
    var LINE2 = document.getElementById('line2');
    Plotly.newPlot(LINE2, traceLine2, layoutLine2);

    //---- Set the traces and display all the bar and pie chart
    var traceBar1 = {
      x: xBar1,
      y: yBar1,
      type: 'bar'
    };

    var layoutBar1 = get_bar_layout('Average Series Rating by Series Titles', 'Average Series Rating');
    var BAR1 = document.getElementById('bar1');
    Plotly.newPlot(BAR1, [traceBar1], layoutBar1);

    var tracePie1 = [{
      values: yBar1,
      labels: xBar1,
      type: 'pie'
    }];

    var layoutPie = get_pie_layout();

    var PIE1 = document.getElementById('pie1');
    Plotly.newPlot(PIE1, tracePie1, layoutPie);

    var traceBar2 = {
      x: xBar1,
      y: yBar2,
      type: 'bar'
    };
    var layoutBar2 = get_bar_layout('Number of Votes by Series Titles', 'Number of Votes');
    var BAR2 = document.getElementById('bar2');
    Plotly.newPlot(BAR2, [traceBar2], layoutBar2);

    var tracePie2 = [{
      values: yBar2,
      labels: xBar1,
      type: 'pie'
    }];

    var PIE2 = document.getElementById('pie2');
    Plotly.newPlot(PIE2, tracePie2, layoutPie);

    var traceBar3 = {
      x: xBar1,
      y: yBar3,
      type: 'bar'
    };
    var layoutBar3 = get_bar_layout('Number of Seasons by Series Titles', 'Number of Seasons');
    var BAR3 = document.getElementById('bar3');
    Plotly.newPlot(BAR3, [traceBar3], layoutBar3);

    var tracePie3 = [{
      values: yBar3,
      labels: xBar1,
      type: 'pie'
    }];

    var PIE3 = document.getElementById('pie3');
    Plotly.newPlot(PIE3, tracePie3, layoutPie);
  });
}
//-----------------
//Function: layout_values
//Set all the layout paramenters for the scatter plot and line chart
function layout_values(title, xaxis, yaxis) {
  var layoutVal = {
    title: '<b>' + title + '</b>',
    height: 600,
    width: 800,

    margin: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10
    },
    hovermode: 'closest',
    xaxis: {
      title: xaxis,
      linecolor: 'lightgrey',
      linewidth: 2,
      mirror: true
    },
    yaxis: {
      title: yaxis,
      hoverformat: '.2f',
      linecolor: 'lightgrey',
      linewidth: 2,
      mirror: true
    },

    paper_bgcolor: "rgba(0,0,0,0)"
  };
  return layoutVal;
}

//-----------------
//Function: get_bar_layout
//Set all the layout paramenters for the bar chart
function get_bar_layout(titleBar, yaxisBar) {
  var layoutBar = {
    height: 500,
    width: 500,
    margin: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    title: '<b>' + titleBar + '</b>',
    yaxis: {
      title: yaxisBar,
      linecolor: 'lightgrey',
      linewidth: 2,
      mirror: true
    },
    xaxis: {
      linecolor: 'lightgrey',
      linewidth: 2,
      mirror: true
    },
    barmode: 'group',
  };
  return layoutBar;
}
//--------------------------------
//Function: get_pie_layout
//Set all the layout paramenters for the pie chart
function get_pie_layout() {
  var pieLayout = {
    height: 400,
    width: 500,
    margin: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10
    },
    line: {
      color: 'lightgrey',
      width: 1

    },

    paper_bgcolor: "rgba(0,0,0,0)"
  };
  return pieLayout;
}
/*************** Initialize the dashboard ***********/
defaultPlots();

/************************ End of plots.js JavaScript file ************************ */