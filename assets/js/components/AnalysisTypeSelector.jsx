import React from 'react';

class AnalysisTypeSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'select'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {

  }
  handleChange() {

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label className="selector-label">
          Analysis Type:
          <select className="option-selector" value={this.state.value}>
            <option value="outlier">Outlier Detection</option>
          </select>
        </label>
      </form>
      </div>
    )
  }
}

export default AnalysisTypeSelector;
