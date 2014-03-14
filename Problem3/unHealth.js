var bbDetail, bbOverview, dataSet, svg;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1200 - margin.left - margin.right;

var height = 800 - margin.bottom - margin.top;

bbOverview = {
    x: 0,
    y: 10,
    w: width,
    h: 70
};

bbVis = {
    x: 0,
    y: 10,
    w: width,
    h: 70
};

var padding= 50;

bbDetail = {
    x: 0,
    y: 100,
    w: width,
    h: 400
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
		xScale = d3.time.scale().domain([minDate, maxDate]).range([50, bbOverview.w-60]);
		
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
				.attr("transform", "translate(0," + (bbOverview.h - 30) + ")")
				.call(xAxis);
				
				
		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d) { return xScale(d.date); })
				.y(function(d) { return yScale(d.count); });
					
		//path function, calls line function
		overview.append("path")
			.datum(dataSet)
			.attr("class", "path overviewPath")
			.attr("fill", "none")
			//.attr("stroke-width", "1px")
			//.attr("stroke", "red")
			.attr("d", line);		
				
		//draw circles
		overview.selectAll(".point")
			.data(dataSet)
			.enter()
			.append("svg:circle")
			.attr("class", "point")
			.attr("r", "2")
			//.attr("fill", "red")
			.attr("cx", function(d){
				return xScale(d.date);	
			})
			.attr("cy", function(d, i){
				return yScale(d.count);
			})
			
		
		//Brush
		function brushed(){
		
		};
			
		brush = d3.svg.brush().x(xScale).on("brush", brushed);
		
		overview
			.append("g")
			.attr("class", "brush")
			.call(brush)
  			.selectAll("rect")
  			.attr({
    			height: bbOverview.h-30,
    			//width: bbOverview.w-60,
				//transform: "translate(20,100)"
			});
			
		d3.select(".background").attr("height", "60");

	};
	
	//Draw Detail Chart
	function viewB(){
		
		//yScale
		yScale = d3.scale.linear().domain([0, max]).range([bbDetail.h-120, 0]);
		
		//xScale
		xScale = d3.time.scale().domain([minDate, maxDate]).range([50, bbDetail.w-60]);
		
		
		//yAxis
		var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(6);

		
		//xAxis
		var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");
		
		
		//draw yAxis
		detail.append("g")
    		.attr("class", "axis")
   		 	.attr("transform", "translate(" + padding + ",0)")
    		.call(yAxis);
    		
    	//draw xAxis
    	detail.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (bbDetail.h - 120) + ")")
				.call(xAxis);

		//for fill
		var fill = d3.svg.area()
    				.x(function(d) { return xScale(d.date); })
    				.y0(bbDetail.h-120)
    				.y1(function(d) { return yScale(d.count); });
		
		
		//for fill
		detail.append("path")
        	.datum(dataSet)
        	.attr("class", "detailArea")
        	.attr("d", fill);
        
 
				
		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d) { return xScale(d.date); })
				.y(function(d) { return yScale(d.count); });
					
		//path function, calls line function
		detail.append("path")
			.datum(dataSet)
			.attr("class", "path detailPath")
			.attr("fill", "none")
			//.attr("stroke-width", "1px")
			//.attr("stroke", "red")
			.attr("d", line);		
				
		//draw circles
		detail.selectAll(".point")
			.data(dataSet)
			.enter()
			.append("svg:circle")
			.attr("class", "point")
			.attr("r", "2")
			//.attr("fill", "red")
			.attr("cx", function(d){
				return xScale(d.date);	
			})
			.attr("cy", function(d, i){
				return yScale(d.count);
			});
	
	}
	
	viewA();
	viewB();
	
	
});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

