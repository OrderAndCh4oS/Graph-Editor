import React, { Fragment } from 'react';
import SeedNode from '../graph/seed-node';
import prettifyValue from '../utility/prettify-value';

const NodeView = ({node, updateNode}) => {
    let value = prettifyValue(node.value, node.conv, node.unit);
    return node instanceof SeedNode
        ? <Fragment>
            <label>
                {node.id}{': '}
                <input
                    className={'node'} value={node.value}
                    onChange={(event) => updateNode(node, event)}
                />
            </label>
        </Fragment>
        : <Fragment>
            <span>{node.id}: {value}</span>
        </Fragment>;
};

export default NodeView;