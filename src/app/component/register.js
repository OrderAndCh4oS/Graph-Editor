import React, { Component, Fragment } from 'react';
import { FormError, Input } from '../elements/form';
import { postRegister } from '../api';
import ResponseType from '../api/response-type';
import { AuthConsumer } from '../authentication';
import MessageType from '../context/message/message-type';
import withMessage from '../context/message/with-message';

class Register extends Component {

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
            switch(result.type) {
                case ResponseType.SUCCESS:
                    this.setState(
                        {
                            ...this.initialState(),
                        });
                    this.props.setMessage('Registered Successfully',
                        MessageType.SUCCESS);
                    this.props.showMessage();
                    break;
                case ResponseType.INVALID:
                    this.setState(prevState => ({
                        ...prevState,
                        ...this.updateFieldErrors(result.errors, prevState),
                    }));
                    break;
                default:
                    this.props.setMessage('An Error Occurred.',
                        MessageType.ERROR);
                    this.props.showMessage();
            }
        });
    };

    updateFieldErrors(result, prevState) {
        return result.reduce((obj, error) => {
            if(error.field === 'users_username') {
                return {
                    ...obj,
                    message: 'This username already exists',
                };
            }
            return {
                ...obj,
                [error.field]: {
                    ...prevState[error.field],
                    error: error.message,
                },
            };
        }, {});
    }

    render() {
        const {message} = this.props;
        return (
            <Fragment>
                <AuthConsumer>
                    {
                        ({isAuth}) => isAuth
                            ? <div>Redirecting...</div>
                            : <div>
                                {message()}
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
                                <FormError
                                    error={this.state.message}
                                    touched={this.state.message === ''}
                                />
                            </div>
                    }
                </AuthConsumer>
            </Fragment>
        );
    }
}

Register = withMessage(Register);

export default Register;