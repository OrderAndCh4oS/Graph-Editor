import React, { createContext } from 'react';

const AuthContext = createContext();

class AuthProvider extends React.Component {
    state = {isAuth: false};

    login = () => {
        this.setState({isAuth: true});
    };

    logout = () => {
        this.setState({isAuth: false});
    };

    render() {
        const {Provider} = AuthContext;
        return (
            <Provider
                value={{
                    isAuth: this.state.isAuth,
                    login: this.login,
                    logout: this.logout,
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };