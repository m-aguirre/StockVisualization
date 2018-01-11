import React from 'react';

import aaplData from '../models/dataFile.js';
import RegressionOutlierDetector from '../models/RegressionOutlierDetector.js'

class OutlierDetector extends React.Component {
  constructor(props) {
    super(props)

    this.show = this.show.bind(this);
    this.calculateStartDate = this.calculateStartDate.bind(this);
  }

  calculateStartDate(daysToSubtract) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysToSubtract);
    return Date.parse(currentDate);
  }

  show(daysToSubtract) {
    //var sourceData = aaplData.aaplData;
    var sourceData = this.props.timeSeriesData;
    var startDate = this.calculateStartDate(daysToSubtract);
    var data = [];
    //TODO add upper bound
    //Push desired data into temporary storage array
    for (var i = 0; i < sourceData.length; i++) {
      if (sourceData[i] != null && sourceData[i].Date.valueOf() > startDate) {
        data.push(sourceData[i]);
      }
    }

    var graph = new RegressionOutlierDetector(data, daysToSubtract);
    graph.plotDataPoints();
    console.log(data);
  }

  render() {
    return (
      <div className="time-interval-button-container">
        <div className="time-interval-button" onClick={ () => {this.show(60)}}><p>2M</p></div>
        <div className="time-interval-button" onClick={ () => {this.show(90)}}><p>3M</p></div>
        <div className="time-interval-button" onClick={ () => {this.show(180)}}><p>6M</p></div>
        <div className="time-interval-button" onClick={ () => {this.show(365)}}><p>1Y</p></div>
      </div>

    )
  }
}

export default OutlierDetector;
