import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Network} from 'vis-network/peer';
import {DataSet} from 'vis-data/peer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "vis-network/styles/vis-network.css";
import styles from '../data/beer_styles.json';
import extra_styles from '../data/extra_styles.json';
import edges from '../data/beer_hierarchy.json';

const model = {
    nodes: extra_styles.concat(styles),
    edges: edges
}

class Model extends Component {
   
    constructor() {
        super();
        this.containerRef = React.createRef();
    }

    render() {
        return (
            <Container style={{maxWidth:"80%"}}>
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
            /*
            layout: {
              hierarchical: {
                direction: "UD",
              },
            },
            */
          }
        const network = new Network(this.containerRef.current, data, options);
    }
}

export default Model