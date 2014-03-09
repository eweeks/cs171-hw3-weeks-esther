/**
 * Created by hen on 2/20/14.
 */
    var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    width = 1360 - margin.left - margin.right;

    height = 600 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: height-100,
    };

    dataSet = [];
    var names =["USCensus", "populationBureau", "UN", "hyde", "maddison"];
    var USCensus=[];
    var populationBureau=[];
    var UN= [];
    var hyde =[];
    var maddison=[];
    

    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


    d3.csv("timeline.csv", function(data) {

        // convert your csv data and add it to dataSet
        console.log(data);
        //console.log(data[1].Year);
        //var s = [];
        //s.push(data[0]);
        //var sources = d3.keys(data[0]) ;
        	
        //console.log(sources);
        
        //Must be a better way of doing this than just coding it all in... FIX!	
        data.forEach(function(d, i){
        	//console.log(data[i].PopulationReferenceBureau);
        	//dataSet.push({"year": d.Year, 
        				//"USCensus": parseInt(d.UnitedStatesCensusBureau),
        				//"populationBureau": parseInt(d.PopulationReferenceBureau),
        				/*"UN": parseInt(
        						function(d){
        						if (d.UnitedNationsDepartmentofEconomicandSocialAffairs !== ""){
        							return
        						d.UnitedNationsDepartmentofEconomicandSocialAffairs;
        					}
        					}),
        					//going about this the wrong way... push if...*/
        						
        					
        				//"hyde": parseInt(d.HYDE),
        				//"maddison": parseInt(d.Maddison),} );
        
        		if (d.UnitedNationsDepartmentofEconomicandSocialAffairs !== ""){
        			UN.push({"year": d.Year, "pop": parseInt(d.UnitedNationsDepartmentofEconomicandSocialAffairs) });
        		};
        		if(d.UnitedStatesCensusBureau !== "" ){
        			USCensus.push({"year": d.Year, "pop": parseInt(d.UnitedStatesCensusBureau) });
        		};
        		if(d.PopulationReferenceBureau !== ""){
        			populationBureau.push({"year": d.Year, "pop": parseInt(d.PopulationReferenceBureau) });
        		};
        		
        		if(d.HYDE !== ""){
        			hyde.push({"year":d.Year, "pop": parseInt(d.HYDE) });
        		};
        		
        		if(d.Maddison !== ""){
        			maddison.push({"year":d.Year, "pop":parseInt(d.Maddison) });
        		}
        
        });
        console.log("Is");
		console.log(hyde);
		console.log(maddison);
		console.log(USCensus);
		
        return createVis();
    });

    createVis = function() {
        var xAxis, xScale, yAxis,  yScale;

		//Need to set upper domain in more appropriate manner
          xScale = d3.scale.linear().domain([0,2050]).range([bbVis.x, bbVis.w]);  // define the right domain generically

		  // example that translates to the bottom left of our vis space:
		  var visFrame = svg.append("g").attr({
		      "transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",
		  	  //....
			  
		  });
		  
		 visFrame.append("rect");
		  //....
		  
		  
		  //Color Scale
		  var color = d3.scale.linear()
    		.domain([-1, 0, 1])
    		.range(["red", "white", "green"]); 
		  
		 //find way to select the pop. max 
        yScale = d3.scale.linear().domain([0, 9400000000]).range([bbVis.h, 0]);

	      xAxis = d3.svg.axis()
	        	.scale(xScale)
	        	.orient("bottom");

			//var y=d3.scale.linear().range([ ]);
	        yAxis = d3.svg.axis()
	        	.scale(yScale)
	        	.orient("left")
	        	.ticks(5);
      
			// add y axis to svg !
			svg.append("g")
			.attr("class", "axis line")
			.attr("transform", "translate(" + bbVis.x +  ",0)") //not sure if last value should be zero but looks ok..
    		.call(yAxis);
    		
    		//add x axis
    		
    		svg.append("g")
			.attr("class", "axis line")
			.attr("transform", "translate(0 ,"+bbVis.h+")")
    		.call(xAxis);
    		
    //draw lines
    var line = d3.svg.line()
    	.interpolate("linear") 
    	.x(function(d) { return xScale(d.year); })//not sure this is right
    	.y(function(d) { return yScale(d.pop); });//not sure this is right
    	
    
    //draw circles
    //var dots = 
    
    svg.selectAll(".point")
    				.data(UN)
    				.enter()
    				.append("svg:circle")
    				.attr("stroke", "black")
    				.attr("fill", "black")
    				.attr("cx", function(d){
    					return xScale(d.year);
    				})
    				.attr("cy", function(d){
    					return yScale(d.pop);
    				})
    				.attr("r", "2");
    				
    	//console.log(UN);

      //path function, calls line function
      svg.append("path")
      		.datum(UN)
      		.attr("class", "axis")
      .attr("fill", "none")
      .attr("stroke-width", "1px")
      .attr("stroke", "black")
      .attr("d", line);

	//dots;
	
	
	//repeat code just to test..
	//console.log(USCensus);

    //draw circles
    //var dots = 
    names.forEach(function(j, e){
    console.log(names[e]);
    svg.selectAll(".point")
    				.data(names[e])
    				.enter()
    				.append("svg:circle")
    				.attr("stroke", "red")
    				.attr("fill", "red")
    				.attr("cx", function(d){
    					return xScale(d.year);
    				})
    				.attr("cy", function(d){
    					return yScale(d.pop);
    				})
    				.attr("r", "2");
    				
    	//console.log(un);

      //path function, calls line function
      svg.append("path")
      		.datum(names[e])
      		.attr("class", "axis")
      .attr("fill", "none")
      .attr("stroke-width", "1px")
      .attr("stroke", "red")
      .attr("d", line);

	});

    };
