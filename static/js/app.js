/*  JavaScript file  */
/*************** Set all the variables ***********/
seriesCount = 0;
var maxSeries = 7;
var x =0;
var listSerials = [];

// allShows must be passed in from flask -> index.html 
let series = allShows.title;
let seriesIds = allShows.id;
let synopsis = allCar.synopsis;
let title = allCar.title;
let pic_url = allCar.pic_url;

/*************** Initialize the dashboard ***********/
function init() {
  seriesCount = 2;
  x =2;
  listSerials = ['The Simpsons','Rick and Morty'];

for (var j=0; j<title.length; j++){
  var car_div = document.getElementById("car_div");
  //var div = document.createElement("div");
  var leftpadding_tile = document.createElement("div");
  var plot = document.createElement("div");
  var plot_detail = document.createElement("div");
  var s_title = document.createElement("div");
  var s_title_detail = document.createElement("div");
  var tile_media = document.createElement("div");
  var img = document.createElement("img");
  var current_img = pic_url[j];
  var current_title = title[j];
  var current_plot = synopsis[j];

//Set attributes for image load
  leftpadding_tile.setAttribute('class','tile leftpadding_tile');
  tile_media.setAttribute('class', 'tile__media');
  img.setAttribute('class', 'tile__img');
  img.setAttribute('src', current_img);

// Set attributes for title load
  s_title_detail.setAttribute('class', 'tile__title');
  s_title_detail.setAttribute('id', 'wrap');
  s_title.setAttribute('class','tile__details');
  s_title_detail.innerHTML = current_title + ': <br>' + current_plot;

  s_title.appendChild(s_title_detail);
  leftpadding_tile.appendChild(s_title);
  
  tile_media.appendChild(img);
  leftpadding_tile.appendChild(tile_media);
  car_div.appendChild(leftpadding_tile);

}
for (var i=0; i<x; i++)
{
  var li = document.createElement('li');
  var ul = document.getElementById('seriesList');
  var xButton = document.createElement("button");
  var seriesName = listSerials[i] + " ";
  //alert("series Name : " +seriesName);
  li.setAttribute('id',i);
    li.appendChild(document.createTextNode(seriesName));
    ul.appendChild(li);
    xButton.setAttribute('id',i);
    xButton.setAttribute("onclick", "removeSeries(" + i + ")");
    xButton.setAttribute("class","sourceText fas fa-times");
     $(xButton.sourceText).append('<i class="fas fa-times"></i>');
    li.appendChild(xButton);
}
}
/**************************
  /*initiate the autocomplete function on the "myInput" element, and pass along the series array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), series);
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
 //------------------------------------
function add_element_to_array()
{
  //console.log(seriesCount);
  //console.log(maxSeries);
  if (seriesCount == maxSeries)
  {
    alert("You have entered max no of series");
    document.getElementById("myInput").value = "";
  }
  else
  {
  var inputSeries = document.getElementById("myInput").value;
  if (inputSeries == "" || inputSeries == null){
    alert("You haven't entered anything");
  }
  else {
    if(searchNewSeries(inputSeries)){
   if( searchSeries(inputSeries)){
    listSerials[x] = inputSeries;
 document.getElementById("myInput").value = "";
 update_array(listSerials[x]);
 seriesCount ++;
 x++;}
  } 
else{
  document.getElementById("myInput").value = "";
}
}
}
}
//------------------------------------
function searchNewSeries(newSeries){
  var flag = true;
  for (var i = 0; i < listSerials.length; i++){
    if (newSeries === listSerials[i]){
      flag = false;
    }
    
  }
if (flag == false){
  alert("The show was already selected");
}
return flag;
}
//------------------------------------
function searchSeries(enterSeries){
  var flag = false;
  for (var i = 0; i < series.length; i++){
    if (enterSeries === series[i]){
      flag = true;
    }
    
  }
if (flag == false){
  alert("No such show was found");
}
return flag;
}
//------------------------------------
function update_array(newSeries)
{
  var li = document.createElement('li');
  var ul = document.getElementById('seriesList');
  var xButton = document.createElement("button");
  var seriesName = newSeries + " ";
  li.setAttribute('id',x);
    li.appendChild(document.createTextNode(seriesName));
    ul.appendChild(li);
    xButton.setAttribute('id',x);
    xButton.setAttribute("onclick", "removeSeries(" + x + ")");
    xButton.setAttribute("class","sourceText fas fa-times");
     $(xButton.sourceText).append('<i class="fas fa-times"></i>');
    li.appendChild(xButton);
}

//------------------------------------
function removeSeries(itemid){
  var item = document.getElementById(itemid);
  var ul = document.getElementById('seriesList');
    ul.removeChild(item);
    //console.log("old: " + listSerials.length);
    delete listSerials[itemid];
   
    //console.log("old lenght: " + listSerials.length);
    
   /* Array.prototype.isNull = function (){
      return this.join().replace(/,/g,'').length === 0;
    };*/
    var checkArray = listSerials.every(function(v) { return v === null; });
   
    if(checkArray) {
      resetAll();  
  } else {
   seriesCount --;
  }
}
//------------------------------------
function resetAll(){
  //console.log("reset ");
  document.getElementById("seriesList").innerHTML = "";
   x =0;
   seriesCount = 0;
 listSerials = [];
}
/*************** Initialize the dashboard ***********/
init();

/************************ End of app.js JavaScript file ************************ */ 