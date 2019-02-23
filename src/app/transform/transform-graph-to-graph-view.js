import prettifyValue from '../utility/prettify-value';

const transformGraphToGraphView = (graph) => {
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
            ...data.links,
            ...edge.edges.map(node => ({
                    source: edge.node.uuid,
                    target: node.uuid,
                }),
            )];
    }
    return data;
};

export default transformGraphToGraphView;
