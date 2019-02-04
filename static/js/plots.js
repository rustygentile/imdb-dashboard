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
  console.log(sample);
  console.log("*******")
  // Use `d3.json` to fetch the sample data for the plots
  d3.json("/plotdata/all_plots/" + sample).then(function (data) {
    console.log(data);
    console.log("#########");
  });
}