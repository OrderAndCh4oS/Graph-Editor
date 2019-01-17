import React from 'react';
import NodeView from './node-view';

const ConnectionView = ({source, destination, updateNode}) =>
    <div className={'connection'}>
        <NodeView node={source} updateNode={updateNode}/>
        <div className={''}>{' ⟶ '}</div>
        <NodeView node={destination} updateNode={updateNode}/>
    </div>
;

export default ConnectionView;