import React, { Component } from 'react';
import SeedNode from '../graph/seed-node';
import EditNodeInput from './edit-node-input';

export default class EditNodePanel extends Component {
    updateValue = (key, value) => {

        this.props.updateNode(key, value);
    };

    render() {
        const {node, removeNode} = this.props;
        return (
            <div className={'edit-node--panel'}>
                <EditNodeInput
                    label={'Id'}
                    value={node.id}
                    handleOnChange={e => this.updateValue(
                        'id', e.target.value,
                    )}
                />
                <EditNodeInput
                    label={'Label'}
                    value={node.label}
                    handleOnChange={e => this.updateValue(
                        'label',
                        e.target.value,
                    )}
                />
                <EditNodeInput
                    label={'Title'}
                    value={node.title}
                    handleOnChange={e => this.updateValue(
                        'title',
                        e.target.value,
                    )}
                />
                {
                    node instanceof SeedNode
                        ? <EditNodeInput
                            label={'Value'}
                            value={node.value}
                            type='number'
                            handleOnChange={e =>
                                this.updateValue(
                                    'value',
                                    e.target.value)
                            }
                        />
                        : <EditNodeInput
                            label={'Equation'}
                            value={node.equn}
                            handleOnChange={e =>
                                this.updateValue(
                                    'equn',
                                    e.target.value)
                            } className={'node-input--grow'}
                        />
                }
                <EditNodeInput
                    label={'Conversion'} value={node.conv}
                    type='number' handleOnChange={e => this.updateValue(
                    'conv',
                    e.target.value,
                )}
                />
                {node instanceof SeedNode ?
                    <EditNodeInput
                        label={'Minimum'}
                        value={node.min}
                        type='number' handleOnChange={e => this.updateValue(
                        'min',
                        e.target.value,
                    )} className={'node-input--narrow'}
                    />
                    : null}
                {node instanceof SeedNode ?
                    <EditNodeInput
                        label={'Maximum'}
                        value={node.max}
                        type='number' handleOnChange={e => this.updateValue(
                        'max',
                        e.target.value,
                    )} className={'node-input--narrow'}
                    />
                    : null}
                {node instanceof SeedNode ?
                    <EditNodeInput
                        label={'Step'}
                        value={node.step}
                        type='number' handleOnChange={e => this.updateValue(
                        'step',
                        e.target.value,
                    )} className={'node-input--narrow'}
                    />
                    : null}
                <EditNodeInput
                    label={'Prefix'}
                    value={node.prefix}
                    handleOnChange={e => this.updateValue(
                        'prefix',
                        e.target.value,
                    )} className={'node-input--narrow'}
                />
                <EditNodeInput
                    label={'Suffix'}
                    value={node.suffix}
                    handleOnChange={e => this.updateValue(
                        'suffix',
                        e.target.value,
                    )} className={'node-input--narrow'}
                />
                <EditNodeInput
                    label={'Colour'}
                    value={node.color}
                    handleOnChange={e => this.updateValue(
                        'color',
                        e.target.value,
                    )} className={'node-input--narrow'}
                />
                <div className={'edit-node--action-column'}>
                    <button
                        className={'button button--remove-node'}
                        onClick={removeNode}
                    >x
                    </button>
                </div>
            </div>
        );
    }
}
