
var event = "http://localhost/englandEvent.txt" ;
var allEvent = "http://localhost/England.csv" ;

goToNewEvent();

function goToNewEvent()
{

	var data = document.getElementById('datalist').value;

	var algo = document.getElementById('algolist').value;
	if(data == "england" && algo == 'moving_average') {
		event = "http://localhost/englandEvent.txt" ;
		allEvent = "http://localhost/England.csv" ;
	}else if(data ==  "deflator" && algo == 'box-and-whisker'){
		event = "http://localhost/deflatorEvent2.txt" ;
		allEvent =  "http://localhost/deflatorAll.txt"
	}else if(data == 'deflator' &&  algo == 'moving_average'){
		event = "http://localhost/deflatorEvent.txt" ;
		allEvent =  "http://localhost/deflatorAll.txt"
	}else if(data == 'england' && algo == 'box-and-whisker'){
		event = "http://localhost/englandEvent2.txt" ;
		allEvent = "http://localhost/England.csv" ;
	}else{
		alert(data) ;
	}

	load();
	loadleft() ;
} ;

var fullText, maxChar;
function load() {
	$(document).ready(function() {

		var showChar = 300;
		var ellipsestext = "...";
		var moretext = "more";
		var lesstext = "less";
		var text1 = '' ;
		var file = new XMLHttpRequest();
		file.open("GET", event, true);
		file.onreadystatechange = function() {
			if (file.readyState === 4) {  // Makes sure the document is ready to parse
				if (file.status === 200) {  // Makes sure it's found the file
					fullText = file.responseText;
					maxChar = 300;
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
			maxChar += 300;
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
		file.open("GET",allEvent, true);
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
