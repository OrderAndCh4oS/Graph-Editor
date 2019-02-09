import React, { Component } from 'react';
import '../sass/main.scss';
import { PageWrapper } from './elements/structure';
import Routes from './routes/routes';

class App extends Component {
    render() {
        return (
            <PageWrapper>
                <Routes/>
            </PageWrapper>
        );
    }
}

export default App;
