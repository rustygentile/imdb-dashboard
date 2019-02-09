/*   Project 3: imdb-dashboard 
JavaScript file: time.js - Uses new js library: google charts
Purpose: Display the time line for all the shows   */
//***************************************/
google.charts.load('current', {
  'packages': ['timeline']
});
google.charts.setOnLoadCallback(drawChart);
//--------------------------------
function drawChart() {
  /*************** Set all the variables ***********/
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({
    type: 'string',
    id: 'Shows'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'Start'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'End'
  });
  dataTable.addRows([
    ['The Simpsons', new Date(1989, 12, 17), new Date(2019, 3, 31)],
    ['South Park', new Date(1997, 8, 13), new Date(2018, 12, 12)],
    ['Family Guy', new Date(1999, 1, 31), new Date(2019, 3, 31)],
    ['Beavis and Butt-Head', new Date(1993, 3, 8), new Date(2011, 12, 29)],
    ['Aqua Teen Hunger Force', new Date(2000, 12, 30), new Date(2015, 8, 26)],
    ['The Venture Bros.', new Date(2003, 2, 16), new Date(2018, 10, 7)],
    ['American Dad!', new Date(2005, 2, 6), new Date(2019, 2, 18)],
    ['Space Ghost Coast to Coast', new Date(1994, 4, 15), new Date(2008, 5, 31)],
    ['Futurama', new Date(1999, 3, 28), new Date(2013, 9, 4)],
    ['King of the Hill', new Date(1997, 1, 12), new Date(2010, 5, 6)],
    ['Robot Chicken', new Date(2005, 2, 20), new Date(2018, 7, 22)],
    ['Squidbillies', new Date(2005, 10, 16), new Date(2017, 12, 17)],
    ['Celebrity Deathmatch', new Date(1998, 1, 25), new Date(2007, 3, 30)],
    ['Archer', new Date(2009, 9, 17), new Date(2018, 6, 13)],
    ['The Boondocks', new Date(2005, 11, 6), new Date(2014, 6, 23)],
    ['Bob Burgers', new Date(2011, 1, 9), new Date(2019, 3, 31)],
    ['Metalocalypse', new Date(2006, 8, 6), new Date(2013, 10, 2)],
    ['Superjail!', new Date(2007, 5, 13), new Date(2014, 7, 20)],
    ['The Ren & Stimpy Show', new Date(1991, 8, 11), new Date(1996, 10, 20)],
    ['Mr. Pickles', new Date(2013, 8, 26), new Date(2018, 3, 25)],
    ['Rick and Morty', new Date(2013, 12, 2), new Date(2017, 10, 1)],
    ['Ã†on Flux', new Date(1991, 6, 30), new Date(1995, 10, 10)],
    ['Daria', new Date(1997, 3, 3), new Date(2001, 6, 25)],
    ['BoJack Horseman', new Date(2014, 8, 22), new Date(2018, 9, 14)],
    ['Big Mouth', new Date(2017, 9, 29), new Date(2019, 2, 8)],
    ['Spawn', new Date(1997, 5, 16), new Date(1999, 5, 28)]


  ]);
  //Call the function to display the table
  chart.draw(dataTable);
}
/************************ End of time.js JavaScript file ************************ */