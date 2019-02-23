import React, { Component } from 'react';
import { Input } from '../elements/form';
import request from '../api/request';
import { postLogin } from '../api';
import { AuthConsumer } from '../authentication';

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

    handleUsernameError() {
        return this.state.errors.hasOwnProperty('username')
            ? this.state.errors.username
            : null;
    }

    submit = (login) => {
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
        request(postLogin, null, {
            username: this.state.username.value,
            password: this.state.password.value,
        }).then(result => {
            if(result.id) {
                login();
            } else {
                console.log(result);
            }
        });
    };

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
