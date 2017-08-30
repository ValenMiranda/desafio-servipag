// Using RaphaëlJS + Custom Plugin
// Label is SVG.
// All parts are configurable.
// Has to be resized manually for "responsiveness"

(function() {
	var DoughnutChart = function () {
		var paper = this;
		var rad = Math.PI / 180;
		var chart = this.set();
		var total = 0;
		
		var options = {
            centerX: 0,
            centerY: 0,
            donutRadius: 150,
			holeRadius: 70,
            animationRun: 1000, // milliseconds
			easingMouseIn: "elastic",
            easingMouseOut: "easeInOut",
			strokeColor: "#fff", // hex or "none"
			strokeWidth: 3,
			data: [],
			initialAngle: -90,
			showLabels: false,
			radiusOnHover: 155,
			holeLabel: []
        };

		var o = options = extend(options, arguments[0] ? arguments[0] : {});
		var angle = o.initialAngle;
		
		var createSector = function (cx, cy, rbig, rsmall, startAngle, endAngle, properties) {
			var a1 = cx + rbig * Math.cos(startAngle * rad);
			var b1 = cy + rbig * Math.sin(startAngle * rad);
			 
			var c1 = cx + rsmall * Math.cos(startAngle * rad);
			var d1 = cy + rsmall * Math.sin(startAngle * rad);
			
			var a2 = cx + rbig * Math.cos(endAngle * rad);
			var b2 = cy + rbig * Math.sin(endAngle * rad);
			 	
			var c2 = cx + rsmall * Math.cos(endAngle * rad);
			var d2 = cy + rsmall * Math.sin(endAngle * rad);
			
			return paper.path(["M", c1, d1,   
								"L", a1, b1, 
							   "A", rbig, rbig, 1, +(endAngle - startAngle > 180), 1, a2, b2, 
							   "L", c2, d2, 
							   "A", rsmall, rsmall, 1, +(endAngle - startAngle > 180), 0, c1, d1, "z"]
							 ).attr(properties);			
		};
		
		var processChart = function (sectorData, index) {
			var s = sectorData;
            var value = s.value;
			var angleplus = 360 * s.value / total;
            var ms = o.animationRun;
            
			var p = createSector(o.centerX, o.centerY, o.donutRadius, o.holeRadius, angle, angle + angleplus, 
                           {
								fill: s.fill, 
                  				stroke: o.strokeColor, 
                  				"stroke-width": o.strokeWidth
							});
            
			var bigp = createSector(o.centerX, o.centerY, o.radiusOnHover, o.holeRadius, angle, angle + angleplus, 
							{
								fill: s.fill, 
                  				stroke: o.strokeColor, 
                  				"stroke-width": o.strokeWidth
							}).hide();
			
			
			
			p.mouseover(function (e) {
				bigp.stop().show().animate({transform: "s1 1 " + o.centerX + " " + o.centerY}, ms, "elastic");
				p.stop().hide();
            })
			
			bigp.mouseout(function (e) {
				bigp.stop().hide();
				p.stop().show();
            });
			
            angle += angleplus;
            chart.push(p);
        };
		
		
		$.each(o.data, function(i, v) {
			total += v.value;
		});
		
		$.each(o.data, function(i, v) {
			processChart(v, i);
		});
		
		
		$.each(o.holeLabel, function(i, v) {				
			paper
				.text(o.centerX + v.hDistanceFromCenter , o.centerY + v.vDistanceFromCenter, v.text)
				.attr(v.attributes ? v.attributes : {});
		});
		
		return chart;
	};
	
	var extend = function (){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    };

    extend(Raphael.fn, {doughnutChart: DoughnutChart});
	
})();
 
$(document).ready(function() {
	var values = [22, 9, 9],
		labels = ["Photos", "Videos", "Free Space"];
	
	Raphael("graphContainer", 600, 400).doughnutChart({
			centerX: 300,
            centerY: 200,
            donutRadius: 150,
					holeRadius: 55,
            animationRun: 500, // milliseconds
            easing: "easeInOut",
			data: [{
					value: 2,
					label: "Photos",
					fill: "#067ab5"
				}, {
					value: 9,
					label: "Videos",
					fill: "#3aa5dd"
				}, {
					value: 9,
					label: "Free Space",
					fill: "#eaeaea"
				}],
			strokeColor: "none",
			
			// create an object for each text that has different style and position
			holeLabel: [{
				text: "41",
				hDistanceFromCenter: -15,
				vDistanceFromCenter: -5,
				attributes: {
					"font-size": 26,
					"fill": "#8e8e8e",
					"font-family": "Arial"
				}
			}, {
				text: "GB",
				hDistanceFromCenter: 15,
				vDistanceFromCenter: -3,
				attributes: {
					"font-size": 20,
					"fill": "#8e8e8e",
					"font-family": "Arial"
				}
			}, {
				text: "of 50GB",
				hDistanceFromCenter: 0,
				vDistanceFromCenter: 12,
				attributes: {
					"font-size": 14,
					"fill": "#cdcdcd",
					"font-family": "Arial"
				}
			}
			]
		});
  
});