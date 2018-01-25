import React from 'react';

import DemoBox from './DemoBox.jsx';

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
    //scrollTo(0, h.y + window.scrollY)
    // document.querySelector('.input-form-container').scrollIntoView(true,
    // {
    //   behavior: 'smooth'
    // });
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner-container">
          <div className="landing-text-container">
            <p>A place to view animated visualizations of common models used to
            evaluate stocks.</p>

          </div>
          <div className="demo-container">
            <DemoBox />
          </div>
        </div>
        <div className="down-arrow" onClick={this.scroll}></div>
      </div>
    )
  }
}

export default Landing;
