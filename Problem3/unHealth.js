var bbDetail, bbOverview, dataSet, svg;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1000 - margin.left - margin.right;

var height = 800 - margin.bottom - margin.top;

bbOverview = {
    x: 0,
    y: 10,
    w: width,
    h: 50
};

var padding= 50;

bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 300
};

dataSet = [];

var max;

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

	var format =d3.time.format("%B-%Y");

	
	data.forEach(function(d, i){
		console.log(d);
		dataSet.push({"date": format.parse(d.AnalysisDate),
					"count": convertToInt(d.WomensHealth)});
	});

	//Get max for counts
	var max = d3.max(dataSet, function(d){
		return d.count;
	});
	
	//Get min and max for date
	function date(d) {
    	return new Date(d.date);
	}

	// get max and min dates - this assumes data is sorted
	var minDate = date(dataSet[0]);
    var maxDate = date(dataSet[dataSet.length-1]);
	
	console.log(minDate);
	console.log(maxDate);

	//Function for overview view
	function viewA(){
		console.log(dataSet);
		
		//yScale
		yScale = d3.scale.linear().domain([0, max]).range([bbOverview.h-30, 0]);
		
		//xScale
		xScale = d3.time.scale().domain([minDate, maxDate]).range([15, bbOverview.w-60]);
		
		//yAxis
		var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(3);
		
		//xAxis
		var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");
		
		
		//draw yAxis
		overview.append("g")
    		.attr("class", "axis")
   		 	.attr("transform", "translate(" + padding + ",0)")
    		.call(yAxis);
    		
    	//draw xAxis
    	overview.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(36," + (bbOverview.h - 30) + ")")
				.call(xAxis);

	};

	viewA();
	
	
});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

