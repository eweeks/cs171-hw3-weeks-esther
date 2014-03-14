/**
 * Created by hen on 2/20/14.
 */
 
	var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

	margin = {
		top: 200,
		right: 400,
		bottom: 50,
		left: 50
	};

	width = 1800 - margin.left - margin.right;

	height = 1400 - margin.bottom - margin.top;

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
						 "UN": parseInt(d.UnitedNationsDepartmentofEconomicandSocialAffairs),
						 "UNI": "no",
						 "USCensus": parseInt(d.UnitedStatesCensusBureau),
						 "USCI": "no",
						 "populationBureau": parseInt(d.PopulationReferenceBureau),
						 "popBI": "no",
						 "hyde": parseInt(d.HYDE),
						 "hydeI": "no",
						 "maddison": parseInt(d.Maddison), 
						 "madI": "no",});
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
						e.UNI="yes";
					}
				})
			}/*else{
				array.years.map(function(e){
					if(e.year == d.year){
						e.UNI="no";
					}
				})
			}*/
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
			

		/*//path function, calls line function
			svg.append("path")
			.datum(dataSet.UN)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "1.5px")
			.attr("stroke", "#DD1C77")
			.attr("d", line);*/


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
					
		/*//path function, calls line function
		svg.append("path")
			.datum(dataSet.populationBureau)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "1.5px")
			.attr("stroke", "green")
			.attr("d", line);*/

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
					
		/*//path function, calls line function
		svg.append("path")
			.datum(dataSet.maddison)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "1.5px")
			.attr("stroke", "purple")
			.attr("d", line);*/


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
					
		/*//path function, calls line function
		svg.append("path")
			.datum(dataSet.hyde)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "1.5px")
			.attr("stroke", "orange")
			.attr("d", line);*/

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
					
		/*//path function, calls line function
		svg.append("path")
			.datum(dataSet.USCensus)
			.attr("class", "axis")
			.attr("fill", "none")
			.attr("stroke-width", "1.5px")
			.attr("stroke", "blue")
			.attr("d", line);*/
			

			
	var means ={year:[], pop:[]};
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
			.attr("stroke-width", "2px")
			.attr("stroke", "red")
			.attr("d", line);
		
		
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
			
			.on("mouseover", function(d, i) {
				//Get this circles position for tooltip
				var xPosition = parseFloat(xScale(d.year)) ;
				var yPosition = parseFloat(yScale(d.mean)+70) ;
				
				var sizing = d.year;
				console.log(d.year);
				//Update the tooltip position and value
				d3.select("#tooltip")
					.style("left", function(d){
						if(parseInt(sizing) >= 1600){
							console.log("hit");
							return (xPosition-400 + "px");
						}else{
							return (xPosition + "px");
						}
					})
					.style("top", yPosition-70 + "px")
					.select("#year")
					.text(d.year);

				d3.select("#pop")
					.text(parseInt(d.mean));
				d3.select("#UN")
					.text(parseInt(d.UN));
					
				console.log("is");
				//console.log(d);
				var list = {year:[], values:[]};
				console.log(d);
				
				list.year.push({"year": parseInt(d.year),"mean": parseInt(d.mean), });
				list.values.push({"name": "UN", "pop": parseInt(d.UN), "inter": d.UNI});
				list.values.push({"name": "US Census", "pop": parseInt(d.USCensus), "inter": d.USCI});
				list.values.push({"name": "Pop. Bureau", "pop": parseInt(d.populationBureau), "inter":d.popBI});
				list.values.push({"name": "Hyde", "pop": parseInt(d.hyde), "inter":d.hydeI});
				list.values.push({"name":"Maddison", "pop": parseInt(d.maddison), "inter": d.madI});
			
				console.log(list);
				d3.select("#tooltip").append("div").attr("id", "graph");
				
				var graphH= 300;
				var graphW = 500;
				
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
    				//console.log("is");
    				//console.log(d);
    				var c =[];
    				//c.push(d.UN);
    				//c.push(d.populationBureau);
    				//c.push(d.UN, d.USCensus, d.populationBureau, d.hyde, d.maddison);
    				c.push(d.pop);
    				return d3.min(c);
    			});
    			
    			console.log("min is"+min);
    			var max =  d3.max(list.values, function(d){
    				var c =[];
    				//c.push(d.UN, d.USCensus, d.populationBureau, d.hyde, d.maddison);
    				c.push(d.pop);
    				return d3.max(c);
    			});
    			
    			//console.log("max is"+max);
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
					
				/*//xScale
				var xScaleT = d3.scale.linear()
                    .domain([0, 500])
                    .range([5, (500-50)]);*/
                //xScale 
                var xScaleT = d3.scale.ordinal()
    				.rangeRoundBands([50, graphW-60], .1);
    				
				//xAxis
				var xAxisT = d3.svg.axis()
    				.scale(xScaleT)
    				.orient("bottom");
    				
    			//Add X axis
    			v.append("g")
					.attr("class", "axis line")
					.attr("transform", "translate(50,"+(graphH-30)+")") 
					.call(xAxisT);
					
				//test average line
			//draw line
			var linesK = d3.svg.line()
				.interpolate("linear") 
				.x(function(d) { return xScaleT(d.mean); })
				.y(function(d) { return yScaleT(d.mean); });
					
			
				//.attr("d", linesK(d));
				
				//Draws bars
				var barPadding = 1; 
				
				v.selectAll(".bar")
      				.data(list.values)
    				.enter().append("rect")
      				.attr("class", "bar")
      				.attr("x", function(d, i) { 
      					if(i==0){
      						return 100+(i *((graphW-100)/ list.values.length));
      					}else{
      						return 100+(i *((graphW-100)/ list.values.length));
      					}
      				 })
      				.attr("y", function(d) { 
      					if(Number.isNaN(d.pop)){
      						return graphH-30;
      					}else{
      						//return  graphH - d.pop; ;
      						//return 100;
      						return yScaleT(d.pop); 
      					}
      					//return  h - d; ;
      				})
      				.attr("height", function(d) { 
      					if(Number.isNaN(d.pop)){
      						return 0;
      					}else{
      						//return 175;
      						//console.log(graphH);
      						return (graphH-30)- yScaleT(d.pop); 
      					}
      					//return 20;
      				})
      				.attr("width", (graphW-200) / list.values.length - barPadding)
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
   				.attr("x2", 480)
    			.attr("y2", function(d){
    				return yScaleT(d.mean);
    			})
				.attr("fill", "none")
				.attr("stroke-width", "4px")
				.attr("stroke", "#F4C066");
				
				//#9787A3-nice purple gray color, #E8C384-orange
				
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
    					return 100+(i *((graphW-100)/ list.values.length));
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
    					return 100+(i *((graphW-100)/ list.values.length));
    				})
    				.attr("y",  function(d){
    					return yScaleT(d.pop)-2;
    				})
    				.attr("fill", "black")
    				.attr("font-size", "11px");
    				
    			//percents above
    			v.selectAll(".above")
    				.data(list.year)
					.enter()
    				.append("text")
    				.attr("class", "above")
    				.text(function(d, i){
    					var a = ((max-d.mean)/d.mean)*100;
    					return  "Percent Above Average: "+ a.toFixed(2);
    				})
    				.attr("x", 10)
    				.attr("y", 35)
    				.attr("fill", "black")
    				.attr("font-size", "11px");
    				
    			//percent below	
    			v.selectAll(".below")
    				.data(list.year)
					.enter()
    				.append("text")
    				.attr("class", "below")
    				.text(function(d, i){
    					var a = ((d.mean-min)/d.mean)*100;
    					return  "Percent Below Average: "+ a.toFixed(2);
    				})
    				.attr("x", 180)
    				.attr("y", 35)
    				.attr("fill", "black")
    				.attr("font-size", "11px");
    				
    			//percent diver. for graph
    			v.selectAll(".diff")
    				.data(list.year)
					.enter()
    				.append("text")
    				.attr("class", "diff")
    				.text(function(d, i){
    					var a = ((max-min)/d.mean)*100;
    					return  "Percent Difference: "+ a.toFixed(2);
    				})
    				.attr("x", 350)
    				.attr("y", 35)
    				.attr("fill", "black")
    				.attr("font-size", "11px");
    				
    				
					
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
			
			console.log(array.years);
	
	};
