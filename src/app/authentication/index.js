import React, { createContext } from 'react';

const AuthContext = createContext();

class AuthProvider extends React.Component {

    constructor(props) {
        super(props);
        const authenticated = localStorage.getItem('authenticated');

        if(authenticated === 'true') {
            this.state = {isAuth: true};
        } else {
            this.state = {isAuth: false};
        }
    }

    login = (user) => {
        this.setState({isAuth: true});
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authenticated', 'true');
    };

    logout = () => {
        this.setState({isAuth: false});
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('user');
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

export { AuthContext, AuthProvider, AuthConsumer };
