//-----------------------------------------------
// Update the page each time with new sample
function update_plots() {
  //console.log(listSerials);
  // Fetch new data each time a new sample is selected
  // Use the new sample from the list to build the updated plots
  var listID = get_show_id(listSerials);
  console.log("listID: ");
  console.log(listID);

  //var listShow = [listSerials.length,listSerials];
  // var strShow = listShow.join();
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
    console.log(data);
    console.log("#########");
  
   var trace = [];
    var tracePlot = [];
    for (var i = 0; i< data.length; i++){
     var showData = data[i].Episodes;
      trace[i] = {
        x: showData["original_air_date"],
        y: showData["rating"],
        hovertext:showData["title"],
        hoverinfo: {bordercolor: 'black'},
        color: "black",
        mode: 'markers'
        };

        tracePlot[i] ={
          x: showData["original_air_date"],
        y: showData["votes"],
        hovertext:showData["title"],
        hoverinfo: {bordercolor: 'black'},
        color: "black",
        mode: 'markers'
        };

        }
    
 
   var layout = layout_values('rating');

      var BUBBLE1 = document.getElementById('bubble1');
      Plotly.newPlot(BUBBLE1,trace,layout);

  var layout2 = layout_values('Votes');
  var BUBBLE2 = document.getElementById('bubble2');
      Plotly.newPlot(BUBBLE2,tracePlot,layout2);

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
function layout_values(yaxis)
    {var layout2 ={
      title: '<b>Bubble Plot:  </b>',
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
        xaxis: { title: 'Date' },
        yaxis: {title: yaxis },
        
        paper_bgcolor: "rgba(0,0,0,0)"
      };
    return layout2;}