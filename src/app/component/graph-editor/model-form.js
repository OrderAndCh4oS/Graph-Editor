import React, { Component } from 'react';
import { postModel, putModel } from '../../api';
import { Input } from '../../elements/form';
import { AuthConsumer } from '../../authentication';
import { Column, Row } from '../../elements/structure';
import { Button } from '../../elements/button';

export default class ModelForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState(props.model);
    }

    initialState = ({id, title, description}) => {
        return {
            message: '',
            id: {
                value: id || null,
            },
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

        model.hasOwnProperty('id') ? this.put() : this.post();
    };

    post() {
        postModel({
            title: this.state.title.value,
            description: this.state.description.value,
        }).then(result => {
            this.handleResult(result);
        });
    }

    put() {
        putModel({
            title: this.state.title.value,
            description: this.state.description.value,
        }, {id: this.props.model.id}).then(result => {
            this.handleResult(result);
        });
    }

    handleResult(result) {
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
    }

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
        const {model} = this.props;
        return (
            <div className={'model-form'}>
                <AuthConsumer>
                    {({isAuth}) => isAuth
                        ? <Row>
                            <Column span={5}>
                                <Input
                                    label={'Title'}
                                    name={'title'}
                                    type={'text'}
                                    value={this.state.title.value ||
                                    model.title}
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
                                    value={this.state.description.value ||
                                    model.description}
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
                        : null}
                </AuthConsumer>
            </div>
        );
    }
}
