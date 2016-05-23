

var elm = document.getElementById('chart_div');

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
var graph = "8.csv.js"  ;
loadleft() ;
goToNewPage();

function goToNewPage()
{
			load();

	var data = document.getElementById('datalist').value;

	var algo = document.getElementById('algolist').value;
	if(data == "england" && algo == 'moving_average') {
		graph = "8.csv.js" ;
	}else if(data ==  "deflator" && algo == 'box-and-whisker'){
		graph = "delator.csv.js" ;
	}else if(data == "deflator" &&  algo == 'moving_average'){
		graph = "delatorMA.csv.js" ;
	}else if(data == 'england' && algo == 'box-and-whisker'){
		graph = 'englandbox.csv.js'
	}else{
		alert('error') ;
	}
	 goToNewEvent() ;
	 drawChart1() ;

} ;


function load() {
	$(document).ready(function() {
		var fullText, maxChar;
		var showChar = 500;
		var ellipsestext = "...";
		var moretext = "more";
		var lesstext = "less";
		var text1 = '' ;
		var file = new XMLHttpRequest();
		file.open("GET", "http://localhost/englandEvent.txt", true);
		file.onreadystatechange = function() {
			if (file.readyState === 4) {  // Makes sure the document is ready to parse
				if (file.status === 200) {  // Makes sure it's found the file
					fullText = file.responseText;
					maxChar = 500;
					updateText(fullText, maxChar);
				}
			}
		};
		file.send() ;
		function updateText(fullText, maxChar) {
			if (maxChar > fullText.length) {
				maxChar = fullText.length;
			}
			var extract = fullText.substring(0, maxChar);
			$("#mycom").html(extract);
		}
		$("#more").click(function(){
			maxChar += 500;
			updateText(fullText, maxChar);
		});
});

}


function loadleft() {
	$(document).ready(function() {
		var fullText, maxChar;
		var showChar = 500;
		var ellipsestext = "...";
		var moretext = "more";
		var lesstext = "less";
		var text1 = '' ;
		var file = new XMLHttpRequest();
		file.open("GET", "http://localhost/England.csv", true);
		file.onreadystatechange = function() {
			if (file.readyState === 4) {  // Makes sure the document is ready to parse
				if (file.status === 200) {  // Makes sure it's found the file
					fullText = file.responseText;
					maxChar = 500;
					updateText(fullText, maxChar);
				}
			}
		};
		file.send() ;
		function updateText(fullText, maxChar) {
			if (maxChar > fullText.length) {
				maxChar = fullText.length;
			}
			var extract = fullText.substring(0, maxChar);
			$("#mycomleft").html(extract);
		}
		$("#moreleft").click(function(){
			maxChar += 500;
			updateText(fullText, maxChar);
		});
});

}


function drawChart1() {
       // grab the CSV



       $.get(graph, function(csvString) {
          // transform the CSV string into a 2-dimensional array
          var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
          // this new DataTable object holds all the data
          var data = new google.visualization.arrayToDataTable(arrayData);


          // this view can select a subset of the data at a time
          var view = new google.visualization.DataView(data);
          view.setColumns([0,1]);

         // set chart options
         var options = {
         	title: "A Chart from a CSV!",
         	hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
         	vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
         	legend: 'none',
         	legend: 'chart' ,
         	series: {
         		0: { color: 'blue' , },
         		1: { color: 'red' , pointSize: 10, }
         	}
         };



         var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
// The select handler. Call the chart's getSelection() method
  function selectHandler() {
    var selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      var value = selectedItem.column;
			$("#mycomleft").html(value);
    }
  }

  // Listen for the 'select' event, and call my function selectHandler() when
  // the user selects something on the chart.
  google.visualization.events.addListener(chart, 'select', selectHandler);
         chart.draw(data, options);
     });
   }
