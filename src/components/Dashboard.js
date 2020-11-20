import React, {Component} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import Slider2D from './Slider2D.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarPlot from '../charts/BarPlot.js';
import classify from '../utils/Classifier.js';
import './Dashboard.css';

// Valores por defecto al inicio
const defaultTarget = {
  color: 10.6,
  ibu: 25.2,
  abv: 5.7
};
const numStyles = 25;

class Dashboard extends Component {
 
  state = {
    target: defaultTarget,
    styles: classify(defaultTarget, numStyles),
    numStyles: numStyles
  }

  targetChange(newTarget) {         
    let newState = {
      target: newTarget, 
      styles: classify(newTarget, this.state.numStyles)
    };    
    this.setState(newState);
  }

  render() {
    return (
      <Container style={{maxWidth:"85%"}}>
        <Row>
          <Col sm={12} lg={6}>                        
            <Row>              
              <span className="color-value" style={{marginLeft:this.state.target.color*2.3+"%"}}>{this.state.target.color}°L</span>
              <Form.Control className="color-slider"
                onChange={e => {
                    this.targetChange({
                      color: parseFloat(e.target.value), 
                      ibu: this.state.target.ibu, 
                      abv: this.state.target.abv
                      })
                    } 
                  }
                type="range" min={0} max={40} step={0.1}
                value={this.state.target.color}/>
            </Row>

            <Row style={{marginTop:'20px', padding:'0', height:'100%', width:'100%'}}>
              <Slider2D id="slider2d" 
                xValue={this.state.target.abv} 
                yValue={this.state.target.ibu} 
                width="100%"
                height="100%"
                onChange={e => {
                    this.targetChange({
                      color: this.state.target.color, 
                      abv: parseFloat(e.xValue), 
                      ibu: parseFloat(e.yValue)
                      })
                    } 
                  }/>
            </Row>

          </Col>

          <Col sm={12} lg={6} style={{height:"100%"}}>
            <BarPlot id='prob-chart' data={this.state.styles}/>
            <Form.Group>
                <Form.Label>Cantidad de clases: {this.state.numStyles}</Form.Label>
              <Form.Control className="num-style-slider"
                onChange={e => {                  
                    this.setState((p, c) => {
                      return {
                        target: p.target,
                        styles: classify(p.target, e.target.value),
                        numStyles: e.target.value
                      }
                    });
                  } 
                }
                type="range" min={10} max={60} step={1}
                value={this.state.numStyles}
              />
            </Form.Group>
          </Col>

        </Row>
        
      </Container>
    );
  }
}

export default Dashboard