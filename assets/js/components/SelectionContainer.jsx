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

        <AnalysisTypeSelector />
        <ModelSelector />
      </div>
    )
  }
}

export default SelectionContainer;
