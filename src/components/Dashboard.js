import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Highcharts from 'highcharts';
import config from '../charts/scatterConfig.js'

class Dashboard extends Component {
  
  render() {
    return (
      <Container>
        <Row>
            <h3>Dashboard</h3>
            <figure className="highcharts-figure">
                <div id="container"></div>                
            </figure>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    Highcharts.chart('container', config);
  }
}

export default Dashboard