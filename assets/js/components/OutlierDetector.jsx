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
    //Push desired data into temporary storage array
    for (var i = 0; i < sourceData.length; i++) {
      if (sourceData[i] != null && sourceData[i].Date.valueOf() > startDate) {
        data.push(sourceData[i]);
      }
    }
    var graph = new RegressionOutlierDetector(data, daysToSubtract);
    graph.plotDataPoints();
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
          <h2>Description</h2>
          <div className="regression-description">
            <p>
              Linear regression is a common mathematical model used to predict
              values from roughly linear data sets.  It works by calculating an
              equation for a line that has the minimum total vertical distance from itself
              to all the points in a data set. This "best fit line" and its associated equation
              can be used to describe data, as well as predict values based on changes to
              independent variables. We tend to expect that our data is normally distributed
              about the regression line, and thus have a basis for classifying a data point
              as an outlier numerically by relating its vertical distance from the line to
              the data set's standard deviation.  Generally from a normal distribution, 95% of data is within 2 standard
              deviations from the mean, so classifying data points that are more than 2 standard
              deviations above or below our regression line is a good baseline to start at.
            </p>

            <p>
              In the context of stock values, detecting outliers is useful when deciding to buy or sell a stock.
              A multi day succession of outlier closing prices may indicate that a stock is poised to revert to its mean,
              or that it is approaching a resistance/breakout point, or one of a million other possibilities.
              Outlier status is only one small part that should go into the decision of buying or selling a stock.
            </p>

            <p>
              For more information about linear regression and its relation to stock market data,
              visit <a href='http://www.investopedia.com/articles/trading/09/linear-regression-time-price.asp'>investopedia</a>
            </p>
          </div>
      </div>
    )
  }
}

export default OutlierDetector;
