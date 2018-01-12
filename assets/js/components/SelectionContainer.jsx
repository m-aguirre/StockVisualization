import React from 'react';

import AnalysisTypeSelector from './AnalysisTypeSelector.jsx';
import ModelSelector from './ModelSelector.jsx';

class SelectionContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="selection-container">
        <div className="symbol-display">
          <h2>Stock: {this.props.symbol}</h2>
        </div>
        <AnalysisTypeSelector />
        <ModelSelector selectModel={this.props.selectModel}/>
      </div>
    )
  }
}

export default SelectionContainer;
