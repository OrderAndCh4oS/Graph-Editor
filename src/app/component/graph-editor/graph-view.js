import { Graph } from 'react-d3-graph';
import React, { Component } from 'react';
import transformGraphToGraphView
    from '../../transform/transform-graph-to-graph-view';

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
        const {graph} = this.props;
        return (
            <div className={'graph-view panel'}>
                {graph.edges.length ? <Graph
                    id="graph-id"
                    className={'graph-visual'}
                    data={transformGraphToGraphView(graph)}
                    config={myConfig}
                /> : null}
            </div>
        );
    }
}

export default GraphView;
