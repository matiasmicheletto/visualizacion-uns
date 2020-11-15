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

class Home extends Component {
  render() {
    return (
        <Container>
            <Row>
              <h3>Menú</h3>
            </Row>
            <Row>
            <Col>
                <Link to="/data">
                  <Card>
                    <Card.Img variant="top" src={card_img_db} />
                    <Card.Body>
                      <Card.Title>Base de datos</Card.Title>
                      <Card.Text>
                        Esta sección contiene el listado de los datos pre-procesados.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>  
              <Col>
                <Link to="/dashboard">
                  <Card>
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
            </Row>
        </Container>
    );
  }
}

export default Home