import React, { Component } from 'react';
import { postModel } from '../../../api';
import request from '../../../api/request';
import { Input } from '../../elements/form';
import { AuthConsumer } from '../../authentication';
import { Column, Row } from '../../elements/structure';
import { Button } from '../../elements/button';

export default class ModelForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState(props);
    }

    initialState = ({title, description}) => {
        return {
            message: '',
            title: {
                value: title || '',
                touched: false,
                error: null,
            },
            description: {
                value: description || '',
                touched: false,
                error: null,
            },
        };
    };

    displayMessage = () => {
        const classes = ['message', 'valid-color'].join(' ');
        return this.state.message
            ? <div className={classes}>
                {this.state.message}
            </div>
            : null;
    };

    setField = (field) => (e) => this.setState({
        [field]: {
            value: e.target.value,
            touched: true,
            error: false,
        },
    });

    save = () => {
        console.log(this.state);
        this.setState(prevState => ({
            title: {
                ...prevState.title,
                touched: false,
            },
            description: {
                ...prevState.description,
                touched: false,
            },
        }));
        request(postModel, null, {
            title: this.state.title.value,
            description: this.state.description.value,
        }).then(result => {
            if(result.id) {
                this.setState({
                    ...this.initialState(result),
                    message: 'Model Saved',
                });
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    ...this.updateFieldErrors(result, prevState),
                }));
            }
        });
    };

    updateFieldErrors(result, prevState) {
        return result.reduce((obj, error) => ({
            ...obj,
            [error.field]: {
                ...prevState[error.field],
                error: error.message,
            },
        }), {});
    }

    render() {
        return (
            <div className={'model-form'}>
                <AuthConsumer>
                    {
                        ({isAuth}) => isAuth
                            ? <Row>
                                <Column span={5}>
                                    <Input
                                        label={'Title'}
                                        name={'title'}
                                        type={'text'}
                                        value={this.state.title.value}
                                        error={this.state.title.error}
                                        touched={this.state.title.touched}
                                        onChange={this.setField('title')}
                                    />
                                </Column>
                                <Column span={5}>
                                    <Input
                                        label={'Description'}
                                        name={'description'}
                                        type={'description'}
                                        value={this.state.description.value}
                                        error={this.state.description.error}
                                        touched={this.state.description.touched}
                                        onChange={this.setField('description')}
                                    />
                                </Column>
                                <Column span={2}>
                                    <Button
                                        className={'gutter-margin-top'}
                                        disabled={this.state.title.value === ''}
                                        onClick={this.save}
                                    >Save Model
                                    </Button>
                                    {this.displayMessage()}
                                </Column>
                            </Row>
                            : null
                    }
                </AuthConsumer>
            </div>
        );
    }
}
