import React from 'react';

import Demo from '../models/Demo.js';

class DemoBox extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var demo = new Demo();
    demo.plot()
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default DemoBox;
