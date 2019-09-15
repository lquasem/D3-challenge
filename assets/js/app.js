// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 100
// };
















// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Import Data
// d3.csv("assets/data/data.csv")
//   .then(function(censusData) {

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     censusData.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([20, d3.max(censusData, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([0, d3.max(censusData, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(censusData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.censusData.poverty))
//     .attr("cy", d => yLinearScale(d.censusData.healthcare))
//     .attr("r", "15")
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//     // // Step 6: Initialize tool tip
//     // // ==============================
//     // var toolTip = d3.tip()
//     //   .attr("class", "tooltip")
//     //   .offset([80, -60])
//     //   .html(function(d) {
//     //     return (`${d.state}<br>poverty: ${d.poverty}<br>healthcare: ${d.}`);
//     //   });

//     // // Step 7: Create tooltip in the chart
//     // // ==============================
//     // chartGroup.call(toolTip);

//     // // Step 8: Create event listeners to display and hide the tooltip
//     // // ==============================
//     // circlesGroup.on("click", function(data) {
//     //   toolTip.show(data, this);
//     // })
//     //   // onmouseout event
//     //   .on("mouseout", function(data, index) {
//     //     toolTip.hide(data);
//     //   });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Poverty vs Healhtcare");

//     chartGroup.append("text.value")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("abbr");
//   });
(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => {
    const title = 'Poverty vs Healthcare';
    
    const xValue = d => d.poverty;
    const xAxisLabel = 'In poverty %';
    
    const yValue = d => d.heathcare;
    const circleRadius = 10;
    const yAxisLabel = 'Lacks healthcare';
    
    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    g.selectAll('circle').data(data)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);




  var gdots =  svg.selectAll("g.dot")
  .data(data)
  .enter().append('g');
  
  gdots.append("circle")
  .attr("class", "dot")
  .attr("r", function (d) {
      return d.r;
  })
  .attr("cx", function (d) {
      return x(d.state);

  });


};
  d3.csv('assest/data/data.csv')
    .then(data => {
      data.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcareLow = +d.healthcare;
        d.income = +d.income;
    
        
      });
      render(data);
    });

}(d3));