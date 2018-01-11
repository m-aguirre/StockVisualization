import React from 'react';


class SymbolInputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({inputText: e.target.value.toUpperCase()});
  }

  handleSubmit(e) {
    this.props.submitSymbol(this.state.inputText);
    e.preventDefault();
  }

  render() {
    return (
      <div className="symbol-input-field-container">
        <form className="symbol-input-form" onSubmit={this.handleSubmit}>
          <label>
            Symbol:
            <input type="text" name="symbol" value={this.state.inputText} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SymbolInputField;
