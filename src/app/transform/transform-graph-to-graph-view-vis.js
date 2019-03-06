import prettifyValue from '../utility/prettify-value';

const transformGraphToGraphViewVis = (graph) => {
    const data = {nodes: [], edges: []};
    const makeLink = (edge) => (node) => {
        return {
            from: edge.node.uuid,
            to: node.uuid,
        };
    };
    for(const edge of graph.edges) {
        data.nodes.push({
            id: edge.node.uuid,
            label: edge.node.id || '',
            title: edge.node.title || '',
            color: edge.node.color,
            value: prettifyValue(
                edge.node.value,
                edge.node.conv,
                edge.node.prefix,
                edge.node.suffix,
            ) || '',
        });
        data.edges = [
            ...data.edges,
            ...edge.edges.map(makeLink(edge))];
    }

    console.log('DATA2:', data);
    return data;
};

export default transformGraphToGraphViewVis;
