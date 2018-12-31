import React from 'react';

const NodeView = ({node}) =>
    <div className={'node'}>
        {node.get_name()}
    </div>
;

export default NodeView;