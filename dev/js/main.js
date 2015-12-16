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
					"pageviews": 4563546
				},
				{
					"name": "KQED",
					"users": 2146505,
					"pageviews": 3204121
				},
				{
					"name": "Minnesota Public Radio",
					"users": 2146505,
					"pageviews": 4327257
				},
				{
					"name": "Southern California Public Radio",
					"users": 2146505,
					"pageviews": 1961906
				},
				{
					"name": "WHYY",
					"users": 2146505,
					"pageviews": 1165399
				},
				{
					"name": "KPBS",
					"users": 2146505,
					"pageviews": 973419
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 2146505,
					"pageviews": 1124545,
				}
			],
			"April2014": [
				{
					"name": "WBUR",
					"users": 2146505,
					"pageviews": 4090053
				},
				{
					"name": "KQED",
					"users": 2146505,
					"pageviews": 3352694
				},
				{
					"name": "Minnesota Public Radio",
					"users": 2146505,
					"pageviews": 4227087
				},
				{
					"name": "Southern California Public Radio",
					"users": 2146505,
					"pageviews": 2194394
				},
				{
					"name": "WHYY",
					"users": 2146505,
					"pageviews": 942373
				},
				{
					"name": "KPBS",
					"users": 2146505,
					"pageviews": 960722
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 2146505,
					"pageviews": 1047103
				}
			],
			"May2014": [
				{
					"name": "WBUR",
					"users": 2146505,
					"pageviews": 3975689
				},
				{
					"name": "KQED",
					"users": 2146505,
					"pageviews": 3138825
				},
				{
					"name": "Minnesota Public Radio",
					"users": 2146505,
					"pageviews": 3739994
				},
				{
					"name": "Southern California Public Radio",
					"users": 2146505,
					"pageviews": 2835279
				},
				{
					"name": "WHYY",
					"users": 2146505,
					"pageviews": 946220
				},
				{
					"name": "KPBS",
					"users": 2146505,
					"pageviews": 1644438
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 2146505,
					"pageviews": 1044191
				}
			],
			"June2014": [
				{
					"name": "WBUR",
					"users": 2146505,
					"pageviews": 3646665
				},
				{
					"name": "KQED",
					"users": 2146505,
					"pageviews": 3214094
				},
				{
					"name": "Minnesota Public Radio",
					"users": 2146505,
					"pageviews": 3798190
				},
				{
					"name": "Southern California Public Radio",
					"users": 2146505,
					"pageviews": 1492468
				},
				{
					"name": "WHYY",
					"users": 2146505,
					"pageviews": 1122770
				},
				{
					"name": "KPBS",
					"users": 2146505,
					"pageviews": 919784
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 2146505,
					"pageviews": 1020420
				}
			],
			"July2014": [
				{
					"name": "WBUR",
					"users": 2146505,
					"pageviews": 4154801
				},
				{
					"name": "KQED",
					"users": 2146505,
					"pageviews": 3460064
				},
				{
					"name": "Minnesota Public Radio",
					"users": 2146505,
					"pageviews": 4129679
				},
				{
					"name": "Southern California Public Radio",
					"users": 2146505,
					"pageviews": 1744820
				},
				{
					"name": "WHYY",
					"users": 2146505,
					"pageviews": 1103905
				},
				{
					"name": "KPBS",
					"users": 2146505,
					"pageviews": 843098
				},
				{
					"name": "Oregon Public Broadcasting",
					"users": 2146505,
					"pageviews": 899330
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

				DataView.updateVis();
				DataView.updateLabel();
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
	      .ticks(0)
	      .scale(xScale)
	      .orient("bottom");

	    var yAxis = d3.svg.axis()
	      .ticks(0)
	      .scale(yScale)
	      .orient("left");

	    /*
	     * Draw the x- and y-axes
	     */

	    axesG.append("g")
	      .attr("class", "axis x-axis")
	      .attr("transform", function () {
	          return "translate(0," + _height + ")";
	      })
	      .style({ fill: 'none', stroke: '#ccc'})
	      .call(xAxis);

	    axesG.append("g")
	      .attr("class", "axis y-axis")
	      .attr("transform", function () {
	          return "translate(0,0)";
	      })
	      .style( { fill: 'none', stroke: '#ccc'})
	      .call(yAxis);

	    /*
	     * Draw the x- and y-axes
	     */

	    // axesG.append("text")
	    //   .attr("class", "x-label")
	    //   .attr("text-anchor", "end")
	    //   .attr("x", _chartWidth)
	    //   .attr("y", _chartHeight/2 + 4)
	    //   .text("High Skill");

	    // axesG.append("text")
	    //   .attr("class", "x-label")
	    //   .attr("text-anchor", "start")
	    //   .attr("x", 0)
	    //   .attr("y", _chartHeight/2 + 4)
	    //   .text("Low Skill");

	    //  axesG.append("text")
	    //   .attr("class", "y-label")
	    //   .attr("text-anchor", "middle")
	    //   .attr("x", _chartWidth/2)
	    //   .attr("y", 50)
	    //   .text("High Frequency");

	    // axesG.append("text")
	    //   .attr("class", "y-label")
	    //   .attr("text-anchor", "middle")
	    //   .attr("x", _chartWidth/2)
	    //   .attr("y", _chartHeight - 45)
	    //   .text("Low Frequency");
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

				DataView.updateVis(); 
				DataView.initLabel();

				_startTicker();

			},

			/**
			 * Creates a linear scale
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getPageViewScale: function(){
				return d3.scale.linear()
					.domain([0,4563546])
					.range([0,50]);
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

		/**
		 * Update the visualization
		 * @param {json} data - json data
		 */
		updateVis: function(){

			var data = Controller.getDataByMonth();

			var circles = Controller.getDataVisGroup().selectAll('circle').data(data);

			var linearScale = Controller.getPageViewScale();

			// Only runs when there is a new bit of data without a corresponding DOM element
			circles.enter().append('circle')
				.attr('r', 0)
				.attr('cx', function(d,i){
					return i*50;
				})
				.attr('cy', 100)
				.attr('class', function(d){
					if (d.name=="Oregon Public Broadcasting"){
						return 'corepub';
					}
				})

			// Runs every time updateVis is called
			circles
				.transition()
					.duration(1500)
				.attr('r', function(d){
					return linearScale(d.pageviews);
				});

			// Only runs when there is a DOM elem. without corresponding data
			circles.exit()
				.transition()
					.duration(750)
				.style('opacity', 0.0)
				.remove();
		},

		label: null,

		/**
		 * Update the data label (e.g. "Total Visits for Month of May, 2015")
		 */
		initLabel: function(){
			
			this.label = Controller.getSvg().append('text');
			this.renderLabel();
			
		},

		updateLabel: function(){
			this.renderLabel();
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