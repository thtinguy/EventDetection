$( document ).ready(function() {
	$.get("ifr.csv", function(csvString) {
		var elm = document.getElementById('chart_div');	
  	  	google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart1);
		google.charts.setOnLoadCallback(drawChart2);

		function drawChart1() {
			var chart = new google.visualization.LineChart(elm);
			var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
			var data = new google.visualization.arrayToDataTable(arrayData);
			var view = new google.visualization.DataView(data);
			view.setColumns([0,1]);	    
			var options1 = {
					hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
					vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
					legend: 'none',
					     lineWidth: 10,
					series: {
			            0: { color: 'red' },
			            1: { color: '#e7711b' },
			            2: { color: '#f1ca3a' },
			            3: { color: '#6f9654' },
			            4: { color: '#1c91c0' },
			            5: { color: '#43459d' },
			          }
			    };
			chart.draw(view, options1);		
		}	

		function drawChart2() {
			var chart = new google.visualization.LineChart(elm);
			var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
			var data = new google.visualization.arrayToDataTable(arrayData);
			var view = new google.visualization.DataView(data);
			view.setColumns([0,1]);	    
			var options2 = {
				hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
				vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
				 curveType: 'function',
				pointSize: 50,
				legend: 'none'
		    };
			chart.draw(view, options2);		
		}	
	});
});