import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GraphEditor from '../component/graph-editor';
import GraphList from '../component/graph-list';
import { Column, Row } from '../elements/structure';
import { Button } from '../elements/button';

const Routes = () => {
    const showLogin = () => {

    };

    return (
        <Router>
            <div>
                <Row>
                    <Column span={6}>
                        <ul>
                            <li>
                                <Link to="/">Model List</Link>
                            </li>
                            <li>
                                <Link to="/graph-editor">Model Editor</Link>
                            </li>
                        </ul>
                    </Column>
                    <Column span={6} className={'align-right'}>
                        <Button onClick={showLogin}>Login</Button>
                    </Column>
                </Row>
                <Route path="/" exact component={GraphList}/>
                <Route path="/graph-editor" component={GraphEditor}/>
            </div>
        </Router>
    );
};

export default Routes;