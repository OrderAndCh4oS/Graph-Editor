import React, { Fragment } from 'react';
import SeedNode from '../graph/seed-node';

const NodeView = ({node, updateNode}) =>
    node instanceof SeedNode
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
            <span>{node.id}: {node.value}</span>
        </Fragment>
;

export default NodeView;