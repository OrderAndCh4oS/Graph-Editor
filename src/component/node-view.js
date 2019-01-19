import React from 'react';
import SeedNode from '../graph/seed-node';
import prettifyValue from '../utility/prettify-value';

const NodeView = ({node, updateNode}) => {
    return (
        <div className={'node-view'}>
            <p className={'node-title'}>
                {node.label},
                {' '}
                <span className={'node-text'}>{node.id}</span>
            </p>
            <label className={'node-label'}>
                {
                    node.prefix
                        ? <span className={'node-prefix'}>{node.prefix}</span>
                        : null
                }
                <input
                    type='number'
                    className={'node-input'}
                    value={prettifyValue(node.value, node.conv, false, false)}
                    min={node.min === null ? '0' : node.min}
                    max={node.max === null ? '' : node.max}
                    step={node.step === null ? '' : node.step}
                    onChange={(event) => updateNode(node, event)}
                    disabled={!(node instanceof SeedNode)}
                />
                {
                    node.suffix
                        ? <span className={'node-suffix'}>{node.suffix}</span>
                        : null
                }
            </label>
        </div>
    );
};

export default NodeView;