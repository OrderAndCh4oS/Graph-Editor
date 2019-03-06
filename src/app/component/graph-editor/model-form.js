import React, { Component } from 'react';
import { postModel, putModel } from '../../api';
import { Input } from '../../elements/form';
import { AuthConsumer, AuthContext } from '../../authentication';
import { Column, Row } from '../../elements/structure';
import { Button } from '../../elements/button';
import ResponseType from '../../api/response-type';
import { withRouter } from 'react-router-dom';
import withMessage from '../../context/message/with-message';
import MessageType from '../../context/message/message-type';

class ModelForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState({});
    }

    initialState = ({title, description}) => ({
        title: {
            value: title || null,
            touched: false,
            error: null,
        },
        description: {
            value: description || null,
            touched: false,
            error: null,
        },
    });

    setField = (field) => (e) => this.setState({
        [field]: {
            value: e.target.value,
            touched: true,
            error: false,
        },
    });

    save = () => {
        const {model} = this.props;
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

        model.hasOwnProperty('id') && model.id ? this.put() : this.post();
    };

    post() {
        postModel({
            title: this.state.title.value || this.props.model.title,
            description: this.state.description.value ||
                this.props.model.description,
        }).then(result => {
            this.handleResult(result);
        });
    }

    put() {
        putModel({
            title: this.state.title.value || this.props.model.title,
            description: this.state.description.value ||
                this.props.model.description,
        }, {id: this.props.model.id}).then(result => {
            this.handleResult(result);
        });
    }

    handleResult(result) {
        switch(result.type) {
            case ResponseType.SUCCESS:
                this.props.setMessage(
                    'Model saved',
                    MessageType.SUCCESS,
                );
                this.props.showMessage();
                this.setState({
                    ...this.initialState(result.data),
                });
                this.props.updateModel(result.data);
                this.props.history.push('/graph-editor/' + result.data.id);
                break;
            case ResponseType.INVALID:
                this.setState(prevState => ({
                    ...prevState,
                    ...this.updateFieldErrors(result, prevState),
                }));
                break;
            case ResponseType.AUTHENTICATION_FAILURE:
                // Todo: find a better way to handle logout on auth failure
                this.context.logout();
                this.props.history.push('/login');
                break;
            default:
                // Todo: Handle error
                console.log('Unhandled Error');
        }
    }

    updateFieldErrors(result, prevState) {
        return result.errors.reduce((obj, error) => ({
            ...obj,
            [error.field]: {
                ...prevState[error.field],
                error: error.message,
            },
        }), {});
    }

    render() {
        const {model, message} = this.props;
        return (
            <div className={'model-form'}>
                {message()}
                <AuthConsumer>
                    {({isAuth}) => isAuth
                        ? <Row>
                            <Column span={5}>
                                <Input
                                    label={'Title'}
                                    name={'title'}
                                    type={'text'}
                                    value={this.state.title.value === null
                                        ? model.title || ''
                                        : this.state.title.value}
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
                                    value={this.state.description.value === null
                                        ? model.description || ''
                                        : this.state.description.value}
                                    error={this.state.description.error}
                                    touched={this.state.description.touched}
                                    onChange={this.setField('description')}
                                />
                            </Column>
                            <Column span={2}>
                                <Button
                                    className={'gutter-margin-top'}
                                    type={'affirmative'}
                                    disabled={this.state.title.value === ''}
                                    onClick={this.save}
                                >Save Model
                                </Button>
                            </Column>
                        </Row>
                        : null}
                </AuthConsumer>
            </div>
        );
    }
}

ModelForm.contextType = AuthContext;

ModelForm = withRouter(withMessage(ModelForm));

export default ModelForm;
