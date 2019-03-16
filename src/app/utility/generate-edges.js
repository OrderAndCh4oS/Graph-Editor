export default function * generateEdges(node) {
    const joins = node.equn.match(/{(.*?)}/g);
    for(let join of joins) {
        const id = join.replace(/^[{]|[}]+$/g, '');
        yield [id, node.id];
    }
}