import Graph from 'react-graph-vis';
import React, { Component } from 'react';

class GraphViewVis extends Component {
    options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            color: '#000000',
        },
        height: '500px',
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
