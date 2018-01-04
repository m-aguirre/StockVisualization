import React from 'react';

class SymbolInputField extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="symbol-input-field-container">
        <form>
          <label>
            Symbol:
            <input type="text" name="symbol" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SymbolInputField;
