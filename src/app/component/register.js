import React, { Component, Fragment } from 'react';
import { Input } from '../elements/form';
import { postRegister } from '../api';
import { AuthConsumer } from '../authentication';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    initialState = () => {
        return {
            message: '',
            username: {
                value: '',
                touched: false,
                error: null,
            },
            password: {
                value: '',
                touched: false,
                error: null,
            },
            confirmPassword: {
                value: '',
                touched: false,
                error: null,
            },
        };
    };

    displayMessage = () => {
        const classes = ['message', 'valid-color'].join(' ');
        return this.state.message
            ? <div className={classes}>
                {this.state.message.text}
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

    submit = () => {
        this.setState(prevState => ({
            username: {
                ...prevState.username,
                touched: false,
            },
            password: {
                ...prevState.password,
                touched: false,
            },
            confirmPassword: {
                ...prevState.confirmPassword,
                touched: false,
            },
        }));
        postRegister({
            username: this.state.username.value,
            password: this.state.password.value,
            confirmPassword: this.state.confirmPassword.value,
        }).then(result => {
            if(result.id) {
                this.setState(
                    {...this.initialState(), message: 'Registered!!'});
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
            <Fragment>
                {this.displayMessage()}
                <AuthConsumer>
                    {
                        ({isAuth}) => isAuth
                            ? <div>Redirecting...</div>
                            : <div>
                                <Input
                                    label={'Username'}
                                    name={'username'}
                                    type={'text'}
                                    value={this.state.username.value}
                                    error={this.state.username.error}
                                    touched={this.state.username.touched}
                                    onChange={this.setField('username')}
                                />
                                <Input
                                    label={'Password'}
                                    name={'password'}
                                    type={'password'}
                                    value={this.state.password.value}
                                    error={this.state.password.error}
                                    touched={this.state.password.touched}
                                    onChange={this.setField('password')}
                                />
                                <Input
                                    label={'Confirm Password'}
                                    name={'confirm_password'}
                                    type={'password'}
                                    value={this.state.confirmPassword.value}
                                    error={this.state.confirmPassword.error}
                                    touched={this.state.confirmPassword.touched}
                                    onChange={this.setField('confirmPassword')}
                                />
                                <button
                                    onClick={() => this.submit()}
                                >Register
                                </button>
                            </div>
                    }
                </AuthConsumer>
            </Fragment>
        );
    }
}
