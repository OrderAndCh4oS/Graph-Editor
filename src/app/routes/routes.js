import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GraphEditor from '../component/graph-editor';
import GraphList from '../component/graph-list';
import { Column, Row } from '../elements/structure';

const Routes = () => {
    return (
        <Router>
            <div>
                <Row>
                    <Column span={6}>
                        <Link to="/">Model List</Link>
                        {' | '}
                        <Link to="/graph-editor">Model Editor</Link>
                    </Column>
                </Row>
                <Route path="/" exact component={GraphList}/>
                <Route path="/graph-editor/:id?" component={GraphEditor}/>
            </div>
        </Router>
    );
};

export default Routes;