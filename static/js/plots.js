
//-----------------------------------------------
// Update the page each time with new sample
function update_plots() {
  //console.log(listSerials);
  // Fetch new data each time a new sample is selected
  // Use the new sample from the list to build the updated plots
  var listID = get_show_id(listSerials);
  console.log("listID: ");
  console.log(listID);

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
   
   console.log("#########");
 

   var traceBubble1 = [];
    var traceBubble2 = [];
    var xBar1 = [];
    var yBar1 = [];
    var traceLine1 = [];
    var traceLine2 = [];
    var firstDates =[];
    var lastDates =[];
    for (var i = 0; i< data.length; i++){
     var showData = data[i].Episodes;
     var seriesData = data[i].Series;
     
     console.log(seriesData);
     traceBubble1[i] = {
        x: showData["original_air_date"],
        y: showData["rating"],
        hovertext:showData["plot"],
        hoverinfo: {bordercolor: 'black'},
        color: "black",
        mode: 'markers'
        };

        traceBubble2[i] ={
        x: showData["original_air_date"],
        y: showData["votes"],
        hovertext:showData["plot"],
        hoverinfo: {bordercolor: 'black'},
        color: "black",
        mode: 'markers'
        };     
        traceLine1[i] ={
          x: seriesData["season_number"],
          y: seriesData["season_avg_rating"],  
          mode: 'lines+markers'
          };  
          traceLine2[i] ={
            x: seriesData["season_number"],
            y: seriesData["season_votes"],      
            mode: 'lines+markers'
            };  

          xBar1.push(seriesData["title"]);
          yBar1.push(seriesData["number_of_seasons"]);
          var dates = showData["original_air_date"];
          firstDates.push(dates[0]);
          lastDates.push(dates[dates.length-1]);
      }

   var layoutBubble1 = layout_values('Bubble Plot for shows: ','Original Air Date','Average Rating');
      var BUBBLE1 = document.getElementById('bubble1');
      Plotly.newPlot(BUBBLE1,traceBubble1,layoutBubble1);

  var layoutBubble2 = layout_values('Bubble Plot for shows: ','Original Air Date','Number of Votes');
  var BUBBLE2 = document.getElementById('bubble2');
      Plotly.newPlot(BUBBLE2,traceBubble2,layoutBubble2);

      var layoutLine1 =  layout_values('Line Chart for shows: ','Season Numbers','Average Rating per Season');
      var LINE1 = document.getElementById('line1');
          Plotly.newPlot(LINE1,traceLine1,layoutLine1);

          var layoutLine2 = layout_values('Line Chart for shows: ','Season Numbers','Average Votes per Season');
      var LINE2 = document.getElementById('line2');
          Plotly.newPlot(LINE2,traceLine2,layoutLine2);

        traceBar1= {  x: xBar1,
        y: yBar1,    
        type: 'bar'
      };
      var layoutBar1 = get_bar_layout('#Seasons');
      var BAR1 = document.getElementById('bar1');
      Plotly.newPlot(BAR1, [traceBar1], layoutBar1);
  });
}


//-----------------
function get_trace(tData){
  var traceData = {
    x: tData["original_air_date"],
    y: tData["rating"],
    hovertext:tData["title"],
    hoverinfo: {bordercolor: 'black'},
    color: "black",
    mode: 'markers'
    };
    return traceData;
}
function layout_values(title, xaxis, yaxis)
    {var layoutVal ={
      title: '<b> '+ title + listSerials+  '</b>',
      height: 600,
      width: 800,
  
      margin: 
        {
          top: 10,
          bottom: 10,
          right: 10,
          left: 10
        },
        hovermode: 'closest',
        xaxis: { title: xaxis },
        yaxis: {title: yaxis },
        
        paper_bgcolor: "rgba(0,0,0,0)"
      };
    return layoutVal;}
//-----------------

//-----------------
function get_bar_layout(title){
  var layoutBar = {
    height: 600,
      width: 800,
  
      margin: 
        {
          top: 10,
          bottom: 10,
          right: 10,
          left: 10
        },
        paper_bgcolor: "rgba(0,0,0,0)",
    title: 'Bar Chart',
    xaxis: {tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }},
    yaxis: {
      title: title,
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },
    legend: {
      x: 0,
      y: 1.0,
      bgcolor: 'rgba(255, 255, 255, 0)',
      bordercolor: 'rgba(255, 255, 255, 0)'
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.1
  };
  return layoutBar;
}