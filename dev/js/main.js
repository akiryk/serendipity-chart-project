(function(){
	
	'use strict';

	/**
	 * Data model for d3 visualization
	 */
	var Model = {

		dataSrc: 'data/users_Mar2014.csv'

		

	}

	/**
	 * Controller for handling data related to visualization
	 */
	var Controller = (function(){

		// Private methods and properties
		var _dataEls = ['Mar2014', 'Apr2014', 'May2014', 'Jun2014', 'Jul2014', 'Aug2014', 'Sep2014', 'Oct2014', 'Nov2014', 'Dec2014','Jan2015','Feb2015','Mar2015','Apr2015', 'May2015', 'Jun2015', 'Jul2015', 'Aug2015'],
				_counter = 0,
				_rate = 1500, // Rate for window.setTimeout()
				_currentDate = '',
				_svg,
				_g,
				_width = 1000,
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
				this.changeDataSource();
				this.loadData();

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
	          return "translate(0,560)";
	      })
	      .style({ fill: 'none', stroke: '#ccc'})
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
		    .text("Stations");

		   _svg.append("text")
		    .attr("class", "y label")
		    .attr("text-anchor", "end")
		    .attr('x',206)
		    .attr("y", 6)
		    .attr("dy", ".75em")
		    .text("Total Users per Month");

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

				// Add close event to DataView tooltip
				var tt = d3.select('.tooltip');
				tt.on('click', function(){
					tt.transition()
						.style('opacity', 0)
						.each('end', function(){
							tt.classed('hidden', true);
						})
				});

				this.loadData();

				_startTicker();
				
			},

			changeDataSource: function(){
				Model.dataSrc = 'data/users_' + _dataEls[_counter] + '.csv';
			},

			/**
			 * Load data from Model by month and year
			 */
			loadData: function(){

		    var self = this;
		    d3.csv( Model.dataSrc , function(error, data) {

		      if (error) {
		        console.log(error);
		      } else {
		        self.data = data;
		        DataView.update();
		      } 

		    });

		  },

			/**
			 * Creates a linear scale based on page views
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getYScale: function(){
				var max = d3.max(this.data, function(d) {
			      return Number(d.pageviews);
			    });

			    var min = d3.min(this.data, function(d) {
			      return Number(d.pageviews);
			    });
				return d3.scale.linear()
					.domain([min, max])
					.range([_height-100,100]);
			},

			/**
			 * Creates a linear scale based on TSR
			 * @returns {d3.scale.linear} - with domain and range
			 */
			getRScale: function(){
				var max = d3.max(this.data, function(d) {
			      return Number(d.users);
			    });

			    var min = d3.min(this.data, function(d) {
			      return Number(d.users);
			    });
				return d3.scale.linear()
					.domain([min, max])
					.range([2,40]);
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
			getData: function(){
				return this.data;
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
	
		},

		update: function(){
			
			this.data = Controller.getData();
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

			var yScale = Controller.getYScale(),
					rScale = Controller.getRScale();

			// Only runs when there is a new bit of data without a corresponding DOM element
			circles.enter().append('circle')
				.attr('r', 0)
				.attr('class', function(d){

					if (cpStations.indexOf(d.name)>-1){
						console.log(d.name);
						return 'corepub';
					}
				})
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

			// Runs every time updateVis is called
			circles
				.transition()
					.duration(1500)
				.attr('cx', function(d, i){
					return i*8+8; //return tsrScale(d.TSR);
				})
				.attr('r', function(d){
					return rScale(d.users);
				})
				.attr('cy', function(d){
					return yScale(d.pageviews);
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
			
			this.label = Controller.getSvg().append('text')
				.attr('y', 300)
				.attr('x', 400);
			
		},

		updateLabel: function(){
			this.renderLabel();
		},

		updateTooltip: function(d){
			this.tooltip.html("<h3>" + d.name + "</h3>" +
	  		"<p>Data for " + Controller.getCurrentDate() + "</p>" +
	  		"<p>Total Users <span class='tooltip-numbers'>" + numberWithCommas(d.users) + "</span></p>" +
	  		"<p>Total Page Views: <span class='tooltip-numbers'>" + numberWithCommas(d.pageviews) + "</span></p>" +
	  		"<div id='close'>X</div>");	

			function numberWithCommas(x) {
    		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		},

		renderLabel: function(){
			
			var date = Controller.getCurrentDate();

			this.label
				.classed('view-title', true)
				.text(date);
		}

	}

	var cpStations = ['Oregon Public Broadcasting','Public Media for North Texas','WAMU','Michigan Radio','Vermont Public Radio','KUOW','KUT','KPLU','St. Louis Public Radio','NHPR','WESA','KUNC','WFAE','Rhode Island Public Radio','Wyoming Public Media'];
	
	// Start the app!
	Controller.init();

})();