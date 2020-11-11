import React, {Component} from 'react'
import {Container, Row, Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/Brewers_Friend_Recipes.json'

class Data extends Component {

  dataToTable() {
    return (
      data.slice(0,10).map( (item, pos)=>(
        <tr key={pos}>
          <td>{pos+1}</td>
          <td>{item.Name}</td>
          <td>{item.Style}</td>
          <td>{item.BoilTime}</td>
          <td>{item.IBU}</td>
          <td>{item.ABV}</td>
          <td>{item.Color}</td>
        </tr>
      ))                  
    )
  }

  render() {
    return (
        <Container>
          <Row>
            <h3>Base de datos</h3>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Style</th>
                  <th>Boil Time</th>
                  <th>IBU</th>
                  <th>ABV</th>
                  <th>Color</th>
                </tr>
              </thead>
              <tbody>
                {this.dataToTable()}
              </tbody>
            </Table>
          </Row>
        </Container>
    );
  }
}

export default Data