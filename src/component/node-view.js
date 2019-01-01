import React from 'react';

const NodeView = ({node}) =>
    <span className={'node'}>
        {node.id}: {node.value}
    </span>
;

export default NodeView;