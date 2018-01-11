import React from 'react';


class ModelSelector extends React.Component {
  constructor(props){
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
          Model Type:
          <select className="option-selector" value={this.state.value}>
            <option value="linearRegression">Linear Regression</option>
          </select>
        </label>
      </form>
      </div>
    )
  }
}

export default ModelSelector;
