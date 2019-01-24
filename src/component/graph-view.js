import { Graph } from 'react-d3-graph';
import React from 'react';
import prettifyValue from '../utility/prettify-value';

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    height: 500, width: 800,
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

const GraphView = ({graph}) => {
    const data = {nodes: [], links: []};
    for(const edge of graph.edges) {
        data.nodes.push({
            id: edge.node.uuid,
            label: edge.node.id || '',
            color: edge.node.color,
            value: prettifyValue(
                edge.node.value,
                edge.node.conv,
                edge.node.prefix,
                edge.node.suffix,
            ) || '',
        });
        data.links = [
            ...data.links, ...edge.edges.map(node => ({
                source: edge.node.uuid,
                target: node.uuid,
                }),
            )];
    }

    return (
        <div className={'graph-view'}>
            {data.nodes.length ? <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                className={'graph-visual'}
                data={data} config={myConfig} onClickNode={onClickNode}
            /> : null}
        </div>
    );
};

export default GraphView;
