import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScatterPlot from '../charts/ScatterPlot.js';
//import ScatterPlot3D from '../charts/ScatterPlot3D.js';
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <Container style={{maxWidth: "90%"}}>        
        <Row style={{marginTop:"20px"}}>                      
          <Col md={12} lg={6}>
            <ScatterPlot id="sp1" dataX = "Color" dataY = "IBU" />
          </Col>
          <Col md={12} md={6}>
            <ScatterPlot id="sp2" dataX = "ABV" dataY = "IBU" />
          </Col>
        </Row>
        {/*
        <Row>
          <ScatterPlot3D id="sp3" dataX = "ABV" dataY = "IBU" dataZ = "Color" />
        </Row>
        */}
      </Container>
    );
  }
}

export default Dashboard