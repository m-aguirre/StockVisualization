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
  handleChange(e) {
    this.setState({value: e.target.value});
    this.props.selectModel(e.target.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label className="selector-label">
          Model Type:
          <select className="selector" value={this.state.value}>
            <option className="selector-option" value="select">Select...</option>
            <option className="selector-option" value="linearRegression">Linear Regression</option>
            <option className="selector-option" value="bollingerBands">Bollinger Bands</option>
          </select>
        </label>
      </form>
      </div>
    )
  }
}

export default ModelSelector;
