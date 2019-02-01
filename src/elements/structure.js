/* eslint-disable react/prop-types,indent */
import React from 'react';

export const Container = ({className = '', children, ...rest}) =>
    <div className={'container ' + className} {...rest}>{children}</div>;

export const ContainerPanel = ({className = '', children, ...rest}) =>
    <Container {...rest}>
        <div className={'panel ' + className}>
            {children}
        </div>
    </Container>;

export const Row = ({className = '', children, ...rest}) =>
    <div className={'row ' + className} {...rest}>{children}</div>;

export const Column = ({span = 12, push = false, className = '', children, ...rest}) => {
    const classes = [
        'column',
        'col-' + span,
        push ? ' push-' + push : '',
        className,
    ].join(' ');
    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};
