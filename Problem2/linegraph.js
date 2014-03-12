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

    width = 2000 - margin.left - margin.right;

    height = 2500 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: height-100,
    };

    dataSet = {USCensus:[], populationBureau:[], UN:[], hyde:[], maddison:[] };

    var fill = d3.scale.category10();
    

    svg = d3.select("#vis")
    	.append("svg")
    	.attr({
        	width: width + margin.left + margin.right,
        	height: height + margin.top + margin.bottom
    	})
    	.append("g")
    	.attr({
        	transform: "translate(" + margin.left + "," + margin.top + ")"
        });

    d3.csv("timeline.csv", function(data) {
        
		//Must be a better way of doing this than just coding it all in... 
		//Takes Data from csv, puts into array
        data.forEach(function(d, i){
     
        		//UN
        	if (d.UnitedNationsDepartmentofEconomicandSocialAffairs !== ""){
        		dataSet.UN.push({"year": d.Year, "pop": parseInt(d.UnitedNationsDepartmentofEconomicandSocialAffairs),
        			"inter": "no", "name": "UN", });
        	};
        		
        	if(d.UnitedNationsDepartmentofEconomicandSocialAffairs == "" && dataSet.UN.length !== 0 ){
        		dataSet.UN.push({"year": d.Year, "pop": "", "inter": "yes", "name": "UN", });
        	};
        		
        	//US Census
        	if(d.UnitedStatesCensusBureau !== "" ){
        		dataSet.USCensus.push({"year": d.Year, "pop": parseInt(d.UnitedStatesCensusBureau),
        			"inter": "no", "name": "USCensus", });
        	};
        		
        	if(d.UnitedStatesCensusBureau == "" && dataSet.USCensus.length !== 0 ){
        		dataSet.USCensus.push({"year": d.Year, "pop": "", "inter": "yes", "name": "USCensus", });
        	};
        		
        	//PopBureau
        	if(d.PopulationReferenceBureau !== ""){
        		dataSet.populationBureau.push({"year": d.Year, "pop": parseInt(d.PopulationReferenceBureau),
        			"inter": "no", "name": "populationBureau" });
        	};
        		
        	if(d.PopulationReferenceBureau == "" && dataSet.populationBureau.length !== 0 ){
        		dataSet.populationBureau.push({"year": d.Year, "pop": "", "inter": "yes",
        			"name": "populationBureau", });
        	};
        		
        	//Hyde
        	if(d.HYDE !== ""){
        		dataSet.hyde.push({"year":d.Year, "pop": parseInt(d.HYDE), "inter": "no",
        			"name": "hyde", });
        	};
        		
        	if(d.HYDE == "" && dataSet.hyde.length !== 0 ){
        		dataSet.hyde.push({"year": d.Year, "pop": "", "inter": "yes", "name": "hyde" });
        	};
        		
        	//Maddison
        	if(d.Maddison !== ""){
        		dataSet.maddison.push({"year":d.Year, "pop":parseInt(d.Maddison),
        			"inter": "no", "name": "maddison",  });
        	}
        		
        	if(d.Maddison == "" && dataSet.maddison.length !== 0 ){
        		dataSet.maddison.push({"year": d.Year, "pop": "", "inter": "yes", 
        			"name": "maddison", });
        	};
        });
  
        return createVis();
    });
	
	createVis = function() {
    	//Runs through datasets, finds last entered value, removes empty end data
		
		//UN
		while(dataSet.UN[dataSet.UN.length-1].pop == ""){
			dataSet.UN.pop();
		}
		
		//USCensus
		while(dataSet.USCensus[dataSet.USCensus.length-1].pop == ""){
			dataSet.USCensus.pop();
		}
		
		//Hyde
		while(dataSet.hyde[dataSet.hyde.length-1].pop == ""){
			dataSet.hyde.pop();
		}
		
		//maddison
		while(dataSet.maddison[dataSet.maddison.length-1].pop == ""){
			dataSet.maddison.pop();
		}
		
		//populationBureau
		while(dataSet.populationBureau[dataSet.populationBureau.length-1].pop == ""){
			dataSet.populationBureau.pop();
		}
		
		//interpolate here
		
    	//Scale for interpolation of data			
    	function iScale(domain, range, year){
    		var inter = d3.scale.linear()
    					.domain(domain)
    					.range(range);
    				
    		return inter(year);
    	}
		
		//UN
		var unDom =[];
		var unRang=[];
		dataSet.UN.forEach(function(d, i){
			if (d.pop !== ""){
				unDom.push(d.year);
				unRang.push(d.pop);
			}
		});
    				
    	//loop thru array again, and pass to scale as needed..
    	dataSet.UN.forEach(function(d, i){
    		if(d.inter == "yes"){
    			d.pop= iScale(unDom, unRang, d.year);
    		}
    	});
    	
    	//USCensus
    	var usDom=[];
    	var usRang=[];
    	dataSet.USCensus.forEach(function(d, i){
			if (d.pop !== ""){
				usDom.push(d.year);
				usRang.push(d.pop);
			}
		});
    				
    	//loop thru array again, and pass to scale as needed..
    	dataSet.USCensus.forEach(function(d, i){
    		if(d.inter == "yes"){
    			d.pop= iScale(usDom, usRang, d.year);
    		}
    	});
    	
    	
    	//hyde
    	var hyDom=[];
    	var hyRang=[];
		dataSet.hyde.forEach(function(d, i){
			if (d.pop !== ""){
				hyDom.push(d.year);
				hyRang.push(d.pop);
			}
		});
		
		dataSet.hyde.forEach(function(d, i){
    		if(d.inter == "yes"){
    			d.pop= iScale(hyDom, hyRang, d.year);
    		}
    	});
    	
    	//Maddison
    	var maDom=[];
    	var maRang=[];
    	dataSet.maddison.forEach(function(d, i){
			if (d.pop !== ""){
				maDom.push(d.year);
				maRang.push(d.pop);
			}
		});
		
		dataSet.maddison.forEach(function(d, i){
    		if(d.inter == "yes"){
    			d.pop= iScale(maDom, maRang, d.year);
    		}
    	});
    	
    	//populationBureau
    	var pbDom=[];
    	var pbRang=[];
    	
    	dataSet.populationBureau.forEach(function(d, i){
			if (d.pop !== ""){
				pbDom.push(d.year);
				pbRang.push(d.pop);
			}
		});
		
		dataSet.populationBureau.forEach(function(d, i){
    		if(d.inter == "yes"){
    			d.pop= iScale(pbDom, pbRang, d.year);
    		}
    	});

        var xAxis, xScale, yAxis,  yScale;

		//Need to set upper domain in more appropriate manner?
        xScale = d3.scale.linear().domain([0,2050]).range([bbVis.x, bbVis.w]); 

		// example that translates to the bottom left of our vis space:
		var visFrame = svg.append("g").attr({
			"transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",  
		});
		  
		//find way to select the pop. max ?
		yScale = d3.scale.linear().domain([0, 9400000000]).range([bbVis.h, 0]);

	    xAxis = d3.svg.axis()
	        	.scale(xScale)
	        	.orient("bottom")
	        	.ticks(20);

	    yAxis = d3.svg.axis()
	        	.scale(yScale)
	        	.orient("left")
	        	.ticks(8);
      
		// add y axis to svg
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
    	  
    
    	//not ideal, but draws all the data...
    	//UN
    	svg.selectAll(".point")
    		.data(dataSet.UN)
    		.enter()
    		.append("svg:circle")
    		.attr("fill", "#DD1C77")
    		.attr("fill-opacity", function(d){
    			if(d.inter == "yes"){
    				return 0.3;
    			}else{
    				return 0.9;
    			}
    		})
    		.attr("cx", function(d){
    			return xScale(d.year);
    					
    		})
    		.attr("cy", function(d){
    			return yScale(d.pop);
    		})
    		.attr("r", "4");
    				

		//path function, calls line function
      	svg.append("path")
      		.datum(dataSet.UN)
      		.attr("class", "axis")
      		.attr("fill", "none")
      		.attr("stroke-width", "1.5px")
      		.attr("stroke", "#DD1C77")
      		.attr("d", line);
      

		//populationBureau
		svg.selectAll(".point")
    		.data(dataSet.populationBureau)
    		.enter()
    		.append("svg:circle")
    		.attr("fill", "green")
    		.attr("fill-opacity", function(d){
    			if(d.inter == "yes"){
    				return 0.3;
    			}else{
    				return 0.9;
    			}
    		})
    		.attr("cx", function(d){
    			return xScale(d.year);
    					
    		})
    		.attr("cy", function(d){
    			return yScale(d.pop);
    		})
    		.attr("r", "4");
    				
      	//path function, calls line function
      	svg.append("path")
      		.datum(dataSet.populationBureau)
      		.attr("class", "axis")
      		.attr("fill", "none")
      		.attr("stroke-width", "1.5px")
      		.attr("stroke", "green")
      		.attr("d", line);
      
      
		//maddison
		svg.selectAll(".point")
    		.data(dataSet.maddison)
    		.enter()
    		.append("svg:circle")
    		.attr("fill", "purple")
    		.attr("fill-opacity", function(d){
    			if(d.inter == "yes"){
    				return 0.3;
    			}else{
    				return 0.9;
    			}
    		})
    		.attr("cx", function(d){
    			return xScale(d.year);
    		})
    		.attr("cy", function(d){
    			return yScale(d.pop);
    		})
    		.attr("r", "4");
    				
      	//path function, calls line function
      	svg.append("path")
      		.datum(dataSet.maddison)
      		.attr("class", "axis")
      		.attr("fill", "none")
      		.attr("stroke-width", "1.5px")
      		.attr("stroke", "purple")
      		.attr("d", line);
      
      
      	//hyde
	 	svg.selectAll(".point")
    		.data(dataSet.hyde)
    		.enter()
    		.append("svg:circle")
    		.attr("fill", "orange")
    		.attr("fill-opacity", function(d){
    			if(d.inter == "yes"){
    				return 0.3;
    			}else{
    				return 0.9;
    			}
    		})
    		.attr("cx", function(d){
    			return xScale(d.year);		
    		})
    		.attr("cy", function(d){
    			return yScale(d.pop);
    		})
    		.attr("r", "4");
    				
      	//path function, calls line function
      	svg.append("path")
      		.datum(dataSet.hyde)
      		.attr("class", "axis")
      		.attr("fill", "none")
      		.attr("stroke-width", "1.5px")
      		.attr("stroke", "orange")
      		.attr("d", line);

	      //USCensus
          svg.selectAll(".point")
    				.data(dataSet.USCensus)
    				.enter()
    				.append("svg:circle")
    				.attr("fill", "blue")
    				.attr("fill-opacity", function(d){
    						if(d.inter == "yes"){
    							return 0.3;
    						}else{
    							return 0.9;
    						}
    				})
    				.attr("cx", function(d){
    					return xScale(d.year);
    					
    				})
    				.attr("cy", function(d){
    					return yScale(d.pop);
    				})
    				.attr("r", "4");
    				

      //path function, calls line function
      svg.append("path")
      		.datum(dataSet.USCensus)
      		.attr("class", "axis")
      .attr("fill", "none")
      .attr("stroke-width", "1.5px")
      .attr("stroke", "blue")
      .attr("d", line);


    };
