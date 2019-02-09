import React, { Component } from 'react';
import { Container, Row } from '../elements/structure';
import { Title } from '../elements/typography';
import { Link } from 'react-router-dom';

class GraphList extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Title>Model List</Title>
                </Row>
                <Row>
                    <ul>
                        <li>
                            <Link to="/graph-editor/language-students">
                                Language Students
                            </Link>
                        </li>
                        <li>
                            <Link to="/graph-editor/manure">
                                Manure
                            </Link>
                        </li>
                        <li>
                            <Link to="/graph-editor/plastics">
                                Plastics
                            </Link>
                        </li>
                        <li>
                            <Link to="/graph-editor/rail-neutral">
                                Rail Fares Neutral
                            </Link>
                        </li>
                        <li>
                            <Link to="/graph-editor/rail-private">
                                Rail Fares Private
                            </Link>
                        </li>
                        <li>
                            <Link to="/graph-editor/rail-public">
                                Rail Fares Public
                            </Link>
                        </li>
                    </ul>
                </Row>
            </Container>
        );
    }
}

export default GraphList;
