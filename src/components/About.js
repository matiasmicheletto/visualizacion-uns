import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class About extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Acerca de esta aplicación</h3>
            <p>Esta es una aplicación web ReactJS que asiste en la determinación del estilo de una cerveza según su color, sabor y graduación alcohólica a partir de los datos de más de 70.000 recetas del sitio <a href="https://www.brewersfriend.com/">Brewer's Friend</a>.</p>
            <p>Este desarrollo fue realizado en el marco del curso de posgrado <a href="https://cs.uns.edu.ar/~mlg/vis/">Análisis Visual de Grandes Conjuntos de Datos</a> dictado por Dra. Silvia M. Castro y Dra. M. Luján Ganuza.</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col style={{lineHeight:"10px"}}>
            <h5>Diseño e implementación</h5>            
            <p><a href="https://matiasmicheletto.github.io/">Matías J. Micheletto</a></p>
            <p>Email: <a href="mailto:matias.micheletto@uns.edu.ar?Subject=Ref.%20Cipressus">matias.micheletto@uns.edu.ar</a></p>
            <p>Documentación: <a href="https://github.com/matiasmicheletto/visualizacion-uns" target="_blank" rel="noopener noreferrer">https://github.com/matiasmicheletto/visualizacion-uns</a></p>
          </Col>
        </Row>
        <Row className="mt-3" style={{fontSize:"75%"}}>
          <Col>
            <h5>Términos y condiciones</h5>
            <p>Este programa es software libre: puede redistribuirlo y/o modificarlo bajo los términos de la Licencia General Pública de GNU publicada por la Free Software Foundation, ya sea la versión 3 de la Licencia, o (a su elección cualquier versión posterior.</p>
            <p>Este programa se distribuye con la esperanza de que sea útil pero SIN NINGUNA GARANTÍA; incluso sin la garantía implícita de MERCANTIBILIDAD o CALIFICADA PARA UN PROPÓSITO EN PARTICULAR. Vea la Licencia General Pública de GNU para más detalles.</p>
            <p>Usted ha debido de recibir una copia de la Licencia General Pública de GNU junto con este programa. Si no, vea http://www.gnu.org/licenses.</p>
          </Col>
        </Row>          
      </Container>
    );
  }
}

export default About;