import React, { Component }from 'react';

import RegresionOutlierDetector from './models/RegressionOutlierDetector.js';
import aaplData from './models/dataFile.js';
import OutlierDetector from './components/OutlierDetector.jsx';
import styles from "../css/index.css";


class App extends React.Component {
    render(){
        return (
          <div className="App">
        <h1>Outlier Detection With Linear Regression</h1>
        <p className="App-intro">

        </p>
        <div className="stock-description">
          <h2>AAPL 2014</h2>
          <OutlierDetector />
        </div>
        <div className="graph-pane"></div>
        <hr></hr>
        <div className="regression-description">
          <h2>Description</h2>
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
        );
    }
}

export default App;
