import React from 'react';
import { Column, Row } from '../../elements/structure';
import ModelForm from './model-form';
import { AuthConsumer } from '../../authentication';
import SaveButton from './save-button';

const SaveGraphRow = ({model}) => {
    const saveGraphButtons = ({isAuth}) => isAuth
        ? <SaveButton handleSave={this.saveNodes}>Save Nodes</SaveButton>
        : null;

    return (
        <Row>
            <Column span={8}>
                <ModelForm model={model}/>
            </Column>
            <Column span={4} className={'align-right'}>
                <AuthConsumer>
                    {saveGraphButtons}
                </AuthConsumer>
            </Column>
        </Row>
    );
};

export default SaveGraphRow;