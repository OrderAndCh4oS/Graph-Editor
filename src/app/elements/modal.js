import React from 'react';
import { Panel } from './structure';

export const ModalOverlay = ({children, className = '', ...rest}) =>
    <div className={'modal-overlay ' + className} {...rest}>{children}</div>;

export const Modal = ({children, className = '', ...rest}) =>
    <div className={'modal ' + className} {...rest}>
        <Panel className={'gutter-padding-bottom'}>
            {children}
        </Panel>
    </div>;

export const ModalHeader = ({children, className, ...rest}) =>
    <div className={'modal-header ' + className} {...rest}>
        {children}
    </div>;

export const ModalBody = ({children, className, ...rest}) =>
    <div className={'modal-body ' + className} {...rest}>
        {children}
    </div>;

export const ModalFooter = ({children, className, ...rest}) =>
    <div className={'modal-footer ' + className} {...rest}>
        {children}
    </div>;