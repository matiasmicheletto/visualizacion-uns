import React, {Component} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarPlot from '../charts/BarPlot.js';
import classify from '../utils/Classifier.js';
import './Dashboard.css';

// Valores por defecto al inicio
const defaultTarget = {
  color: 10.61,
  ibu: 25.21,
  abv: 5.36
};

class Dashboard extends Component {
  
  state = {
    target: defaultTarget,
    styles: classify(defaultTarget)
  }

  targetChange(newTarget) {         
    let newState = {
      target: newTarget, 
      styles: classify(newTarget)
    };    
    this.setState(newState);
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
              <Form.Control onChange={e => {
                  this.targetChange({
                      color: parseInt(e.target.value), 
                      ibu: this.state.target.ibu, 
                      abv: this.state.target.abv
                    })
                  }
                }
                id="Color" type="range" min="0" max="40" 
                value={this.state.target.color}/>
            </Row>
            <Row style={{marginBottom:'20px'}}>
              <Form.Control onChange={e => {
                  this.targetChange({
                    color: this.state.target.color, 
                    ibu: parseInt(e.target.value), 
                    abv: this.state.target.abv
                    })
                  } 
                }
              id="IBU" type="range" min="0" max="100"
              value={this.state.target.ibu}/>
            </Row>
            <Row style={{marginBottom:'20px'}}>
              <Form.Control onChange={e => {
                  this.targetChange({
                    color: this.state.target.color, 
                    ibu: this.state.target.ibu, 
                    abv: parseInt(e.target.value)
                    })
                 }
                }  
              id="ABV" type="range" min="0" max="20" step="0.1"
              value={this.state.target.abv}/>
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