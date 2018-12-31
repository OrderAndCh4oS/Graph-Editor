import React from 'react';

const NodeView = ({node}) =>
    <span className={'node'}>
        {node.get_name()}: {node.get_value()}
    </span>
;

export default NodeView;