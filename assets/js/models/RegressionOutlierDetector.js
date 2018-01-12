import * as d3 from "d3";
import DateScale from "./DateScale.js"

class RegressionOutlierDetector {
  constructor(data, daysToSubtract) {
    this.data = data;
    this.dataSummary = {
      minClosingValue: d3.min(this.data, (d) => {return d["Adj. Close"]}),
      maxClosingValue: d3.max(this.data, (d) => {return d["Adj. Close"]}),
      mean: 0,
      sd: 0,
      intercept: 0,
      regressionCoef: 0
    }
    this.daysToSubtract = daysToSubtract;
    //controls speed of animation
    this.delayFactor = 8;
    this.endDate = Date.parse(new Date());

    this.xcoord = new DateScale(daysToSubtract);
    this.xScale = this.xcoord.xScale;

    //creates y scale based on min and max closing prices
    this.yScale = d3.scaleLinear()
        .domain([this.maxYdomain(),this.minYdomain()])
        .range([0,450]);
    this.xAxis = d3.axisBottom(this.xScale).ticks(this.xcoord.numTicks);
    this.yAxis = d3.axisLeft(this.yScale).ticks(6);

    this.line = {
      start: {x: this.xcoord.startDate, y: 0},
      end: {x: this.endDate, y: 0 }
    }
    d3.select('.viewport').remove();
    this.calculateRegressionEquation(this.data);
    this.calculateSD(this.data);
    this.identifyOutliers(this.data, this.dataSummary.sd);
    this.addViewport();
  }

  /*
  Calculates number of milliseconds to delay drawing the regression line and
  data point color changes, based on the number of data points in our data set
  */
  millisecondDelay() {
    var ms = 0;
    for(var i = 0; i < this.data.length; i++)
      ms +=  this.delayFactor;
    return ms;
  }

  //Calculate min and max values for y axis, high/low +/- 20%
  maxYdomain() {
    return parseInt(this.dataSummary.maxClosingValue) + (parseInt(this.dataSummary.maxClosingValue)/5.0);
  }

  minYdomain() {
    return parseInt(this.dataSummary.minClosingValue) - (parseInt(this.dataSummary.minClosingValue)/5.0);
  }

  /*
  Finds the equation y = b0 + b1x1
  where our dependent variable y is the stock price
  and our independent variable is the number of days from the origin
  */
  calculateRegressionEquation(data) {

    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumXSquared = 0;
    var sumYSquared = 0;
    //var n = Object.keys(data).length;
    var n = data.length;

    data.forEach( (d) => {
      var date = d["Date"];
      var y = +d["Adj. Close"];
      //number of days between current date and start date - don't ask where 86400000 came from
      //TODO adjust so it counts the number of BUSINESS days and not total days
      var x = (Math.floor((date - this.xcoord.startDate)/86400000));
      console.log("x is: ", x);
      sumX += x;
      console.log("sumX is: ", sumX);
      sumY += y;
      sumXY += (x * y);
      sumXSquared += (x * x);
      sumYSquared += (y * y);
    });
    var b0 = ( ((sumY * sumXSquared) - (sumX * sumXY)) / ((n * sumXSquared) - (sumX * sumX)) );
    var b1 = ( ((n * sumXY) - (sumX * sumY)) / ((n * sumXSquared) - (sumX * sumX)) );

    // x variables
    var minDateNumeric = d3.min(this.data, (d) => { return Math.floor((d["Date"] - this.xcoord.startDate)/86400000)});
    var maxDateNumeric = d3.max(this.data, (d) => { return Math.floor((d["Date"] - this.xcoord.startDate)/86400000)});
    var startY = b0 + (minDateNumeric * b1);
    var endY = b0 + (maxDateNumeric * b1);

    //Set line start and end y-coordinates
    this.line.start.y = startY;
    this.line.end.y = endY;
    //Set summary regression coef & intercept
    this.dataSummary.intercept = b0;
    this.dataSummary.regressionCoef = b1;
  }

  calculateSD(data) {
    var mean = d3.mean(data, (d) => {return d["Adj. Close"]});
    this.dataSummary.mean = mean;
    var sumLeastSquares = data.reduce( (sum, d) => {
      return (sum + ((d["Adj. Close"]- mean) * (d["Adj. Close"] - mean)))
    }, 0)
    this.dataSummary.sd = Math.sqrt(sumLeastSquares / (Object.keys(data).length - 1));
  }

