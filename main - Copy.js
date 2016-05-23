$( document ).ready(function() {
	$.get("ifr.csv", function(csvString) {
		var elm = document.getElementById('chart_div');	
  	  	google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart1);
		///google.charts.setOnLoadCallback(drawChart2);

		function drawChart1() {
			var chart = new google.visualization.LineChart(elm);
			var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
			var data = new google.visualization.arrayToDataTable(arrayData);
			 var data = google.visualization.arrayToDataTable([
         ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
         ['2004/05',  165,      938,         522,             998,           450,      614.6],
         ['2005/06',  135,      1120,        599,             1268,          288,      682],
         ['2006/07',  157,      1167,        587,             807,           397,      623],
         ['2007/08',  139,      1110,        615,             968,           215,      609.4],
         ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      ]);
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
			   var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);	
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