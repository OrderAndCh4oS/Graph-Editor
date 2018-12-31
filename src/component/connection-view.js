import React from 'react';
import NodeView from './node-view';

const ConnectionView = ({source, destination}) =>
    <div className={'connection'}>
        <NodeView node={source}/> -> <NodeView node={destination}/>
    </div>
;

export default ConnectionView;