import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScatterPlot from '../charts/ScatterPlot.js'

class Dashboard extends Component {
  render() {
    return (
      <Container>        
        <Row style={{marginTop:"20px"}}>                      
          <ScatterPlot id="sp1" dataX = "Color" dataY = "IBU"/>
          <br></br>
          <ScatterPlot id="sp2" dataX = "ABV" dataY = "IBU"/>          
        </Row>
      </Container>
    );
  }
}

export default Dashboard