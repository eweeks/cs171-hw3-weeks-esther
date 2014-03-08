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

    width = 960 - margin.left - margin.right;

    height = 300 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: 100
    };

    dataSet = [];

    svg = d3.select("#vis").append("svg").attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
    }).append("g").attr({
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });


    d3.csv("timeline.csv", function(data) {

        // convert your csv data and add it to dataSet
        console.log(data);
        console.log(data[1].Year);
        //var s = [];
        //s.push(data[0]);
        //var sources = d3.keys(data[0]) ;
        	
        //console.log(sources);
        
        //Must be a better way of doing this than just coding it all in... FIX!	
        data.forEach(function(d, i){
        	dataSet.push({"year": d.Year, 
        				"USCensus": d.UnitedStatesCensusBureau,
        				"populationBureau": d.PopulationReferenceBureau,
        				"UN": d.UnitedNationsDepartmentofEconomicandSocialAffairs,
        				"hyde": d.HYDE,
        				"maddison": d.Maddison,} );
        });
		console.log(dataSet);
		
        return createVis();
    });

    createVis = function() {
        var xAxis, xScale, yAxis,  yScale;

		//Need to set upper domain in more appropriate manner
          xScale = d3.scale.linear().domain([0,100]).range([0, bbVis.w]);  // define the right domain generically

		/*  // example that translates to the bottom left of our vis space:
		  var visFrame = svg.append("g").attr({
		      "transform": "translate(" + bbVis.x + "," + (bbVis.y + bbVis.h) + ")",
		  	  //....
			  
		  });
		  
		 visFrame.append("rect");*/
		  //....
		  
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
//        
			// add y axis to svg !
			svg.append("g")
			.attr("class", "axis line")
			.attr("transform", "translate(" + bbVis.x +  "," +  (bbVis.y + bbVis.h)+ ")")
    		.call(yAxis);
    		
    		//add x axis
    		
    		svg.append("g")
			.attr("class", "axis line")
			.attr("transform", "translate("+bbVis.x+" ,"+height+")")
    		.call(xAxis);


    };
