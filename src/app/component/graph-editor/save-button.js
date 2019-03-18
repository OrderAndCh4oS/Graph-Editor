import { Button } from '../../elements/button';
import React from 'react';
import { AuthConsumer } from '../../authentication';

const SaveButton = ({handleSave, isSaved}) =>
    <AuthConsumer>
        {({isAuth}) => isAuth
            ? <Button
                type={'affirmative'} onClick={handleSave}
            >
                Save Nodes {isSaved ? '' : '*'}
            </Button>
            : null}
    </AuthConsumer>
;

export default SaveButton;
