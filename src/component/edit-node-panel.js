import React from 'react';

const EditNodeInput = ({label, value, handleOnChange}) =>
    <div className={'edit-node--input-holder'}>
        <label className={'edit-node-label'}>
            <span className={'node-text'}>{label}</span>
            <input
                className={'node-input edit-node--input'}
                defaultValue={value}
                onChange={handleOnChange}
            />
        </label>
    </div>
;

const EditNodePanel = ({saveNode}) => {
    const nodeData = {
        id: '',
        label: '',
        title: '',
        color: '',
        val: 0,
        conv: 0,
        suffix: null,
        prefix: null,
        min: 0,
        max: 100,
        step: 1,
        equn: null,
    };
    return (
        <div className={'edit-node--panel'}>
            <EditNodeInput
                label={'Id'}
                value={nodeData.id}
                handleOnChange={(e) => nodeData.id = e.target.value}
            />
            <EditNodeInput
                label={'Label'}
                value={nodeData.label}
                handleOnChange={(e) => nodeData.label = e.target.value}
            />
            <EditNodeInput
                label={'Title'}
                value={nodeData.title}
                handleOnChange={(e) => nodeData.title = e.target.value}
            />
            <EditNodeInput
                label={'Colour'}
                value={nodeData.color}
                handleOnChange={(e) => nodeData.color = e.target.value}
            />
            <EditNodeInput
                label={'Value'}
                value={nodeData.val}
                handleOnChange={(e) => nodeData.val = e.target.value}
            />
            <EditNodeInput
                label={'Conversion'}
                value={nodeData.conv}
                handleOnChange={(e) => nodeData.conv = e.target.value}
            />
            <EditNodeInput
                label={'Prefix'}
                value={nodeData.prefix}
                handleOnChange={(e) => nodeData.prefix = e.target.value}
            />
            <EditNodeInput
                label={'Suffix'}
                value={nodeData.suffix}
                handleOnChange={(e) => nodeData.suffix = e.target.value}
            />
            <EditNodeInput
                label={'Minimum Value'}
                value={nodeData.min}
                handleOnChange={(e) => nodeData.min = e.target.value}
            />
            <EditNodeInput
                label={'Maximum Value'}
                value={nodeData.max}
                handleOnChange={(e) => nodeData.max = e.target.value}
            />
            <EditNodeInput
                label={'Step'}
                value={nodeData.step}
                handleOnChange={(e) => nodeData.step = e.target.value}
            />
            <EditNodeInput
                label={'Equation'}
                value={nodeData.equn}
                handleOnChange={(e) => nodeData.equn = e.target.value}
            />
            <button onClick={() => saveNode(nodeData)}>Save</button>
        </div>
    );
};

export default EditNodePanel;
