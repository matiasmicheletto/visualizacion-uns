import React, {Component} from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import Slider2D from './Slider2D.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarPlot from '../charts/BarPlot.js';
import classify from '../utils/Classifier.js';
import './Dashboard.css';

// Valores de configuracion por defecto
const defaultTarget = {
  color: 10.6,
  ibu: 75.2,
  abv: 5.7
};
const numStyles = 15; // Cantidad de estilos a listar
const useFreq = false; // Ponderar estilos por popularidad
const selectedStyle = null; // Seleccionar algun estilo

class Dashboard extends Component {
 
  state = {
    target: defaultTarget,
    styles: classify(defaultTarget, numStyles, useFreq),
    numStyles: numStyles, // Cantidad de estilos a incluir
    showLabels: true, // Mostrar etiquetas de estilos en el slider
    useFreq: useFreq, // Usar popularidad para ponderar estilos
    selectedStyle: selectedStyle // Valor del estilo seleccionado del barplot
  }

  sliderConfig = { // Slider bidimensional
    xLabel: "ABV [%]",
    xPrefix: "%",
    xMin: 0,
    xMax: 12,
    yLabel: "IBU",
    yPrefix: "",
    yMin: 0,
    yMax: 150
  }

  targetChange(newTarget) { // Evento de cambio de receta a evaluar
    let newState = {
      target: newTarget, 
      styles: classify(newTarget, this.state.numStyles, this.state.useFreq),
      selectedStyle: null // Al cambiar la posicion del slider, deseleccionar todas
    };    
    this.setState(newState);
  }

  numStylesChange(newValue) { // Evento de cambio de cantidad de estilos a mostrar
    this.setState((p, c) => {                          
      return {
        target: p.target,
        styles: classify(p.target, newValue, p.useFreq),
        numStyles: newValue
      }
    });
  }

  render() {
    return (
      <Container style={{maxWidth:"90%"}}>
        <Row>
          <Col sm={12} lg={6}>                        
            <Row>              
              <span className="color-value" style={{marginLeft:this.state.target.color*2.3+"%"}}>{this.state.target.color}°L</span>
              <Form.Control className="color-slider"
                onChange={e => { this.targetChange({color: parseFloat(e.target.value), ibu: this.state.target.ibu, abv: this.state.target.abv})} }
                id="color-slider" type="range" min={0} max={40} step={0.1}
                value={this.state.target.color}/>
            </Row>

            <Row style={{marginTop:'20px', padding:'0', width:'100%'}}>
              <Slider2D id="slider2d" 
                config={this.sliderConfig}
                dataBackground={this.state.styles}
                showLabels={this.state.showLabels}
                xValue={this.state.target.abv} 
                yValue={this.state.target.ibu} 
                selected={this.state.selectedStyle}
                onChange={e => {this.targetChange({color: this.state.target.color, abv: parseFloat(e.xValue), ibu: parseFloat(e.yValue)})} }/>
            </Row>

            <Row className="mt-4">
              <Col>
                <div>
                  <h5>Propiedades a evaluar: </h5>
                  <ul>
                    <li><b>Color: </b>{this.state.target.color}°L</li> 
                    <li><b>IBU: </b>{this.state.target.ibu.toFixed(2)} </li> 
                    <li><b>ABV: </b>{this.state.target.abv.toFixed(2)} %</li>
                  </ul>
                </div>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cantidad de clases: {this.state.numStyles}</Form.Label>
                  <Form.Control className="num-style-slider"
                    onChange={e => {this.numStylesChange(parseInt(e.target.value));} }
                    id="num-styles-slider" type="range" min={10} max={60} step={1}
                    value={this.state.numStyles}
                  />
                </Form.Group>
                <Form.Group>  
                  <Form.Check type="switch" id="freq-switch" label="Ponderar por popularidad" checked={this.state.useFreq}
                    onChange={e => {
                      this.setState({
                        useFreq: e.target.checked, 
                        styles: classify(this.state.target, this.state.numStyles, e.target.checked)});
                      }}/>
                  <Form.Check type="switch" id="labls-switch" label="Mostrar etiquetas" checked={this.state.showLabels}
                    onChange={e => {this.setState({showLabels: e.target.checked});}}/>
                </Form.Group>
              </Col>
            </Row>

          </Col>

          <Col sm={12} lg={6}>
            <BarPlot id='prob-chart' data={this.state.styles} 
              onClassSelected={style => {this.setState({selectedStyle: style});}}/>
          </Col>

        </Row>
        
      </Container>
    );
  }
}

export default Dashboard