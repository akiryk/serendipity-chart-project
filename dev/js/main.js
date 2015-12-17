(function(){
	
	'use strict';

	/**
	 * Data model for d3 visualization
	 */
	var Model = {

		// JSON data for months and years
		data: {
			"March2014": [
				{
					"name": "WBUR",
					"users": 2146505,
					"pageviews": 4563546,
					"TSR": "25677966"
				},
				{
					"name": "KQED",
					"users": 1283949,
					"pageviews": 3204121,
					"TSR": "15677966"
				},
				{
					"name": "Minnesota Public Radio",
					"users": 1237552,
					"pageviews": 4327257,
					"TSR": "17677966"
				},
				{
					"name": "Southern California Public Radio",
					"users": 994176,
					"pageviews": 1961906,
					"TSR": "12677966"
				},
				{
					"name": "WHYY",
					"users": 533949,
					"pageviews": 1165399,
					"TSR": "9677966"
				},
				{
					"name": "KPBS",
					"users": 393446,
					"pageviews": 973419,
					"TSR": "5677966"
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 345009,
					"pageviews": 1124545,
					"TSR": "677966"
				}
			],
			"April2014": [
				{
					"name": "WBUR",
					"users": 1882959,
					"pageviews": 4090053,
					"TSR": "25677966"
				},
				{
					"name": "KQED",
					"users": 1423761,
					"pageviews": 3352694,
					"TSR": "15677966"
				},
				{
					"name": "Minnesota Public Radio",
					"users": 1252794,
					"pageviews": 4227087,
					"TSR": "17677966"
				},
				{
					"name": "Southern California Public Radio",
					"users": 1224712,
					"pageviews": 2194394,
					"TSR": "12677966"
				},
				{
					"name": "WHYY",
					"users": 432475,
					"pageviews": 942373,
					"TSR": "9677966"
				},
				{
					"name": "KPBS",
					"users": 395232,
					"pageviews": 960722,
					"TSR": "5677966"
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 351898,
					"pageviews": 1047103,
					"TSR": "677966"
				}
			],
			"May2014": [
				{
					"name": "WBUR",
					"users": 1832638,
					"pageviews": 3975689,
					"TSR": "25677966"
				},
				{
					"name": "KQED",
					"users": 1156856,
					"pageviews": 3138825,
					"TSR": "15677966"
				},
				{
					"name": "Minnesota Public Radio",
					"users": 1142115,
					"pageviews": 3739994,
					"TSR": "17677966"
				},
				{
					"name": "Southern California Public Radio",
					"users": 1409253,
					"pageviews": 2835279,
					"TSR": "12677966"
				},
				{
					"name": "WHYY",
					"users": 443395,
					"pageviews": 946220,
					"TSR": "9677966"
				},
				{
					"name": "KPBS",
					"users": 790582,
					"pageviews": 1644438,
					"TSR": "5677966"
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 356230,
					"pageviews": 1044191,
					"TSR": "677966"
				}
			],
			"June2014": [
				{
					"name": "WBUR",
					"users": 1663271,
					"pageviews": 3646665,
					"TSR": "25677966"
				},
				{
					"name": "KQED",
					"users": 1352241,
					"pageviews": 3214094,
					"TSR": "15677966"
				},
				{
					"name": "Minnesota Public Radio",
					"users": 1206300,
					"pageviews": 3798190,
					"TSR": "17677966"
				},
				{
					"name": "Southern California Public Radio",
					"users": 724144,
					"pageviews": 1492468,
					"TSR": "12677966"
				},
				{
					"name": "WHYY",
					"users": 556402,
					"pageviews": 1122770,
					"TSR": "9677966"
				},
				{
					"name": "KPBS",
					"users": 447875,
					"pageviews": 919784,
					"TSR": "5677966"
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 358288,
					"pageviews": 1020420,
					"TSR": "677966"
				}
			],
			"July2014": [
				{
					"name": "WBUR",
					"users": 1878494,
					"pageviews": 4154801,
					"TSR": "25677966"
				},
				{
					"name": "KQED",
					"users": 1504638,
					"pageviews": 3460064,
					"TSR": "15677966"
				},
				{
					"name": "Minnesota Public Radio",
					"users": 1372347,
					"pageviews": 4129679,
					"TSR": "17677966"
				},
				{
					"name": "Southern California Public Radio",
					"users": 848833,
					"pageviews": 1744820,
					"TSR": "12677966"
				},
				{
					"name": "WHYY",
					"users": 504084,
					"pageviews": 1103905,
					"TSR": "9677966"
				},
				{
					"name": "KPBS",
					"users": 379003,
					"pageviews": 843098,
					"TSR": "5677966"
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 300172,
					"pageviews": 899330,
					"TSR": "677966"
				}
			]
		}

	}

	/**
	 * Controller for handling data related to visualization
	 */
	var Controller = (function(){

		// Private methods and properties
		var _dataEls = ['March2014', 'April2014', 'May2014', 'June2014', 'July2014'],
				_counter = 0,
				_rate = 1500, // Rate for window.setTimeout()
				_currentDate = '',
				_svg,
				_g,
				_width = 800,
				_height = 600;

		/**
		 * Find month and year based on current data
		 * @returns {string} date - e.g May, 2014
		 */
		function _setCurrentDate(){
			var str = _dataEls[_counter];

			_currentDate = str.replace(/([a-z])(?=[0-9])/ig, '$1, ');
			// ([a-z]) is any lowercase letter, wrapping it in parens makes it a "matching group"
			// (?=[0-9]) is a "lookahead". it basically means "followed by [0-9] (any digit)"
			// $1 means "first matching group", or the letter that was matched by the first bullet above.
		};

		/**
		 * Start timer that will increment data 
		 */
		function _startTicker(){

			window.setInterval( incrementData.bind(publicProps), _rate);

			function incrementData(){
				
				if ( ++_counter === _dataEls.length){
					_counter = 0;	
				} 
				
				_setCurrentDate();

				DataView.update();

			}

		};

		function _renderAxes() {
	    var axesG = _svg.append("g")
	          .attr("class", "axes");

	    // These scales are specific to the axes
	    // and aren't the same as scales for the bubbles.
	    var xScale = d3.scale.linear()
	      .domain([0,100])
	      .range([0, _width]);

	    var yScale = d3.scale.linear()
	      .domain([0,100])
	      .range([_height, 0]);

	    var xAxis = d3.svg.axis()
	      .ticks(10)
	      .scale(xScale)
	      .orient("bottom");

	    var yAxis = d3.svg.axis()
	      .ticks(10)
	      .scale(yScale)
	      .orient("left");

	    /*
	     * Draw the x- and y-axes
	     */

	    axesG.append("g")
	      .attr("class", "axis x-axis")
	      .attr("transform", function () {
	          return "translate(0,560)";
	      })
	      .style({ fill: 'none', stroke: '#ccc'})
	      .text("income per capita, inflation-adjusted (dollars)")
	      .call(xAxis);

	    axesG.append("g")
	      .attr("class", "axis y-axis")
	      .attr("transform", function () {
	          return "translate(32,0)";
	      })
	      .style( { fill: 'none', stroke: '#ccc'})
	      .call(yAxis);

	    /**
	     * Axis labels
	     */
	    _svg.append("text")
		    .attr("class", "x label")
		    .attr("text-anchor", "end")
		    .attr("x", _width)
		    .attr("y", _height - 6)
		    .text("Total Station Revenue (TSR)");

		   _svg.append("text")
		    .attr("class", "y label")
		    .attr("text-anchor", "end")
		    .attr("y", 6)
		    .attr("dy", ".75em")
		    .attr("transform", "rotate(-90)")
		    .text("Users For Month");

	  };

		var publicProps =  {
			

			/**
			 * Initialize the controller
			 * - create svg elements 
			 * - display data and label
			 * - start the timer for incrementing data
			 */
			init: function(){

				_svg = d3.select('body')
								.append('svg')
								.attr('width', _width)
								.attr('height', _height)
								.style('transform', 'translate(32px, 32px)');

				_renderAxes();

				_g = _svg.append('g').style('transform', 'translateX(100px)');

				_setCurrentDate();

				DataView.init();

				_startTicker();

				// Add close event to DataView tooltip
				var tt = d3.select('.tooltip');
				tt.on('click', function(){
					tt.transition()
						.style('opacity', 0)
						.each('end', function(){
							tt.classed('hidden', true);
						})
				})
				
			},

			/**
			 * Creates a linear scale based on page views
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getPageViewScale: function(){
				return d3.scale.linear()
					.domain([0,4563546])
					.range([_height-100,100]);
			},

			/**
			 * Creates a linear scale based on TSR
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getUserScale: function(){
				return d3.scale.linear()
					.domain([300000,2146505]) 
					.range([10,70]);
			},

			/**
			 * Creates a linear scale based on TSR
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getTsrScale: function(){
				return d3.scale.linear()
					.domain([100000,25000000])
					.range([0, _width-200]);
			},

			/**
			 * Get data from the model
			 * @returns json data
			 */
			getDataByMonth: function(){
				var prop = _dataEls[_counter];
				return Model.data[prop];
			},

			/**
			 * Get current date
			 * @returns {string} Date - e.g. 'May, 2015'
			 */
			getCurrentDate: function(){
				return _currentDate;
			},

			/**
			 * Return reference to svg g element 
			 * @returns g element
			 */
			getDataVisGroup: function(){
				return _g;
			},

			/**
			 * Return reference to svg element 
			 * @returns svg element
			 */
			getSvg: function(){
				return _svg;
			}

		}

		return publicProps;
	
	})();

	/**
	 * Data View
	 * Displays data visualization
	 */
	var DataView = {

		currentStationName: '', // reference the station user is mousing over.

		data: null, //  reference to data by month from Controller

		// Tool Tip
		init: function(){

			this.tooltip = d3.select("body").append("div")   
		    .attr("class", "tooltip")               
		    .style("opacity", 0);

			this.initLabel();
			this.update(); 

		},

		update: function(){
			
			this.data = Controller.getDataByMonth();

			if (this.currentStationName){
				var lookup = {};
				for (var i = 0, len = this.data.length; i < len; i++) {
				    lookup[this.data[i].name] = this.data[i];

				}
				this.updateTooltip(lookup[this.currentStationName]);
			}

			this.updateVis();
			this.updateLabel();
			
		},

		/**
		 * Update the visualization
		 * @param {json} data - json data
		 */
		updateVis: function(){

			var data = this.data;

			var div = this.toolTip;

			var self = this;

			var circles = Controller.getDataVisGroup().selectAll('circle').data(data);

			var pageViewScale = Controller.getPageViewScale(),
					tsrScale = Controller.getTsrScale(),
					userScale = Controller.getUserScale();

			// Only runs when there is a new bit of data without a corresponding DOM element
			circles.enter().append('circle')
				.attr('r', 0)
				.attr('class', function(d){
					if (d.name=="Oregon Public Broadcasting"){
						return 'corepub';
					}
				})

			// Runs every time updateVis is called
			circles
				.transition()
					.duration(1500)
				.attr('cx', function(d){
					return tsrScale(d.TSR);
				})
				.attr('r', function(d){
					return userScale(d.users);
				})
				.attr('cy', function(d){
					return pageViewScale(d.pageviews);
				});

			// Only runs when there is a DOM elem. without corresponding data
			circles.exit()
				.transition()
					.duration(750)
				.style('opacity', 0.0)
				.remove();

			circles
			  .on("mouseover", function(d){
		      d3.select(this).classed('active', true);
		      self.tooltip.transition()        
		        .duration(200)      
		        .style("opacity", .9)
		        .style("left", (d3.event.pageX) + "px")     
		        .style("top", (d3.event.pageY - 28) + "px");
		      self.tooltip.classed('hidden', false); 
		      self.currentStationName = d.name;
		      self.updateTooltip(d);
		        
			  });
		},

		label: null,

		/**
		 * Update the data label (e.g. "Total Visits for Month of May, 2015")
		 */
		initLabel: function(){
			
			this.label = Controller.getSvg().append('text');
			
		},

		updateLabel: function(){
			this.renderLabel();
		},

		updateTooltip: function(d){
			this.tooltip.html("<h3>" + d.name + "</h3>" +
	      		"<p>Data for " + Controller.getCurrentDate() + "</p>" +
	      		"<p>Total Users <span class='tooltip-numbers'>" + d.users + "</span></p>" +
	      		"<p>Total Page Views: <span class='tooltip-numbers'>" + d.pageviews + "</span></p>" +
	      		"<div id='close'>X</div>");	
		},

		renderLabel: function(){
			
			var date = Controller.getCurrentDate();

			this.label
				.style('transform', 'translate(100px,20px)')
				.style('text-align', 'left')
				.text('Page views, ' + date);
		}

	}
	
	// Start the app!
	Controller.init();

})();