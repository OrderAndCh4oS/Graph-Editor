import { Graph } from 'react-d3-graph';
import React, { Component } from 'react';

const myConfig = {
    height: 500, width: 1400,
    maxZoom: 2, minZoom: 0.8, focusZoom: 1.5,
    nodeHighlightBehavior: true,
    automaticRearrangeAfterDropNode: false,
    directed: true,
    d3: {
        gravity: -190,
        linkLength: 75,
        linkStrength: 0.5,
    },
    node: {
        color: 'lightgrey',
        size: 150,
        highlightStrokeColor: 'grey',
        labelProperty: (node) => node.label + '\n' + node.value,
    },
    link: {
        highlightColor: 'slategrey',
    },
};

class GraphView extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className={'graph-view panel'}>
                <Graph
                    key={data.hash}
                    id="graph-id" className={'graph-visual'} data={data}
                    config={myConfig}
                />
            </div>
        );
    }
}

export default GraphView;
