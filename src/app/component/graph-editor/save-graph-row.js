import React from 'react';
import { Column, Row } from '../../elements/structure';
import ModelForm from './model-form';

const SaveGraphRow = (props) => {

    return (
        <Row>
            <Column span={8}>
                <ModelForm {...props}/>
            </Column>
        </Row>
    );
};

export default SaveGraphRow;
