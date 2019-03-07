import prettifyValue from '../utility/prettify-value';

// function fontColor(color) {
//     const hexNumber = parseInt(color.substr(1), 16);
//     const midHexValue = (255*255*255) / 2;
//     return parseInt(hexNumber > midHexValue ? 'black' : 'white');
// }

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
            label: (`${edge.node.id}\n${prettifyValue(
                edge.node.value,
                edge.node.conv,
                edge.node.prefix,
                edge.node.suffix,
            )}`) || '',
            title: edge.node.title || '',
            fontColor: 'white',
            fontFace: 'Tahoma',
            color: {
                background: edge.node.color,
                border: edge.node.color,
                highlight: {
                    background: '#a9daac',
                    border: '#a9daac',
                },

            },
        });
        data.edges = [
            ...data.edges,
            ...edge.edges.map(makeLink(edge))];
    }

    console.log('DATA2:', data);
    return data;
};

export default transformGraphToGraphViewVis;
