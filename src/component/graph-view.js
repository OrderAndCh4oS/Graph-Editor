import { Graph } from 'react-d3-graph';
import React from 'react';

const GraphView = ({data}) => {

    const myConfig = {
        height: 500, width: 1400,
        maxZoom: 2, minZoom: 0.8, focusZoom: 1.5,
        nodeHighlightBehavior: true,
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

    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    let combinedNodeIds = data.nodes.reduce((ids, n) => ids + n.uuid, '');
    const hash = Buffer.from(combinedNodeIds).toString('base64');

    return (
        <div className={'graph-view'}>
            {data.nodes.length ? <Graph
                key={hash}
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                className={'graph-visual'}
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
            /> : null}
        </div>
    );
};

export default GraphView;
