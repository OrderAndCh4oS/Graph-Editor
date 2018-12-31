import React from 'react';

const ConnectionView = ({source, destination}) =>
    <div className={'connection'}>
        {source.get_name()} -> {destination.get_name()}
    </div>
;

export default ConnectionView;