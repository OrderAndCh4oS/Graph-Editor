import React from 'react';

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