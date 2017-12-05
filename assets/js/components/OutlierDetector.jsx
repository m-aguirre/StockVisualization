import React from 'react';

import aaplData from '../models/dataFile.js';
import RegressionOutlierDetector from '../models/RegressionOutlierDetector.js'

class OutlierDetector extends React.Component {
  constructor(props) {
    super(props)

    this.show = this.show.bind(this);
    this.calculateStartDate = this.calculateStartDate.bind(this);
  }

  calculateStartDate(endDate, daysToSubtract) {
    var date = new Date(endDate);
    date.setDate(date.getDate() - daysToSubtract);
    return new Date(date);
  }

  show(daysToSubtract) {
    var sourceData = aaplData.aaplData;
    var startDate = this.calculateStartDate('2015-01-01', daysToSubtract);
    var data = [];
    //TODO add upper bound
    for (var i = 0; i < sourceData.length; i++) {
      if (sourceData[i] != null && new Date(sourceData[i].date).valueOf() > startDate.valueOf()) {
        data.push(Object.create(sourceData[i]));
      }
    }

    var graph = new RegressionOutlierDetector(data, '2015-01-01', daysToSubtract);
    graph.plotDataPoints();
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
