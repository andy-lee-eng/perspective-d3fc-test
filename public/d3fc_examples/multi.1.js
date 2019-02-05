var width = 800;
var height = 250;
var container = d3.select('#multi-svg');

var dataGenerator = fc.randomGeometricBrownianMotion()
  .steps(10);
var data = dataGenerator(1);
var data2 = dataGenerator(2);

var xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain(fc.extentLinear().pad([0.5, 0.5])(data))
    .range([height, 0]);

var svgBarPicker = (dataIndex) => {
  const seriesBar = fc.seriesSvgBar()
  .crossValue(function(_, i) { return i; })
  .mainValue(function(d) { return d; })
  .bandwidth(d => d = 25)
  .decorate((group, data, index) => {
    group.selectAll('path')
        .attr('transform', `translate(${dataIndex * 30}, 0)`);
    });

   return seriesBar;
}

var dataArray = [data, data2];

var svgBar = fc.seriesSvgBar()
    .crossValue(function(_, i) { return i; })
    .mainValue(function(d) { return d; })
    .bandwidth(d => d = 25);

var svgLine = fc.seriesSvgLine()
    .crossValue(function(_, i) { return i; })
    .mainValue(function(d) { return d; });

var svgMulti2 = fc.seriesSvgMulti()
    .xScale(xScale)
    .yScale(yScale)
    .series(dataArray.map((d, i) => svgBarPicker(i)));

var svgMulti = fc.seriesSvgMulti()
    .xScale(xScale)
    .yScale(yScale)
    .series([svgBar]);    

container.append('g')
    .datum(data)
    .call(svgMulti2);

    

    