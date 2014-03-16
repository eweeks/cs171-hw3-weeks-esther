/**
 * Created by hen on 2/20/14.
 */
 
	var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

	margin = {
		top: 60,
		right: 400,
		bottom: 50,
		left: 50
	};

	width = 1900 - margin.left - margin.right;

	height = 1200 - margin.bottom - margin.top;

	bbVis = {
		x: 0 + 100,
		y: 10,
		w: width - 100,
		h: height-100,
	};

	var dataSet = {USCensus:[], populationBureau:[], UN:[], hyde:[], maddison:[] };
	
	var array = {years:[]};
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
 
		//Takes Data from csv, puts into array
		data.forEach(function(d, i){
			array.years.push({"year":d.Year,
						 "UN": parseInt(d.UnitedNationsDepartmentofEconomicandSocialAffairs),
						 "UNI": "no",
						 "USCensus": parseInt(d.UnitedStatesCensusBureau),
						 "USCI": "no",
						 "populationBureau": parseInt(d.PopulationReferenceBureau),
						 "popBI": "no",
						 "hyde": parseInt(d.HYDE),
						 "hydeI": "no",
						 "maddison": parseInt(d.Maddison), 
						 "madI": "no",
			});
			

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
						e.UNI="yes";
					}
				})
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
				array.years.map(function(e){
					if(e.year == d.year){
						e.USCensus= iScale(usDom, usRang, d.year);
						e.USCI="yes";
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
						e.hyde= iScale(hyDom, hyRang, d.year);
						e.hydeI="yes";
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
						e.maddison= iScale(maDom, maRang, d.year);
						e.madI="yes";
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
						e.populationBureau= iScale(pbDom, pbRang, d.year);
						e.popBI="yes";
					}
				})
			}
		});

		var xAxis, xScale, yAxis,  yScale;

		xScale = d3.scale.linear().domain([0,2050]).range([bbVis.x, bbVis.w]); 

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
				.x(function(d) { return xScale(d.year); })
				.y(function(d) { return yScale(d.pop); });

		//Find the average for each year
		var y = array.years.map(function(d, i){
			var t =[];
			dataSet.UN.map(function(e){
				if(e.year == d.year){
					t.push(parseInt(e.pop));
				}
			})
			dataSet.USCensus.map(function(a){
				if(a.year == d.year){
					t.push(parseInt(a.pop));
				}
			})
			dataSet.hyde.map(function(l){
				if(l.year == d.year){
					t.push(parseInt(l.pop));
				}
			})
			dataSet.maddison.map(function(r){
				if(r.year == d.year){
					t.push(parseInt(r.pop));
				}
			})
			dataSet.populationBureau.map(function(c){
				if(c.year == d.year){
					t.push(parseInt(c.pop));
				}
			})
			d.mean=d3.mean(t);
		
		});

		//draw lines
		var line = d3.svg.line()
				.interpolate("linear") 
				.x(function(d,i) { return xScale(d.year); })
				.y(function(d) { return yScale(d.mean); });
					
		//path function, calls line function
		svg.append("path")
			.datum(array.years)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "2px")
			.attr("stroke", "red")
			.attr("d", line);
		
		//var to keep track if a circle is clicked or not
		var clicked=false;
		
		//Mean
		svg.selectAll(".point")
			.data(array.years)
			.enter()
			.append("svg:circle")
			.attr("r", "4")
			.attr("fill", "red")
			.attr("cx", function(d){
				return xScale(d.year);	
			})
			.attr("cy", function(d, i){
				return yScale(d.mean);
			})
			
			.on("click", function(d, i) {
				//If already clicked, remove items
				if(clicked){
					d3.select("#graph").remove();
					d3.select("#tooltip").classed("hidden", true);
					clicked=false;
				}
				else{
					//Get this position for tooltip
					var xPosition = parseFloat(xScale(d.year)) ;
					var yPosition = parseFloat(yScale(d.mean)+70) ;
				
					//variables to help keep tooltip from going off of screen
					var sizing = d.year;
					var sizingY = d.mean;
					
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", function(d){
							if(parseInt(sizing) >= 1500){
								return (xPosition-500 + "px");
							}else{
								return (xPosition + "px");
							}
						})
						.style("top", function(d){
							if(parseInt(sizingY) <= 3500000000){
								return yPosition-320 + "px";
							}else{
								return yPosition-70 + "px";
							}
						});
						
					var list = {year:[], values:[]};
					
					list.year.push({"year": parseInt(d.year),"mean": parseInt(d.mean), });
					list.values.push({"name": "UN", "pop": parseInt(d.UN), "inter": d.UNI});
					list.values.push({"name": "US Census", "pop": parseInt(d.USCensus), "inter": d.USCI});
					list.values.push({"name": "Pop. Bureau", "pop": parseInt(d.populationBureau), "inter":d.popBI});
					list.values.push({"name": "Hyde", "pop": parseInt(d.hyde), "inter":d.hydeI});
					list.values.push({"name":"Maddison", "pop": parseInt(d.maddison), "inter": d.madI});

					d3.select("#tooltip").append("div").attr("id", "graph");
				
					var graphH= 300;
					var graphW = 600;
				
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
	
    				
    				var min = d3.min(list.values, function(d){
    					var c =[];
    					c.push(d.pop);
    					return d3.min(c);
    				});
    				
    				var max =  d3.max(list.values, function(d){
    					var c =[];
    					c.push(d.pop);
    					return d3.max(c);
    				});
    			
    				//Don't want the min bar to be zero, so way to add to lower end of
    				//scale so that the lowest value will still be drawn..
    				var t= (min-((max-min)/5));
    			
    				//yScale
					var yScaleT = d3.scale.linear().domain([t, max]).range([graphH-30, 70]);
				
					//yAxis
					yAxisT = d3.svg.axis()
						.scale(yScaleT)
						.orient("left")
						.ticks(5);
				
					//Draw axis
					v.append("g")
						.attr("class", "axis line")
						.attr("transform", "translate(100, 0)") //not sure if last value should be zero but looks ok..
						.call(yAxisT);
				
                	//xScale 
                	var xScaleT = d3.scale.ordinal()
    					.rangeRoundBands([50, graphW-180], .1);
    					
					//xAxis
					var xAxisT = d3.svg.axis()
    					.scale(xScaleT)
    					.orient("bottom");
    				
    				//Add X axis
    				v.append("g")
						.attr("class", "axis line")
						.attr("transform", "translate(50,"+(graphH-30)+")") 
						.call(xAxisT);
					
					//Draws bars
					var barPadding = 1; 
				
					v.selectAll(".bar")
      					.data(list.values)
    					.enter().append("rect")
      					.attr("class", function(d){
      						if(d.pop == max){
      							return "bar max";
      						}else if(d.pop == min){
      							return "bar min";
      						}else{
      							return "bar";
      						}
      					})
      					.attr("x", function(d, i) { 
      						if(i==0){
      							return 100+(i *((graphW-230)/ list.values.length));
      						}else{
      							return 100+(i *((graphW-230)/ list.values.length));
      						}
      					 })
      					.attr("y", function(d) { 
      						if(Number.isNaN(d.pop)){
      							return graphH-30;
      						}else{
      							return yScaleT(d.pop); 
      						}
      					})
      					.attr("height", function(d) { 
      						if(Number.isNaN(d.pop)){
      							return 0;
      						}else{
      							return (graphH-30)- yScaleT(d.pop); 
      						}
      					})
      					.attr("width", (graphW-240) / list.values.length - barPadding)
      					.attr("fill", function(d){
      						return fill(d.name);
      					})
      					.attr("fill-opacity", function(d){
							if(d.inter == "yes"){
								return 0.25;
							}else{
								return 1;
							}
						});
					
					//Draws line 
					v.append("svg:line")
						.data(list.year)
						.attr("class", "aver")
						.attr("x1", 100)
    					.attr("y1", function(d){
    						return yScaleT(d.mean);
    					})
   						.attr("x2", 470)
    					.attr("y2", function(d){
    						return yScaleT(d.mean);
    					})
						.attr("fill", "none")
						.attr("stroke-width", "4px")
						.attr("stroke", "#F4C066");
											
						//X-labels	
    				v.selectAll(".labels")
    					.data(list.values)
						.enter()
    					.append("text")
    					.attr("class", "labels")
    					.text(function(d, i){
    						return  d.name;
    					})
    					.attr("x", function(d, i){
    						return 100+(i *((graphW-230)/ list.values.length));
    					})
    					.attr("y",  function(d){
    						return (graphH-20);
    					})
    					.attr("fill", "black")
    					.attr("font-size", "11px");
    			
    				var aver = d.mean;
    				v.selectAll(".estimates")
    					.data(list.values)
						.enter()
    					.append("text")
    					.attr("class", "estimates")
    					.text( function(d, i){
    						var diff = parseInt(d.pop-aver)
    						if(diff >=0){
    							return "+"+diff;
    						}else{
    							return  diff;
    						}
    					})
    					.attr("x", function(d, i){
    						return 100+(i *((graphW-220)/ list.values.length));
    					})
    					.attr("y",  function(d){
    						return yScaleT(d.pop)-2;
    					})
    					.attr("fill", "black")
    					.attr("font-size", "11px");
    				
    				var l=((d.mean-min)/d.mean)*100;
    				var u=((max-d.mean)/d.mean)*100;
					
    				
    				//lower title for population
    				v.selectAll("titleP")
    					.data(list.year)
						.enter()
    					.append("text")
    					.attr("class", "titleP")
    					.text("Population Estimates Compared to Average")
    					.attr("x", 200)
    					.attr("y", 295)
    					.attr("fill", "black")
    					.attr("font-size", "11px");
    					
    				//lower title for percent
    				v.selectAll("titleP")
    					.data(list.year)
						.enter()
    					.append("text")
    					.attr("class", "titleP")
    					.text("Percent to Average")
    					.attr("x", 500)
    					.attr("y", 295)
    					.attr("fill", "black")
    					.attr("font-size", "11px");
    				
    				//second graph
    				var lower = 0-l.toFixed(2);
    				var upper= u.toFixed(2);
    				var f= (lower-((upper-lower)/5));
    				
    				//yScale
					var yScaleP = d3.scale.linear().domain([f, upper]).range([graphH-30, 70]);
				
					//yAxis
					yAxisP = d3.svg.axis()
						.scale(yScaleP)
						.orient("left")
						.ticks(5);
				
					//Draw axis
					v.append("g")
						.attr("class", "axis line")
						.attr("transform", "translate(510, 0)")
						.call(yAxisP);
    			
    				//Draws line for percent below average
					v.append("svg:line")
						.data(list.year)
						.attr("class", "aver")
						.attr("x1", 510)
    					.attr("y1", function(d){
    						return yScaleP(lower);
    					})
   						.attr("x2", 570)
    					.attr("y2", function(d){
    						return yScaleP(lower);
    					})
						.attr("fill", "none")
						.attr("stroke-width", "4px")
						.attr("stroke",  function(d){
							var low =$( ".min" ).attr( "fill" )
							return low;
						})
						.attr("stroke-opacity", function(d){
							var op =$( ".min" ).attr( "fill-opacity" )
							return op;
						})
					
					//Text for below average	
					v.selectAll(".tb")
    					.data(list.year)
						.enter()
    					.append("text")
    					.attr("class", "tb")
    					.text(function(d, i){
    						return  lower;
    					})
    					.attr("x", 520)
    					.attr("y", function(d){
    						return yScaleP(lower)-5;
    					})
    					.attr("fill", "black")
    					.attr("font-size", "11px");	

					//Draws line for percent above average
					v.append("svg:line")
						.data(list.year)
						.attr("class", "aver")
						.attr("x1", 510)
    					.attr("y1", function(d){
    						return yScaleP(upper);
    					})
   						.attr("x2", 570)
    					.attr("y2", function(d){
    						return yScaleP(upper);
    					})
						.attr("fill", "none")
						.attr("stroke-width", "4px")
						.attr("stroke", function(d){
							var up =$( ".max" ).attr( "fill" )
							return up;
						})
						.attr("stroke-opacity", function(d){
							var op =$( ".max" ).attr( "fill-opacity" )
							return op;
						});
						
					//Text for above average	
					v.selectAll(".tl")
    					.data(list.year)
						.enter()
    					.append("text")
    					.attr("class", "tl")
    					.text(function(d, i){
    						return  "+"+upper;
    					})
    					.attr("x", 520)
    					.attr("y", function(d){
    						return yScaleP(upper)-5;
    					})
    					.attr("fill", "black")
    					.attr("font-size", "11px");
    				
    				//Draws line for average
    				v.append("svg:line")
						.data(list.year)
						.attr("class", "aver")
						.attr("x1", 510)
    					.attr("y1", function(d){
    						return yScaleP(0);
    					})
   						.attr("x2", 570)
    					.attr("y2", function(d){
    						return yScaleP(0);
    					})
						.attr("fill", "none")
						.attr("stroke-width", "4px")
						.attr("stroke", "#F4C066");
						
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
				
					clicked=true;
				}
			})

	
	};
