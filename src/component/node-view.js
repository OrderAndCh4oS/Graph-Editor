import React, { Fragment } from 'react';
import SeedNode from '../graph/seed-node';
import prettifyValue from '../utility/prettify-value';

const NodeView = ({node, updateNode}) => {
    let value = prettifyValue(node.value, node.conv, node.unit);
    return node instanceof SeedNode
        ? <Fragment>
            <label>
                <span>{node.id}{' '}</span>
                <input
                    type='number'
                    className={'node'}
                    value={prettifyValue(node.value, node.conv, false)}
                    min={node.min === '-' ? '0' : node.min}
                    max={node.max === '-' ? '' : node.max}
                    step={node.step === '-' ? '' : node.step}
                    onChange={(event) => updateNode(node, event)}
                />
                {node.unit}
            </label>
        </Fragment>
        : <Fragment>
            <span>{node.id} {value}</span>
        </Fragment>;
};

export default NodeView;