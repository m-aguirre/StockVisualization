import * as d3 from "d3";
import aaplData from './dataFile.js';

class Demo {
  constructor(data, daysToSubtract) {
    this.data = aaplData;
    this.dataSummary = {
      minClosingValue: d3.min(this.data, (d) => {return d["close"]}),
      maxClosingValue: d3.max(this.data, (d) => {return d["close"]}),
    }

    this.endDate = Date.parse(new Date());

  //  this.xcoord = new DateScale(daysToSubtract);
    this.xScale = d3.scaleTime()
        .domain([
          new Date(Date.parse("2014-01-01")),
          new Date(Date.parse("2015-01-01"))
        ])
        .range([0, 600]);
  //  this.xScale = this.xcoord.xScale;

    //creates y scale based on min and max closing prices
    this.yScale = d3.scaleLinear()
        .domain([this.maxYdomain(),this.minYdomain()])
        .range([0,450]);
    this.xAxis = d3.axisBottom(this.xScale).ticks(10);
    this.yAxis = d3.axisLeft(this.yScale).ticks(6);


    this.container = document.getElementsByClassName('demo-container')[0];
    this.width = this.container.width;
    this.height = this.container.height;

    this.addViewport();
  }

  //Calculate min and max values for y axis, high/low +/- 20%
  maxYdomain() {
    return parseInt(this.dataSummary.maxClosingValue) + (parseInt(this.dataSummary.maxClosingValue)/5.0);
  }

  minYdomain() {
    return parseInt(this.dataSummary.minClosingValue) - (parseInt(this.dataSummary.minClosingValue)/5.0);
  }

  addViewport() {
    d3.select('.demo-container')
      .append('svg')
      .attr('class', 'demoport')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox','0 0 '+Math.min(this.width,this.height) +' '+Math.min(this.width,this.height) )
      .attr('preserveAspectRatio','xMinYMin')

    this.placeXAxis();
    this.placeYAxis();
  }

  placeXAxis() {
    d3.select('.demoport')
    .append('g')
    .attr('transform', 'translate(0,' + (450) + ')') //putting it at 'height' (== 250) pushes scale off the graph
    .call(this.xAxis)
  }

  placeYAxis() {
    d3.select('.demoport')
    .append('g')
    .attr('transform', 'translate(0,' + 0 + ')')
    .call(this.yAxis)
  }

  plot() {
    var d3ViewPort =  d3.select('.demoport')
    var svg = d3ViewPort.append('svg')

    var line = d3.line()
    .x((d) => { return this.xScale(Date.parse(d.date))})
    .y((d) => { return this.yScale(d.close)})
    var path = svg.append("path")
     .datum(this.data)
     .attr("id", "demoLine")
     .attr("fill", "none")
     .attr("stroke", "red")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 2.5)
     .attr("d", line(this.data))

     var totalLength = path.node().getTotalLength();

     d3.select("#demoLine")
      .attr("stroke-dasharray", totalLength + " " + totalLength )
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attr("stroke-dashoffset", 0)
      .style('opacity', 1)
      .transition()
      .duration(1500)
      .style('opacity', 0)
      .remove()

      setTimeout(()=> {this.plotDataPoints()}, 5000)

    }

}

export default Demo;