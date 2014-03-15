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
var min;
var yScale1;
var xScale1;
var yAxis1;
var xAxis1;

var yScale2;
var xScale2;
var yAxis2;
var xAxis2;

var fill;

svg = d3.select("#visUN").append("svg").attr({
    	width: width + margin.left + margin.right,
    	height: height + margin.top + margin.bottom
	})
	.append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });
    
d3.select("svg")	
	.append("text")
    .attr("class", "title")
    .text("Social Media and Women's Health - Data from UN Global Pulse")
    .attr("x", 50)
    .attr("y", 20)
    .attr("fill", "black");
    
var overview = svg
				.append("svg")
				.attr({
					width: bbOverview.w,
    				height: bbOverview.h
				})
				.append("g")
				.attr({
					transform: "translate(" + bbOverview.x + "," + bbOverview.y + ")"
				})
				.attr("class", "overview");

var detail = svg
				.append("svg")
				.attr({
					width: bbDetail.w,
    				height: bbDetail.h
				})
				.append("g")
				.attr({
					transform: "translate(" + bbDetail.x + "," + bbDetail.y + ")"
				})
				.attr("class", "detail");


d3.csv("unHealth.csv", function(data) {

	var format =d3.time.format("%B-%Y");

	
	data.forEach(function(d, i){
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
	
		//Clipping Path
		detail.append("defs").append("clipPath")
    		.attr("id", "clip")
  			.append("rect")
   	 		.attr("width", bbDetail.w-100)
    		.attr("height", bbDetail.h)
    		.attr("x", 50);

	//Overview view
		
		//yScale
		yScale1 = d3.scale.linear().domain([0, max]).range([bbOverview.h-30, 0]);
		
		//xScale
		xScale1 = d3.time.scale().domain([minDate, maxDate]).range([50, bbOverview.w-60]);
		
		//yAxis
		yAxis1 = d3.svg.axis()
                  .scale(yScale1)
                  .orient("left")
                  .ticks(3);
		
		//xAxis
		xAxis1 = d3.svg.axis()
                  .scale(xScale1)
                  .orient("bottom");
		
		
		//draw yAxis
		overview.append("g")
    		.attr("class", "yAxis axis")
   		 	.attr("transform", "translate(" + padding + ",0)")
    		.call(yAxis1);
    		
    	//draw xAxis
    	overview.append("g")
				.attr("class", "xAxis axis")
				.attr("transform", "translate(0," + (bbOverview.h - 30) + ")")
				.call(xAxis1);
				
				
		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d) { return xScale1(d.date); })
				.y(function(d) { return yScale1(d.count); });
					
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
				return xScale1(d.date);	
			})
			.attr("cy", function(d, i){
				return yScale1(d.count);
			})
			
			
			
		
		//Brush
		function brushed(){
			xScale2.domain(brush.empty() ? xScale1.domain() : brush.extent());
  			detail.select(".detailArea").attr("d", fill);
 			detail.select(".xAxis").call(xAxis2);
 			detail.select(".detailPath").attr("d", line);
 			detail.selectAll(".detailPoint").attr("cx", function(d){
				return xScale2(d.date);	
			})
			.attr("cy", function(d, i){
				return yScale2(d.count);
			})
			events.select(".box").remove();

		};
			
		brush = d3.svg.brush().x(xScale1).on("brush", brushed);
		
		var draw = overview
			.append("g")
			.attr("class", "brush")
			.call(brush);
  			
  			draw.selectAll("rect")
  			.attr({
    			height: bbOverview.h-30,
			});
			
		d3.select(".background").attr("height", "60");
	
	//Draw Detail Chart
		//yScale
		yScale2 = d3.scale.linear().domain([0, max]).range([bbDetail.h-120, 0]);
		
		//xScale
		xScale2 = d3.time.scale().domain([minDate, maxDate]).range([50, bbDetail.w-60]);
		
		
		//yAxis
		var yAxis2 = d3.svg.axis()
                  .scale(yScale2)
                  .orient("left")
                  .ticks(6);

		
		//xAxis
		var xAxis2 = d3.svg.axis()
                  .scale(xScale2)
                  .orient("bottom");
		
		
		//draw yAxis
		detail.append("g")
    		.attr("class", "axis yAxis")
   		 	.attr("transform", "translate(" + padding + ",0)")
    		.call(yAxis2);
    		
    	//draw xAxis
    	detail.append("g")
				.attr("class", "axis xAxis")
				.attr("transform", "translate(0," + (bbDetail.h - 120) + ")")
				.call(xAxis2);

		//for fill
		var fill = d3.svg.area()
    				.x(function(d) { return xScale2(d.date); })
    				.y0(bbDetail.h-120)
    				.y1(function(d) { return yScale2(d.count); });
		
		
		//for fill
		detail.append("path")
        	.datum(dataSet)
        	.attr("class", "detailArea")
        	.attr("d", fill);
        
 
				
		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d) { return xScale2(d.date); })
				.y(function(d) { return yScale2(d.count); });
					
		//path function, calls line function
		detail.append("path")
			.datum(dataSet)
			.attr("class", "path detailPath")
			.attr("fill", "none")
			.attr("d", line);		
				
		//draw circles
		detail.selectAll(".point")
			.data(dataSet)
			.enter()
			.append("svg:circle")
			.attr("class", "point detailPoint")
			.attr("r", "2")
			//.attr("fill", "red")
			.attr("cx", function(d){
				return xScale2(d.date);	
			})
			.attr("cy", function(d, i){
				return yScale2(d.count);
			});
	
	
	var events = d3.select("svg")
				.append("g")
				.attr("class", "events");
	//title		
    events
    	.append("text")
    	.attr("class", "title")
    	.text("Notable Events")
    	.attr("x", 50)
    	.attr("y", bbDetail.h+100)
    	.attr("fill", "black");
    	
    events.append("text")
    	.attr("class", "events")
    	.text("January 2012 - February 2012 ")
    	.attr("x", 80)
    	.attr("y", bbDetail.h+130)
    	.on("click", function(d){
    		var s = dataSet[28].date;
    		var f = dataSet[30].date;
    		overview.select(".brush").call(brush.extent([s, f]));
			brushed();
			
			var box = events.append("g").attr("class", "box");
			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 280)
				.attr("y", bbDetail.h-250)
				.attr("height", 190)
				.attr("width", 180);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("January 20, 2012")
    			.attr("x", 320)
    			.attr("y", bbDetail.h-220)

    			
    		box.append('foreignObject')
                .attr('x', 280)
                .attr('y', bbDetail.h-200)
                .attr("class", "tips")
                .attr('width', 200)
                .attr('height', 200)
                .append("xhtml:body")
                .html('<div style="width: 150px;">US Department of Health and Human Services announces full health insurance coverage for prescribed contraceptives and contraceptive services</div>')
			

			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 520)
				.attr("y", bbDetail.h-200)
				.attr("height", 220)
				.attr("width", 180);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("February 10, 2012")
    			.attr("x", 560)
    			.attr("y", bbDetail.h-170)

    			
    		box.append('foreignObject')
                .attr('x', 520)
                .attr('y', bbDetail.h-150)
                .attr("class", "tips")
                .attr('width', 200)
                .attr('height', 200)
                .append("xhtml:body")
                .html('<div style="width: 150px;">Obama administration announces religiously affiliated employers cannot deny full birth control coverage to women they employ, with the exception of churches and houses of worship.</div>')
			
			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 800)
				.attr("y", bbDetail.h-200)
				.attr("height", 220)
				.attr("width", 180);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("February 2012")
    			.attr("x", 840)
    			.attr("y", bbDetail.h-170)

    		box.append('foreignObject')
                    .attr('x', 810)
                    .attr('y', bbDetail.h-150)
                    .attr("class", "tips")
                    .attr('width', 200)
                    .attr('height', 200)
                    .append("xhtml:body")
                    .html('<div style="width: 150px;">The "Blunt Amendment" is proposed by Sen. Roy Blunt, to allow companies to refuse contraception coverage if it is against their moral or religious beliefs. </div>')
			
    	});
    
    events.append("text")
    	.attr("class", "events")
    	.text("March 2012 ")
    	.attr("x", 80)
    	.attr("y", bbDetail.h+150)
    	.on("click", function(d){
    		var s = dataSet[29].date;
    		var f = dataSet[31].date;
    		overview.select(".brush").call(brush.extent([s, f]));
			brushed();
			
			var box = events.append("g").attr("class", "box");
			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 480)
				.attr("y", bbDetail.h-150)
				.attr("height", 130)
				.attr("width", 180);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("March 1, 2012")
    			.attr("x", 520)
    			.attr("y", bbDetail.h-120)

    			
    		box.append('foreignObject')
                .attr('x', 490)
                .attr('y', bbDetail.h-100)
                .attr("class", "tips")
                .attr('width', 200)
                .attr('height', 200)
                .append("xhtml:body")
                .html('<div style="width: 150px;">"Blunt Amendment" is voted down by US Senate</div>')
			
			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 780)
				.attr("y", bbDetail.h-250)
				.attr("height", 170)
				.attr("width", 190);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("March 16, 2012")
    			.attr("x", 820)
    			.attr("y", bbDetail.h-220)

    		box.append('foreignObject')
                .attr('x', 790)
                .attr('y', bbDetail.h-200)
                .attr("class", "tips")
                .attr('width', 200)
                .attr('height', 200)
                .append("xhtml:body")
                .html('<div style="width: 150px;">Regulations passed ensuring coverage for employees of religious organizations/institutions which self insure. </div>')
			
			
    	});
    	
    events.append("text")
    	.attr("class", "events")
    	.text("August 2012 ")
    	.attr("x", 80)
    	.attr("y", bbDetail.h+170)
    	.on("click", function(d){
    		var s = dataSet[34].date;
    		var f = dataSet[36].date;
    		overview.select(".brush").call(brush.extent([s, f]));
			brushed();
			
			var box = events.append("g").attr("class", "box");
			box.append("rect")
				.attr("class", "tipBox")
				.attr("x", 500)
				.attr("y", bbDetail.h-150)
				.attr("height", 170)
				.attr("width", 180);
				
			box.append("text")
    			.attr("class", "tips")
    			.text("August 1, 2012")
    			.attr("x", 540)
    			.attr("y", bbDetail.h-120)

    			
    		box.append('foreignObject')
                .attr('x', 510)
                .attr('y', bbDetail.h-100)
                .attr("class", "tips")
                .attr('width', 200)
                .attr('height', 200)
                .append("xhtml:body")
                .html('<div style="width: 150px;">Parts of the Affordable Care Act go into effect, including coverage for prescribed contraceptives and contraceptive services</div>')
			
		
    	});
	
	
});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

