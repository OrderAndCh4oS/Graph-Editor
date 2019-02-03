import React, { Component } from 'react';
import '../sass/main.scss';
import BuildGraph from './component/build-graph';
import { PageWrapper } from './elements/structure';

class App extends Component {
    render() {
        return (
            <PageWrapper>
                <BuildGraph/>
            </PageWrapper>
        );
    }
}

export default App;
