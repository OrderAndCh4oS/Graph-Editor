/* eslint-disable react/prop-types,indent */
import React from 'react';

export const PageWrapper = ({className = '', children, ...rest}) =>
    <div className={'page-wrapper ' + className} {...rest}>{children}</div>;

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

export const Column =
    ({
         span = 12,
         xsSpan = 12,
         sSpan = 12,
         mSpan = null,
         lSpan = null,
         xlSpan = null,
         push = false,
         className = '',
         children,
         ...rest
     }) => {

        const classes = [
            'column',
            'col-' + span,
            xsSpan ? 'col-xsml-' + xsSpan : '',
            sSpan ? 'col-sml-' + sSpan : '',
            mSpan ? 'col-med-' + mSpan : '',
            lSpan ? 'col-lrg-' + lSpan : '',
            xlSpan ? 'col-xlrg-' + xlSpan : '',
            push ? ' push-' + push : '',
            className,
        ].join(' ');
        return (
            <div className={classes} {...rest}>
                {children}
            </div>
        );
    };

export const Panel = ({className = '', children, ...rest}) =>
    <div className={'panel ' + className}>
        {children}
    </div>
;