import React, { Component }from 'react';
import axios from 'axios';

import RegresionOutlierDetector from './models/RegressionOutlierDetector.js';
import SymbolInputField from './components/SymbolInputField.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';
import aaplData from './models/dataFile.js';
import OutlierDetector from './components/OutlierDetector.jsx';
import "../css/index.css";
//

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSymbol: '',
      timeSeriesData: '',
      showLoadingWheel: false,
      invalidSymbolInput: false,
      showSelectionContainer: false,
      showOutlierDetector: false,
      model: 'none',
      activeModel: {
        linearRegression: false,
        bollingerBands: false
      }
    }

    this.getTimeSeriesData = this.getTimeSeriesData.bind(this);
    this.updateModelSelection = this.updateModelSelection.bind(this);
    this.setActiveModel = this.setActiveModel.bind(this);
    this.getActiveModel = this.getActiveModel.bind(this);
  }
  setActiveModel(model) {
    for (var key in this.state.activeModel) {
      this.state.activeModel[key] = false;
    }
    this.state.activeModel[model] = true;
  }
  getActiveModel() {
    for (var key in this.state.activeModel) {
      if (this.state.activeModel[key]) {
        return key;
      }
    }
  }

  getTimeSeriesData(symbol) {
    let that = this;
    this.setState({inputSymbol: symbol, invalidSymbolInput: false, showLoadingWheel: true} , () => {
      var symbolRoute = 'search/' + symbol + '/';
      //symbolRoute = '/search/';
      axios.get(symbolRoute)
        .then( function(response) {
          console.log(response);
          if (response.data === "NOT FOUND") {
            that.setState({invalidSymbolInput: true, showLoadingWheel: false})
          } else {
            that.setState({timeSeriesData: response.data, showSelectionContainer: true, invalidSymbolInput: false, showLoadingWheel: false});
          }
        })
        .catch( function(error) {
          console.log("Error in GET Request: ", error);
          that.setState({invalidSymbolInput: true});
        });
    });
  }
  updateModelSelection(model) {
    this.setActiveModel(model);
    this.setState({model: model, showOutlierDetector: true})
  }
    render(){
        return (
      <div className="App">
        <h1 className="main-header">Stock Visualization</h1>
        <div className="input-form-container">
          <SymbolInputField submitSymbol={this.getTimeSeriesData}/>
          {
            this.state.showLoadingWheel ?
            <div className="loading-wheel"></div> :
            null
          }
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
            this.state.model === 'linearRegression' ?
            <OutlierDetector timeSeriesData={this.state.timeSeriesData} model={this.getActiveModel()}/> :
            null
          }
          {
            this.state.model === 'bollingerBands' ?
            null :
            null
          }
        </div>
      </div>
        );
    }
}

export default App;
