import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GraphEditor from '../component/graph-editor';
import GraphList from '../component/graph-list';
import { Column, Row } from '../elements/structure';
import { AuthConsumer } from '../authentication';
import { Button, LinkButton } from '../elements/button';
import Login from '../component/login';

const AuthButton = () =>
    <AuthConsumer>
        {
            ({isAuth, logout}) => !isAuth
                ? <LinkButton to="/login">Login</LinkButton>
                : <Button onClick={logout}>Logout</Button>
        }
    </AuthConsumer>
;

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
                    <Column span={6}>
                        <AuthButton/>
                    </Column>
                </Row>
                <Route path="/" exact component={GraphList}/>
                <Route path="/login" component={Login}/>
                <Route path="/graph-editor/:id?" component={GraphEditor}/>
            </div>
        </Router>
    );
};

export default Routes;