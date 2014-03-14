var bbDetail, bbOverview, dataSet, svg;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 960 - margin.left - margin.right;

var height = 800 - margin.bottom - margin.top;

bbOverview = {
    x: 0,
    y: 10,
    w: width,
    h: 50
};

bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 300
};

dataSet = [];

svg = d3.select("#visUN").append("svg").attr({
    	width: width + margin.left + margin.right,
    	height: height + margin.top + margin.bottom
	})
	.append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });
    
var overview = svg
				.append("svg")
				.attr({
					width: bbOverview.w,
    				height: bbOverview.h
				})
				.append("g").attr({
					transform: "translate(" + bbOverview.x + "," + bbOverview.y + ")"
				});

var detail = svg
				.append("svg")
				.attr({
					width: bbDetail.w,
    				height: bbDetail.h
				})
				.append("g").attr({
					transform: "translate(" + bbDetail.x + "," + bbDetail.y + ")"
				});


d3.csv("unHealth.csv", function(data) {
	console.log(data);
	var format =d3.time.format("%B-%Y");

	
	data.forEach(function(d, i){
		dataSet.push({"date": format.parse(d.AnalysisDate),
					"count": d.WomensHealth});
	});
	console.log(dataSet);
});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

