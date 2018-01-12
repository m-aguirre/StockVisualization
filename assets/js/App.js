import React, { Component }from 'react';
import axios from 'axios';

import RegresionOutlierDetector from './models/RegressionOutlierDetector.js';
import SymbolInputField from './components/SymbolInputField.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';
import aaplData from './models/dataFile.js';
import OutlierDetector from './components/OutlierDetector.jsx';
import "../css/index.css";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSymbol: '',
      timeSeriesData: '',
      invalidSymbolInput: false,
      showSelectionContainer: false,
      showOutlierDetector: false,
      model: 'none'
    }

    this.getTimeSeriesData = this.getTimeSeriesData.bind(this);
    this.updateModelSelection = this.updateModelSelection.bind(this);
  }

  getTimeSeriesData(symbol) {
    let that = this;
    this.setState({inputSymbol: symbol} , () => {
      var symbolRoute = 'search/' + symbol + '/';
      console.log(symbolRoute);
      //symbolRoute = '/search/';
      axios.get(symbolRoute)
        .then( function(response) {
          console.log(response);
          if (response.data === "NOT FOUND") {
            that.setState({invalidSymbolInput: true})
          } else {
            that.setState({timeSeriesData: response.data, showSelectionContainer: true, invalidSymbolInput: false});
          }
        })
        .catch( function(error) {
          console.log("Error in GET Request: ", error);
          that.setState({invalidSymbolInput: true});
        });
    });
  }
  updateModelSelection(model) {
    this.setState({model: model, showOutlierDetector: true} , () => {console.log(this.state)})
  }
    render(){
        return (
      <div className="App">
        <h1 className="main-header">Stock Visualization</h1>
        <div className="input-form-container">
          <SymbolInputField submitSymbol={this.getTimeSeriesData}/>
          {
            this.state.invalidSymbolInput ?
            <p className="invalid-symbol-notification"> Invalid symbol!</p> :
            null
          }
        </div>
        <p className="App-intro">

        </p>
        <div className="stock-description">
          {
            this.state.showSelectionContainer ?
            <SelectionContainer symbol={this.state.inputSymbol} selectModel={this.updateModelSelection}/> :
            <p>Please enter a valid stock symbol to get started (Ex: AAPL, TSLA, FB, etc.) </p>
          }
          {
            this.state.showOutlierDetector ?
            <OutlierDetector timeSeriesData={this.state.timeSeriesData}/> :
            null
          }
        </div>
      </div>
        );
    }
}

export default App;
