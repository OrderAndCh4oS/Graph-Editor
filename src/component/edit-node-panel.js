import React, { Component } from 'react';

const EditNodeInput = ({label, value, handleOnChange, type}) =>
    <div className={'edit-node--input-holder'}>
        <label className={'edit-node-label'}>
            <span className={'node-text'}>{label}</span>
            <input
                type={type}
                className={'node-input edit-node--input'}
                defaultValue={value}
                onChange={handleOnChange}
            />
        </label>
    </div>
;

export default class EditNodePanel extends Component {
    updateValue = (key, value) => {
        const {uid} = this.props;
        this.props.updateNode(uid, key, value);
    };

    render() {
        const {node} = this.props;
        return (
            <div className={'edit-node--panel'}>
                <EditNodeInput
                    label={'Id'} value={node.id}
                    handleOnChange={e => this.updateValue('id', e.target.value)}
                />
                <EditNodeInput
                    label={'Label'} value={node.label}
                    handleOnChange={e => this.updateValue('label',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Title'} value={node.title}
                    handleOnChange={e => this.updateValue('title',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Value'} value={node.value}
                    type='number'
                    handleOnChange={e => this.updateValue('value',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Conversion'} value={node.conv}
                    type='number'
                    handleOnChange={e => this.updateValue('conv',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Minimum Value'} value={node.min}
                    type='number'
                    handleOnChange={e => this.updateValue('min',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Maximum Value'} value={node.max}
                    type='number'
                    handleOnChange={e => this.updateValue('max',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Step'} value={node.step}
                    type='number'
                    handleOnChange={e => this.updateValue('step',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Equation'} value={node.equn}
                    handleOnChange={e => this.updateValue('equn',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Prefix'} value={node.prefix}
                    handleOnChange={e => this.updateValue('prefix',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Suffix'} value={node.suffix}
                    handleOnChange={e => this.updateValue('suffix',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Colour'} value={node.color}
                    handleOnChange={e => this.updateValue('color',
                        e.target.value)}
                />
            </div>
        );
    }
}
