import React, { Component } from 'react';
import { Container, Row } from '../elements/structure';
import { Title } from '../elements/typography';
import { Link } from 'react-router-dom';
import { getModel } from '../api';

class GraphList extends Component {

    state = {
        models: [],
        count: 0,
    };

    componentDidMount() {
        getModel().then(({rows, count}) =>
                this.setState({models: rows, count}));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Title>Model List</Title>
                </Row>
                <Row>
                    <ul>
                        {
                            this.state.models.map(model =>
                                <li>
                                    <Link to={'/graph-editor/' + model.id}>
                                        {model.title}
                                    </Link>
                                </li>,
                            )
                        }
                    </ul>
                </Row>
            </Container>
        );
    }
}

export default GraphList;
