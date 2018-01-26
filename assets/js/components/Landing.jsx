import React from 'react';

import DemoBox from './DemoBox.jsx';
import img from '../../images/downArrowVector.png';
class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.scroll = this.scroll.bind(this);
  }

  scroll() {

    var smoothScroll = (limit) => {
      let i = window.scrollY;
      while (i < limit ) {
        ((i)=> { setTimeout(() =>{
          window.scrollTo(window.scrollY,i)
        }, i)
        })(i++);
      }
    }

    var elem = document.getElementsByClassName('input-form-container')[0]
    var bound = elem.getBoundingClientRect();
    smoothScroll(bound.y);
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner-container">
          <div className="landing-text-container">
            <p> View animated visualizations of models applied to stock market data
            </p>

          </div>
          <div className="demo-container">
            <DemoBox />
          </div>
        </div>
        <div className="down-arrow" onClick={this.scroll} style={{backgroundImage: `url(${img})`}}></div>
      </div>
    )
  }
}

export default Landing;
