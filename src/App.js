import React, { Component } from 'react';
import './App.css';
import BuildGraph from './component/build-graph';

class App extends Component {
    render() {
        return (
            <div className="app">
                <BuildGraph/>
            </div>
        );
    }
}

export default App;
