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

	width = 1500 - margin.left - margin.right;

	height = 500 - margin.bottom - margin.top;

	bbVis = {
		x: 0 + 100,
		y: 10,
		w: width - 100,
		h: height-100,
	};

	dataSet = {USCensus:[], populationBureau:[], UN:[], hyde:[], maddison:[] };
	dataSetb= { 0:[], 1000:[], 1200:[], 1250:[], 1500:[], 1600:[], 1650:[], 1700:[],
		 1710:[], 1720:[], 1730:[], 1740:[], 1750:[], 1760:[], 1770:[], 1780:[], 
		 1790:[], 1800:[], 1810:[], 1820:[], 1830:[], 1840:[], 1850:[], 1860:[],
		  1870:[], 1880:[], 1890:[], 1900:[], 1910:[], 1913:[], 1920:[], 1930:[],
		   1940:[], 1950:[], 1955:[], 1960:[], 1962:[], 1965:[], 1966:[], 1970:[],
		    1973:[], 1975:[], 1980:[], 1985:[], 1990:[], 1995:[], 1998:[], 1999:[],
		     2000:[], 2001:[], 2002:[], 2005:[], 2006:[], 2007:[], 2008:[], 2009:[],
		      2010:[], 2015:[], 2020:[], 2025:[], 2030:[], 2035:[], 2040:[], 2045:[], 2050:[] };
	var array = {years:[]};	      
		      
	var years = [];
	var mean =[];

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
		
		function inArray(value, array){
			return array.indexOf(value) > -1;
		};

	d3.csv("timeline.csv", function(data) {

		//Must be a better way of doing this than just coding it all in... 
		//Takes Data from csv, puts into array
		data.forEach(function(d, i){
		
			//console.log(d);
			//dataSetb.push({"year": d.Year, "pop": "", "inter": "yes", "name": "UN", });
			//arrays of years
			//array.years.map(function(e){
				//console.log(e);
				//if(e == d.Year){
					array.years.push({"year":d.Year,
						 "UN": d.UnitedNationsDepartmentofEconomicandSocialAffairs,
						 "USCensus": d.UnitedStatesCensusBureau,
						 "populationBureau": d.PopulationReferenceBureau,
						 "hyde": d.HYDE,
						 "maddison": d.Maddison});
				//}
			//})
			
			//console.log(array);
			
			
			if(!inArray(d.Year, years)){
				years.push(d.Year);
			}

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
				array.years.map(function(e){
					if(e.year == d.year){
						e.UN= iScale(unDom, unRang, d.year);
					}
				})
			}
		});
		
		console.log(array);
		
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
				array.years.map(function(e){
					if(e.year == d.year){
						e.USCensus= iScale(unDom, unRang, d.year);
					}
				})
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
				array.years.map(function(e){
					if(e.year == d.year){
						e.hyde= iScale(unDom, unRang, d.year);
					}
				})
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
				array.years.map(function(e){
					if(e.year == d.year){
						e.maddison= iScale(unDom, unRang, d.year);
					}
				})
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
				array.years.map(function(e){
					if(e.year == d.year){
						e.populationBureau= iScale(unDom, unRang, d.year);
					}
				})
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
			

			
	var means ={year:[], pop:[]};
	var y = array.years.map(function(d, i){
			var t =[];
			dataSet.UN.map(function(e){
				if(e.year == d.year){
					t.push(e.pop);
				}
			})
			dataSet.USCensus.map(function(a){
				if(a.year == d.year){
					t.push(a.pop);
				}
			})
			dataSet.hyde.map(function(l){
				if(l.year == d.year){
					t.push(l.pop);
				}
			})
			dataSet.maddison.map(function(r){
				if(r.year == d.year){
					t.push(r.pop);
				}
			})
			dataSet.populationBureau.map(function(c){
				if(c.year == d.year){
					t.push(c.pop);
				}
			})
			
			means.pop.push(d3.mean(t));
			means.year.push(d);
			d.mean=d3.mean(t);
			//console.log(t);
			//console.log(means);
		
		});
		
		/*means.year.map(function(d, i){
			array.years.map(function(e){
				if(e.year == d.year){
					e.mean=d.pop;
				}
			})
		});*/

		//console.log(array);
		
				
		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d,i) { return xScale(d.year); })//not sure this is right
				.y(function(d) { return yScale(d.mean); });//not sure this is right
					
		//path function, calls line function
		svg.append("path")
			.datum(array.years)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "4px")
			.attr("stroke", "red")
			.attr("d", line);
		
		
		//Mean
		svg.selectAll(".point")
			.data(array.years)
			.enter()
			.append("svg:circle")
			.attr("r", "6")
			.attr("fill", "red")
			.attr("cx", function(d){
				return xScale(d.year);	
			})
			.attr("cy", function(d, i){
				return yScale(d.mean);
			})
			
			.on("mouseover", function(d, i) {
				//Get this circles position for tooltip
				var xPosition = parseFloat(xScale(d.year)) ;
				var yPosition = parseFloat( yScale(d.mean)+70) ;

				//Update the tooltip position and value
				d3.select("#tooltip")
					.style("left", xPosition + "px")
					.style("top", yPosition + "px")
					.select("#year")
					.text(d.year);

				d3.select("#pop")
					.text(parseInt(d.mean));
				d3.select("#UN")
					.text(parseInt(d.UN));
					
				//console.log("is");
				//console.log(d);
				var list = {year:[]};
				//console.log(d);
				
				list.year.push({"year": parseInt(d.year), "UN": parseInt(d.UN), "USCensus": parseInt(d.USCensus), 
					"populationBureau": parseInt(d.populationBureau), "hyde": parseInt(d.hyde), "maddison": parseInt(d.maddison),
					"mean": parseInt(d.mean), });
			
				console.log(list);
				d3.select("#tooltip").append("div").attr("id", "graph");
				
				var graphH= 400;
				var graphW = 500
				
				var v = d3.select("#graph").append("svg")
						.attr("width", graphW)
    					.attr("height", graphH)
    					.attr("class", "display")
    					.attr("transform", "translate(20, 20)");
    			//title		
    			v.selectAll(".title")
    				.data(list.year)
					.enter()
    				.append("text")
    				.attr("class", "title")
    				.text("Year "+ d.year)
    				.attr("x", 10)
    				.attr("y", 20)
    				.attr("fill", "black");
    				
    				
    			var min = d3.min(list.year, function(d){
    				console.log("is");
    				console.log(d);
    				var c =[];
    				//c.push(d.UN);
    				//c.push(d.populationBureau);
    				c.push(d.UN, d.USCensus, d.populationBureau, d.hyde, d.maddison);
    				return d3.min(c);
    			});
    			
    			console.log("min is"+min);
    			var max =  d3.max(list.year, function(d){
    				var c =[];
    				c.push(d.UN, d.USCensus, d.populationBureau, d.hyde, d.maddison);
    				return d3.max(c);
    			});
    			
    			console.log("max is"+max);
    			
    			//yScale
				var yScaleT = d3.scale.linear().domain([min, max]).range([100, 0]);
				
				//yAxis
				yAxisT = d3.svg.axis()
				.scale(yScaleT)
				.orient("left")
				.ticks(3);
				
				//Draw axis
				v.append("g")
					.attr("class", "axis line")
					.attr("transform", "translate(100, 25)") //not sure if last value should be zero but looks ok..
					.call(yAxisT);
				
				//test circle
					v.selectAll(".view")
					.data(list.year)
					.enter()
					.append("circle")
					.attr("class", "view")
					.attr("r", "10")
					.attr("fill", "purple")
					.attr("cx", function(d){
						//console.log(d.year);
						return 30;
					})
					.attr("cy", function(d){
						return 40;
					});
					
					//.text(d.UN);

				//console.log(d);
				//Show the tooltip
				d3.select("#tooltip").classed("hidden", false);
			})
			.on("mouseout", function(d){
				//Hide the tooltip
				d3.select("#tooltip").classed("hidden", true);
				d3.select("#graph").remove();
			});
			
			//console.log(years);
	
	};
