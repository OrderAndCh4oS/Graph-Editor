import getProperty from '../utility/get-property';

const transformGraphNodesToJson = (graph) =>
    graph.edges.map(edge => {
        return {
            uuid: edge.node.uuid,
            id: edge.node.id,
            label: edge.node.label,
            title: edge.node.title,
            prefix: edge.node.prefix,
            value: edge.node.value,
            suffix: edge.node.suffix,
            conv: edge.node.conv,
            equn: getProperty(edge.node.equn),
            min: edge.node.min,
            max: edge.node.max,
            step: edge.node.step,
            color: edge.node.color,
        };
    });

export default transformGraphNodesToJson;
