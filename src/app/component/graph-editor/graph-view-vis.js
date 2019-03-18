import Graph from 'react-graph-vis';
import React, { Component } from 'react';

class GraphViewVis extends Component {
    options = {
        layout: {
            hierarchical: false,
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -1700,
                centralGravity: 0.2,
                springLength: 110,
                springConstant: 0.08,
                damping: 0.08,
                avoidOverlap: 0.1,
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            solver: 'barnesHut',
            timestep: 0.5,
            adaptiveTimestep: true,
        },
        nodes: {
            mass: 1.8,
            shape: 'dot',
            size: 9,
            font: {
                face: 'verdana',
                size: 14,
                strokeWidth: 2,
                strokeColor: '#efefef',
            },
            color: {
                highlight: {
                    background: '#a9daac',
                    border: '#a9daac',
                },
            },
        },
        edges: {
            color: 'green',
        },
        height: '640px',
    };

    render() {
        const {data} = this.props;
        console.log('DATA: ', data);
        return (
            <div className={'graph-view panel'}>
                <Graph
                    id="graph-id"
                    className={'graph-visual'}
                    options={this.options}
                    graph={data}
                />
            </div>
        );
    }
}

export default GraphViewVis;
