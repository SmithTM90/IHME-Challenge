// d3.csv("IHME_1990_2013.csv", type, function(error, data) {

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1500 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
	.range([height,0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("csv/IHME_1990_2013.csv", type, function(error, data) {

	while(data[0].location_id === 160) {
		console.log(data[0].location_id);
	}

	while(data[0].location_id === 160) {

		x.domain(data.map(function(d) { return d.location; }));
  	y.domain([0, d3.max(data, function(d) { return d.mean; })]);

	chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
    	.attr("transform", "rotate(-90)")
    	.attr("y", 6)
    	.attr("dy", ".71em")
    	.style("text-anchor", "end")
    	.text("Frequency");

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.location); })
      .attr("y", function(d) { return y(d.mean); })
      .attr("height", function(d) { return height - y(d.mean); })
      .attr("width", x.rangeBand());
	}
	
});

function type(d) {
	d.location_id = +d.location_id;
  d.year = +d.year;
  d.age_group_id = +d.age_group_id;
  d.age_start = +d.age_start;
  d.age_end = +d.age_end;
  d.sex_id = +d.sex_id;
  d.sex = +d.sex;
  d.mean = +d.mean;
  d.lower = +d.lower;
  d.upper = +d.upper;
	return d;
}



