import { Button } from '../../elements/button';
import React from 'react';
import { AuthConsumer } from '../../authentication';

const SaveButton = ({handleSave}) =>
    <AuthConsumer>
        {({isAuth}) => isAuth
            ? <Button
                type={'affirmative'} onClick={handleSave}
            >
                Save Nodes
            </Button>
            : null}
    </AuthConsumer>
;

export default SaveButton;