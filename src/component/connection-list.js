import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ConnectionList = ({graph, updateNode}) =>
    <Scrollbars style={{height: 500}}>
        <div className={'connection-view'}>
            {graph.display(updateNode)}
        </div>
    </Scrollbars>
;

export default ConnectionList;