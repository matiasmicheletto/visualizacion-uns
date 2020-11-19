import React, {Component} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarPlot from '../charts/BarPlot.js';
import classify from '../utils/Classifier.js';
import './Dashboard.css';

// Valores por defecto al inicio
const defaultTarget = {
  color: 20,
  ibu: 25,
  abv: 5
};

class Dashboard extends Component {
  
  state = {
    target: defaultTarget,
    styles: classify(defaultTarget)
  }

  targetChange(color, ibu, abv) {     
    this.setState((prevState,prevProps) => {      
      let target = {
        color: color, 
        ibu: ibu, 
        abv: abv
      };
      let newState = {
        target: target, 
        styles: classify(target)
      }
      return newState;
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12} md={6} style={{marginTop:'200px'}}>
            <Row style={{marginBottom:'20px'}}>
              <h3>Selector de atributos</h3>
            </Row>
            <Row style={{marginBottom:'20px'}}>
              <Form.Control onChange={(e) =>{this.targetChange(parseInt(e.target.value), this.state.target.ibu, this.state.target.abv)}} id="Color" type="range" />
            </Row>
            <Row style={{marginBottom:'20px'}}>
              <Form.Control onChange={(e) =>{this.targetChange(this.state.target.color, parseInt(e.target.value), this.state.target.abv)}} id="IBU" type="range"/>
            </Row>
            <Row style={{marginBottom:'20px'}}>
              <Form.Control onChange={(e) =>{this.targetChange(this.state.target.color, this.state.target.ibu, parseInt(e.target.value))}} id="ABV" type="range" />
            </Row>
          </Col>
          <Col sm={12} md={6}>
            <BarPlot id='prob-chart' data={this.state.styles}/>
          </Col>
        </Row>
        
        
      </Container>
    );
  }
}

export default Dashboard