import React, { Component } from 'react';
import './App.css';
import BuildGraph from './component/build-graph';

class App extends Component {
    render() {
        return (
            <div className="app">
                <BuildGraph/>
                {/*<PreloadedGraph/>*/}
            </div>
        );
    }
}

export default App;
