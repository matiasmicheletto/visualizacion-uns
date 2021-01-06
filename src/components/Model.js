import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Network} from 'vis-network/peer';
import {DataSet} from 'vis-data/peer';
import model from '../data/beer_hierarchy.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import "vis-network/styles/vis-network.css";


class Model extends Component {
   
    constructor() {
        super();
        this.containerRef = React.createRef();
    }

    render() {
        return (
            <Container>
                <div ref={this.containerRef}></div>
            </Container>
        );
    }

    componentDidMount() {
        const data = {
            nodes: new DataSet(model.nodes),
            edges: new DataSet(model.edges),
        };
        const options = {
            height: '750px'
        };
        const network = new Network(this.containerRef.current, data, options);
    }
}

export default Model