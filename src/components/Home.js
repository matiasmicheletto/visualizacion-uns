import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {
  Container, 
  Row,
  Col,  
  Card  
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import card_img_db from '../img/card_db.png';
import card_img_plot from '../img/card_plot.png';
import card_img_repo from '../img/card_repo.png';
import card_img_eda from '../img/card_kaggle.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

import './Home.css'

class Home extends Component {
  render() {
    return (
        <Container style={{maxWidth: "85%"}}>
          <Row>
            <h3>Menú</h3>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={4} xl={3}>
              <a href="https://www.kaggle.com/matiasmiche/brewers-friend-recipes-analysis/" target="_blank" rel="noreferrer" style={{color: "black"}}>
                <Card className="shadow rounded">
                  <Card.Img variant="top" src={card_img_eda} />
                  <Card.Body>
                    <Card.Title>Análisis exploratorio <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></Card.Title>
                    <Card.Text>
                      Preprocesamiento y limpieza de los datos originales.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>  
            <Col sm={12} md={6} lg={4} xl={3}>
              <Link to="/data" style={{color: "black"}}>
                <Card className="shadow rounded">
                  <Card.Img variant="top" src={card_img_db} />
                  <Card.Body>
                    <Card.Title>Conjunto de datos</Card.Title>
                    <Card.Text>
                      Esta sección contiene el listado de los datos pre-procesados.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>  
            <Col sm={12} md={6} lg={4} xl={3}>
              <Link to="/dashboard" style={{color: "black"}}>
                <Card className="shadow rounded">
                  <Card.Img variant="top" src={card_img_plot} />
                  <Card.Body>
                    <Card.Title>Tablero de visualizaciones</Card.Title>
                    <Card.Text>
                      Un tablero para el análisis visual de los datos.
                    </Card.Text>
                  </Card.Body>                    
                </Card>
              </Link>     
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <a href="https://github.com/matiasmicheletto/visualizacion-uns" target="_blank" rel="noreferrer" style={{color: "black"}}>
                <Card className="shadow rounded">
                  <Card.Img variant="top" src={card_img_repo} />
                  <Card.Body>
                    <Card.Title>Documentación <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></Card.Title>
                    <Card.Text>
                      Código fuente de la aplicación.
                    </Card.Text>
                  </Card.Body>                    
                </Card>
              </a>     
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Home