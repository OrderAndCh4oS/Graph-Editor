import React, { Component } from 'react';
import { Input } from '../elements/form';
import { postLogin } from '../api';
import { AuthConsumer } from '../authentication';
import ResponseType from '../api/response-type';

export default class Login extends Component {

    state = {
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
    };

    render() {
        return (
            <AuthConsumer>
                {
                    ({isAuth, login}) => isAuth
                        ? <div>Redirecting...</div>
                        : <div>
                            <Input
                                label={'Username'}
                                name={'username'}
                                type={'text'}
                                value={this.state.username.value}
                                error={this.state.username.error}
                                touched={this.state.username.touched}
                                onChange={this.setUsername}
                            />
                            <Input
                                label={'Password'}
                                name={'password'}
                                type={'password'}
                                value={this.state.password.value}
                                error={this.state.password.error}
                                touched={this.state.password.touched}
                                onChange={this.setPassword}
                            />
                            <button
                                onClick={() => this.submit(login)}
                            >Login
                            </button>
                        </div>
                }
            </AuthConsumer>
        );
    }

    submit = (login) => {
        this.resetFormTouched();
        // Todo: disable button on submit.
        postLogin(
            this.state.username.value,
            this.state.password.value,
        ).then(result => {
            switch(result.type) {
                case ResponseType.SUCCESS:
                    login();
                    break;
                case ResponseType.AUTHENTICATION_FAILURE:
                    // Todo: Handle auth failure
                    console.log('Unhandled Auth Failure');
                    break;
                default:
                    // Todo: Handle error
                    console.log('Unhandled Error');
            }
        });
    };

    resetFormTouched() {
        this.setState(prevState => ({
            username: {
                ...prevState.username,
                touched: false,
            },
            password: {
                ...prevState.password,
                touched: false,
            },
        }));
    }

    setUsername = (e) => this.setState({
        username: {
            value: e.target.value,
            touched: true,
            error: false,
        },
    });

    setPassword = (e) => this.setState({
        password: {
            value: e.target.value,
            touched: true,
            error: false,
        },
    });
}
