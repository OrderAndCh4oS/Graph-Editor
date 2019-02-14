import React from 'react';

const EditNodeInput = ({label, value, handleOnChange, type, className}) =>
    <div className={'edit-node--input-holder ' + className}>
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

export default EditNodeInput;