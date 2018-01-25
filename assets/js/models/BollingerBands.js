import * as d3 from "d3";
import DateScale from "./DateScale.js"

class BollingerBands {
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

    this.container = document.getElementsByClassName('graph-pane')[0];
    this.width = this.container.width;
    this.height = this.container.height;

    this.upperBand = data;
    this.lowerBand = data;

    d3.select('.viewport').remove();
    this.addViewport()
    this.rollingMeanData = this.rollingMean(this.data, 7)

  }
  maxYdomain() {
    return parseInt(this.dataSummary.maxClosingValue) + (parseInt(this.dataSummary.maxClosingValue)/12.0);
  }

  minYdomain() {
    return parseInt(this.dataSummary.minClosingValue) - (parseInt(this.dataSummary.minClosingValue)/12.0);
  }

  addViewport() {
    d3.select('.graph-pane')
      .append('svg')
      .attr('class', 'viewport')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox','0 0 '+Math.min(this.width,this.height) +' '+Math.min(this.width,this.height) )
      .attr('preserveAspectRatio','xMinYMin')

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

  placeLine(data, type) {
    var lineColor;
    var opacity = 0;
    var duration = 0;
    switch(type) {
      case "rolling":
        lineColor = '#d9dbe2'
        break;
      case "bband":
        lineColor = '#1d3bc1'
        duration  = 1500
        break;
      case "lower":
        lineColor = 'green'
        break;
      default:
        lineColor = 'black'
    }
    var d3ViewPort = d3.select('.viewport')
    var svg = d3ViewPort.insert('svg')

     var line = d3.line()
       .x((d) => { return this.xScale(d["Date"])})
       .y((d) => { return this.yScale(d["Adj. Close"])})

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2.5)
        .attr("d", line(data))
        .style('opacity', 0)
        .transition()
        .duration(duration)
        .style('opacity', 1)
  }

  calculateSD(data, mean) {
    var sumSquares = data.reduce( (sum, d) => {
      return (sum + (Math.pow((d - mean), 2)))
    }, 0)
    return Math.sqrt(sumSquares / (data.length));
  }

  rollingMean(data, nDays) {
    var rollingMeanData = data.map(a => Object.assign({}, a));
    var rollingStorage = [];
    for (let i = 0; i < data.length - nDays; i++) {
      rollingStorage.push(rollingMeanData[i]["Adj. Close"]);
      if (i >= nDays) {
        rollingStorage.shift();
        var sum = rollingStorage.reduce( (sum,val) =>  {return  sum + val}, 0)
        var mean = sum / nDays
        rollingMeanData[i]["Adj. Close"] = mean;
        rollingMeanData[i]['rollingSD'] = this.calculateSD(rollingStorage, mean);
      } else {
        rollingMeanData.shift();
      }
    }
    return rollingMeanData;
  }
  createBands() {
    var upperBand = this.rollingMeanData.map(a => Object.assign({}, a));
    var lowerBand = this.rollingMeanData.map(a => Object.assign({}, a));
    for (let i = 0; i < upperBand.length; i++) {
      if (upperBand[i]['rollingSD']) {
        upperBand[i]["Adj. Close"] = upperBand[i]["Adj. Close"] + (2 * upperBand[i]['rollingSD']);
        lowerBand[i]["Adj. Close"] = lowerBand[i]["Adj. Close"] - (2 * lowerBand[i]['rollingSD']);
      }
    }
    this.upperBand = upperBand;
    this.lowerBand = lowerBand;
  }
  plot() {
    this.placeLine(this.rollingMeanData, 'rolling')
    this.createBands()
    this.placeLine(this.upperBand, 'bband')
    this.placeLine(this.lowerBand, 'bband')
    this.placeLine(this.data)
  }
}

export default BollingerBands;
