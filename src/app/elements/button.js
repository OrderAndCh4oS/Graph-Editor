import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({type = 'primary', className = '', iconLeft = null, iconRight = null, children, ...rest}) => (
    <button
        className={[
            'button',
            type,
            iconLeft ? 'icon-left' : '',
            className].join(' ')} {...rest}>
        {iconLeft ? <span className='icon-left'>{iconLeft}</span> : null}
        {iconLeft ? ' ' : null}
        {children}
        {iconRight ? ' ' : null}
        {iconRight ? <span className='icon-right'>{iconRight}</span> : null}
    </button>
);

export const LinkButton = ({to, type = 'primary', className = '', iconLeft = null, iconRight = null, children, ...rest}) => (
    <Link
        to={to} className={[
        'button',
        type,
        iconLeft ? 'icon-left' : '',
        className].join(' ')} {...rest}>
        {iconLeft ? <span className='icon-left'>{iconLeft}</span> : null}
        {iconLeft ? ' ' : null}
        {children}
        {iconRight ? ' ' : null}
        {iconRight ? <span className='icon-right'>{iconRight}</span> : null}
    </Link>
);