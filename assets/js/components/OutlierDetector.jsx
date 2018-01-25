import React from 'react';

import aaplData from '../models/dataFile.js';
import RegressionOutlierDetector from '../models/RegressionOutlierDetector.js';
import BollingerBands from '../models/BollingerBands.js';

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
    //Push desired data into temporary storage array
    for (var i = 0; i < sourceData.length; i++) {
      if (sourceData[i] != null && sourceData[i].Date.valueOf() > startDate) {
        data.push(sourceData[i]);
      }
    }
    var graph;
    switch(this.props.model) {
      case "linearRegression":
        graph = new RegressionOutlierDetector(data, daysToSubtract);
        break;
      case "bollingerBands":
        graph = new BollingerBands(data, daysToSubtract);
        break;
    }
  //  var graph = new RegressionOutlierDetector(data, daysToSubtract);
    graph.plot();
  }

  render() {
    return (
      <div>
        <div className="time-interval-button-container">
          <div className="time-interval-button" onClick={ () => {this.show(60)}}><p>2M</p></div>
          <div className="time-interval-button" onClick={ () => {this.show(90)}}><p>3M</p></div>
          <div className="time-interval-button" onClick={ () => {this.show(180)}}><p>6M</p></div>
          <div className="time-interval-button" onClick={ () => {this.show(365)}}><p>1Y</p></div>
        </div>
        <div className="graph-pane"></div>
        <hr></hr>
      
      </div>
    )
  }
}

export default OutlierDetector;
