import React, { Component } from 'react';
import { Column, Container, Row } from '../elements/structure';
import { Title } from '../elements/typography';
import { Link } from 'react-router-dom';
import { getModel } from '../api';
import ResponseType from '../api/response-type';

class GraphList extends Component {

    state = {
        models: [],
        count: 0,
    };

    componentDidMount() {
        getModel().then((result) => {
            switch(result.type) {
                case ResponseType.SUCCESS:
                    this.setState({
                        models: result.data.rows,
                        count: result.data.count,
                    });
                    break;
                default:
                    // Todo: handle error messages
                    console.log(result);
            }

        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Column>
                        <Title>Model List</Title>
                    </Column>
                </Row>
                <Row>
                    <ul className={'graph-list'}>
                        {
                            this.state.models.map(model =>
                                <li className={'graph-list-item'}>
                                    <Link to={'/graph-editor/' + model.id}>
                                        {model.title}<br/><em>{model.description}</em>
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
