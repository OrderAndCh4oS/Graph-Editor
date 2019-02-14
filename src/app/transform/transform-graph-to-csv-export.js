import getProperty from '../utility/get-property';

const transformGraphToCsvExport = (graph) =>
    graph.edges.map(n => {
        return {
            id: n.node.id,
            label: n.node.label,
            title: n.node.title,
            prefix: n.node.prefix,
            value: n.node.value,
            suffix: n.node.suffix,
            conv: n.node.conv,
            equn: getProperty(n.node.equn),
            min: n.node.min,
            max: n.node.max,
            step: n.node.step,
            color: n.node.color,
        };
    });

export default transformGraphToCsvExport;
