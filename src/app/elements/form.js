/* eslint-disable react/prop-types */

import React from 'react';

const Label = ({label, htmlFor}) => <label
    htmlFor={htmlFor} className="form-label"
>{label}</label>;

export const FormError = ({error, touched}) => error && !touched ?
    <p className="form-error">{error}</p> : null;

export const Field = ({type, className, children, touched, error}) => (
    <div className={['form-field', type, className].join(' ')}>
        {children}
        <FormError error={error} touched={touched}/>
    </div>
);

export const Input = ({label, name, type, touched, error, className, ...props}) => {
    return (
        <Field type={type} error={error}>
            <Label label={label} htmlFor={name}/>
            <input {...props} id={name} name={name} type={type} className={[
                'form-input',
                error && !touched ? 'form-error' : '',
                className,
            ].join(' ')}
            />
        </Field>
    );
};

export const TextArea = ({label, name, error, className, ...props}) => (
    <Field type='text-area' error={error}>
        <Label label={label} htmlFor={name}/>
        <textarea {...props} id={name} name={name} className={[
            'form-text-area',
            error ? 'form-error' : '',
            className].join(' ')}
        />
    </Field>
);

export const Select = ({label, name, error, className, options = [], initialField = 'Select an option', ...props}) => {
    return (
        <Field type='select' error={error}>
            <Label label={label} htmlFor={name}/>
            <select {...props} id={name} name={name} className={[
                'form-select',
                error ? 'form-error' : '',
                className].join(' ')}
            >
                <option value="">{initialField}</option>
                {options.map((option) =>
                    <option
                        key={option.value} value={option.value}
                    >{option.name}</option>,
                )}
            </select>
        </Field>
    );
};

export const Switch = ({value = false, label, name, error, onChange, onBlur, className, ...props}) => {
    const classes = ['switch', className, value ? 'on' : ''].join(' ');
    const title = [value ? 'on' : 'off'].join(' ');
    return (
        <Field type='switch' error={error}>
            <Label label={label} htmlFor={name}/>
            <button
                type='button' id={name} title={title} onBlur={() => {
                onBlur(true);
            }} onClick={() => {
                onChange(name, !value);
            }} className={classes}
                {...props}
            />
        </Field>
    );
};
