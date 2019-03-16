import React from 'react';
import { Column, Row } from '../../elements/structure';
import ModelForm from './model-form';

const SaveGraphRow = ({model, updateModel, saveNodes}) => {

    return (
        <Row>
            <Column span={8}>
                <ModelForm model={model} updateModel={updateModel}/>
            </Column>
        </Row>
    );
};

export default SaveGraphRow;