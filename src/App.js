import React, { Component } from 'react';
import './App.css';
import BuildGraph from './component/build-graph';
import * as Papa from 'papaparse';
import trainFares from './data/train-fares-model';

class App extends Component {
    render() {
        console.log(Papa.unparse(trainFares));
        return (
            <div className="app">
                <BuildGraph/>
                {/*<PreloadedGraph/>*/}
            </div>
        );
    }
}

export default App;
