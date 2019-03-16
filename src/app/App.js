import React, { Component } from 'react';
import '../sass/main.scss';
import { PageWrapper } from './elements/structure';
import Routes from './routes/routes';
import { AuthProvider } from './authentication';

class App extends Component {
    render() {
        return (
            <PageWrapper>
                <AuthProvider>
                    <Routes/>
                </AuthProvider>
            </PageWrapper>
        );
    }
}

export default App;
