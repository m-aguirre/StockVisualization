import React from 'react';


class Landing extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner-container">
          <div className="demo-container"></div>
          <div className="landing-text-container">
            <p>A place to view animated visualizations of common models used to
            evaluate stocks.</p>

          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
