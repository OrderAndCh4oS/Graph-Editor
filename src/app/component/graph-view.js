import { Graph } from 'react-d3-graph';
import React from 'react';
import transformGraphToGraphView
    from '../transform/transform-graph-to-graph-view';

const GraphView = ({graph, displayActiveNodeData}) => {

    const data = transformGraphToGraphView(graph);

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

    const onMouseOverNode = (nodeUuid) => {
        const edge = graph.edges.find(n => {
            return n.node.uuid === nodeUuid;
        });
        displayActiveNodeData(edge);
    };

    // Todo: find a less expensive way to handle updating component
    let combinedNodeIds = data.nodes.reduce((ids, n) => ids + n.uuid, '');
    const hash = Buffer.from(combinedNodeIds).toString('base64');

    console.log('Hash: ', hash);

    return (
        <div className={'graph-view panel'}>
            {data.nodes.length ? <Graph
                key={hash}
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                className={'graph-visual'}
                data={data}
                config={myConfig} onMouseOverNode={onMouseOverNode}
            /> : null}
        </div>
    );
};

export default GraphView;
