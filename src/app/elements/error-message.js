/* eslint-disable react/prop-types */
import React from 'react';
import { Pretitle, Title } from './typography';
import { Column } from './structure';

const ErrorMessage = ({pretitle = 'Oops...', title = 'Error', children}) =>
    <Column>
        <Pretitle>{pretitle}</Pretitle>
        <Title>{title}</Title>
        {children}
    </Column>;

export default ErrorMessage;