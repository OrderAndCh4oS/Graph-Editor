import prettifyValue from '../utility/prettify-value';

const transformGraphToGraphView = (graph) => {
    const data = {nodes: [], links: [], hash: ''};
    let nodesAndConnections = '';
    const makeLink = (edge) => (node) => {
        nodesAndConnections += edge.node.uuid + node.uuid;
        return {
            source: edge.node.uuid,
            target: node.uuid,
        };
    };
    for(const edge of graph.edges) {
        nodesAndConnections += edge.node.uuid + edge.node.value;
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
            ...data.links,
            ...edge.edges.map(makeLink(edge))];
    }
    data.hash = Buffer.from(nodesAndConnections).toString('base64');
    return data;
};

export default transformGraphToGraphView;
