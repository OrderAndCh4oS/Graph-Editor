import { Button } from '../../elements/button';
import React from 'react';

const SaveButton = ({handleSave, children}) =>
    <Button
        className={'tool-bar--button'} type={'affirmative'} onClick={handleSave}
    >
        {children}
    </Button>;

export default SaveButton;