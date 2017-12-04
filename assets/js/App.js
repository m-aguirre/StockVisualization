import React, { Component }from 'react';

import RegresionOutlierDetector from './models/RegressionOutlierDetector.js';
import aaplData from './models/dataFile.js';
import OutlierDetector from './components/OutlierDetector.jsx';

//s
class App extends React.Component {
    render(){
        return (
            <OutlierDetector />
        );
    }
}

export default App;
