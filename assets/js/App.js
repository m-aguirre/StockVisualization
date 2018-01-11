import React, { Component }from 'react';
import axios from 'axios';

import RegresionOutlierDetector from './models/RegressionOutlierDetector.js';
import SymbolInputField from './components/SymbolInputField.jsx';
import aaplData from './models/dataFile.js';
import OutlierDetector from './components/OutlierDetector.jsx';
import "../css/index.css";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSymbol: '',
      timeSeriesData: '',
      showOutlierDetector: false,
      invalidSymbolInput: false
    }

    this.getTimeSeriesData = this.getTimeSeriesData.bind(this);
  }

  getTimeSeriesData(symbol) {
    let that = this;
    this.setState({inputSymbol: symbol} , () => {
    //  var symbolRoute = 'search/' + symbol + '/';
      var symbolRoute = '/search/';
      axios.get(symbolRoute)
        .then( function(response) {
          console.log(response);
          that.setState({timeSeriesData: response.data, showOutlierDetector: true, invalidSymbolInput: false});
        })
        .catch( function(error) {
          console.log("Error in GET Request: ", error);
          that.setState({invalidSymbolInput: true});
        });
    });
  }
    render(){
        return (
      <div className="App">
        <h1 className="main-header">Stock Visualization</h1>
        <div className="input-form-container">
          <SymbolInputField submitSymbol={this.getTimeSeriesData}/>
          <p className="invalid-symbol-notification"> Invalid symbol!</p>
        </div>
        <p className="App-intro">

        </p>
        <div className="stock-description">
          <h2>{this.state.inputSymbol}</h2>

          {
            this.state.showOutlierDetector ?
            <OutlierDetector timeSeriesData={this.state.timeSeriesData}/> :
            <p>Please enter a valid stock symbol to get started (Ex: AAPL, TSLA, FB, etc.) </p>
          }
        </div>
      </div>
        );
    }
}

export default App;
