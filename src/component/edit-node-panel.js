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
    state = {
        id: '',
        label: '',
        title: '',
        color: '',
        value: 0,
        conv: 1,
        suffix: null,
        prefix: null,
        min: null,
        max: null,
        step: null,
        equn: null,
    };

    updateValue = (key, value) =>
        this.setState(() => ({
            [key]: value,
        }))
    ;

    render() {
        const {saveNode} = this.props;
        return (
            <div className={'edit-node--panel'}>
                <EditNodeInput
                    label={'Id'}
                    value={this.state.id}
                    handleOnChange={e => this.updateValue('id', e.target.value)}
                />
                <EditNodeInput
                    label={'Label'}
                    value={this.state.label}
                    handleOnChange={e => this.updateValue('label',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Title'}
                    value={this.state.title}
                    handleOnChange={e => this.updateValue('title',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Value'}
                    value={this.state.value}
                    type='number'
                    handleOnChange={e => this.updateValue('value',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Conversion'}
                    value={this.state.conv}
                    type='number'
                    handleOnChange={e => this.updateValue('conv',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Minimum Value'}
                    value={this.state.min}
                    type='number'
                    handleOnChange={e => this.updateValue('min',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Maximum Value'}
                    value={this.state.max}
                    type='number'
                    handleOnChange={e => this.updateValue('max',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Step'}
                    value={this.state.step}
                    type='number'
                    handleOnChange={e => this.updateValue('step',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Equation'}
                    value={this.state.equn}
                    handleOnChange={e => this.updateValue('equn',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Prefix'}
                    value={this.state.prefix}
                    handleOnChange={e => this.updateValue('prefix',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Suffix'}
                    value={this.state.suffix}
                    handleOnChange={e => this.updateValue('suffix',
                        e.target.value)}
                />
                <EditNodeInput
                    label={'Colour'}
                    value={this.state.color}
                    handleOnChange={e => this.updateValue('color',
                        e.target.value)}
                />
                <button onClick={() => saveNode(this.state)}>Save</button>
            </div>
        );
    }
}