  //adds outlier tag to any stock date that is considered an outlier
  identifyOutliers(data, sigma) {
    sigma = sigma;
    if (this.daysToSubtract === 365) {
      sigma = sigma * 0.5;
    }
    var days = 0;
    data.forEach((d) => {
      var pointOnLine = ((Math.floor((d["Date"] - this.xcoord.startDate)/86400000)) * this.dataSummary.regressionCoef) + this.dataSummary.intercept;
      //var pointOnLine = (days * this.dataSummary.regressionCoef) + this.dataSummary.intercept;
      if (+d["Adj. Close"] > (pointOnLine + sigma) || +d["Adj. Close"] < (pointOnLine - sigma)) {
        d.outlier = true;
      }
      days++;
    });
  }

  addViewport() {
    d3.select('.graph-pane')
      .append('svg')
      .attr('class', 'viewport')
      .attr('width', 700)
      .attr('height', 450)

    this.placeXAxis();
    this.placeYAxis();
  }

  placeXAxis() {
    d3.select('.viewport')
    .append('g')
    .attr('transform', 'translate(0,' + (450) + ')') //putting it at 'height' (== 250) pushes scale off the graph
    .call(this.xAxis)
  }

  placeYAxis() {
    d3.select('.viewport')
    .append('g')
    .attr('transform', 'translate(0,' + 0 + ')')
    .call(this.yAxis)
  }

  plotDataPoints() {
  var d3ViewPort =  d3.select('.viewport')
  var svg = d3ViewPort.append('svg')
  var dots = svg.append('g')
  var that = this;
  for (var i = 0; i < this.data.length; i++){
    var data = []
    data.push(this.data[i]);
    dots.append("circle")
      .data(data)
      .attr("r", 0)
      .attr("cx", (d) => { return this.xScale(d["Date"]) })
      .attr("cy", (d) => { return this.yScale(d["Adj. Close"]) })
      .attr('close', data[0]["Adj. Close"])
      .attr('date', data[0]["Date"])
      .attr('outlier', (d) => { return (d.outlier ? true : false)})
      .on('mouseenter', function() {
        var dataPoint = d3.select(this);
        if (dataPoint.attr('outlier') === 'true') {
          that.showInfo(dataPoint);
          }
        })
        .on("mouseout", function() {
            d3.select('.viewport')
            .selectAll('rect').remove()
            d3.select('.viewport')
            .selectAll('.outlier-data').remove()
      })
      .style('stroke', 'black')
      .style('fill', 'white')
      .transition()
      .delay(this.delayFactor * i)
      .attr("r", 3.5)
        }
      setTimeout(() => {this.drawRegressionLine()}, this.millisecondDelay());
      setTimeout(() => {this.colorOutliersRed(this.data)}, this.millisecondDelay() + 750);
  }

  drawRegressionLine() {
    d3.select('.viewport')
    .append('g')
    .append('line')
    .attr('x1', this.xScale(this.line.start.x))
    .attr('y1', this.yScale(this.line.start.y))
    .attr('x2', this.xScale(this.line.start.x))
    .attr('y2', this.yScale(this.line.start.y))
    .transition()
    .duration(1000)
    .attr('x2', this.xScale(this.line.end.x))
    .attr('y2', this.yScale(this.line.end.y))
    .style('stroke', 'black')
    .style('stroke-width', 3)
  }

  colorOutliersRed(data) {
    d3.select('.viewport')
    .selectAll('circle')
    .transition()
    .duration(1200)
    .style('stroke', (d) => { return (d.outlier ? '#ff0202' : '#bcbcbc'); })
    .style('fill', (d) => { return (d.outlier ? '#ff0202' : '#bcbcbc'); })
  }

showInfo(outlier) {
  var date = new Date(parseInt(outlier.attr('date')));
  var outlierDate = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
  var cx;
  if (outlier.attr('cx') > 350) {
    cx = outlier.attr('cx') - 115;
  } else {
    cx = outlier.attr('cx');
 }
  var d3ViewPort =  d3.select('.viewport')
  var svg = d3ViewPort.append('svg')
  var rect = svg.append('rect')
  .attr('width', 125)
  .attr('height', 55)
  .attr('class', 'outlier-info-box')
  .attr('x', cx)
  .attr('y', outlier.attr('cy'))
  .attr('rx', 5)
  .attr('ry', 5)

  svg.append('text')
  .attr('class', 'outlier-data')
  .attr("dx", function(d){return cx + 10})
  .attr("dy", function(d){return +outlier.attr('cy') + 20})
  .text("Date: " + outlierDate)

  svg.append('text')
  .attr('class', 'outlier-data')
  .attr("dx", function(d){return cx + 10})
  .attr("dy", function(d){return +outlier.attr('cy') + 42.5})
  .text("Close: $" + outlier.attr('close').slice(0,5))
  }

}

export default RegressionOutlierDetector;
