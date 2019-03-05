import React, { Component } from 'react';
import MessageType from './message-type';
import { Button } from '../../elements/button';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalOverlay,
} from '../../elements/modal';

export default function withMessage(WrappedComponent, data) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = this.getState();
        }

        getState() {
            return {
                show: false,
                message: '',
                type: MessageType.STANDARD,
            };
        }

        show = () => {
            this.setState({show: true});
        };

        hide = () => {
            this.setState({show: false});
        };

        toggle = () => {
            this.setState(prevState => ({show: !prevState}));
        };

        setMessage = (message, type) => {
            this.setState({message, type});
        };

        reset = () => {
            this.setState(this.getState());
        };

        typeClass = () => {
            switch(this.state.type) {
                case MessageType.SUCCESS:
                    return 'success-message';
                case MessageType.ERROR:
                    return 'error-message';
                case MessageType.WARNING:
                    return 'warning-message';
                case MessageType.STANDARD:
                default:
                    return 'standard-message';
            }
        };

        message = () => this.state.show ?
            <ModalOverlay>
                <Modal className={this.typeClass()}>
                    <ModalBody>{this.state.message}</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.reset}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </ModalOverlay> : null;

        render() {
            return <WrappedComponent
                message={this.message}
                setMessage={this.setMessage}
                showMessage={this.show}
                hideMessage={this.hide}
                toggleMessage={this.toggle}
                {...this.props}
            />;
        }
    };
}
