import { Graph } from 'react-d3-graph';
import React from 'react';

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    height: 500, width: 1240, maxZoom: 8, minZoom: 5,
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 150,
        highlightStrokeColor: 'blue',
        labelProperty: (node) => node.id + '\n' + node.value,
    },
    link: {
        highlightColor: 'lightblue',
    },
};
const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};

const GraphView = ({graph}) => {

    const data = {nodes: [], links: []};
    for(const edge of graph.edges) {
        data.nodes.push({
            id: edge.node.id,
            value: edge.node.value,
        });
        data.links = [
            ...data.links, ...edge.edges.map(e => ({
                    source: edge.node.id,
                    target: e.id,
                }),
            )];
    }

    console.log(data);

    return (
        <div className={'graph-view'}>
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                className={'graph-visual'}
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
            />
        </div>
    );
};

export default GraphView;