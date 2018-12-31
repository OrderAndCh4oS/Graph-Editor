import React from 'react';

const NodeView = ({node}) =>
    <span className={'node'}>
        {node.getId()}: {node.getValue()}
    </span>
;

export default NodeView;