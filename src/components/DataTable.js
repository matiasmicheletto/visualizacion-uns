import React, {Component} from 'react'
import {Container, Row, Table, Pagination} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/Brewers_Friend_Recipes.json'
import {LtoTextColor} from '../utils/LovibondScale.js'
import './DataTable.css'


// Tabla de datos con paginacion
class DataTable extends Component {

  itemsPerPage = 20
  selectorCount = 10 // Cantidad de selectores de pagina a mostrar
  maxPages = Math.floor(data.length/this.itemsPerPage)

  state = {
    currentPage: 0,
    selectorStart: 0
  }
    
  setPage = (pos) => { 
    let newPos = pos < 0 ? 0 : (pos > this.maxPages ? this.maxPages : pos);
    let start = Math.floor(pos-this.selectorCount/2)
    start = start < 0 ? 0 : (start > this.maxPages-this.selectorCount ? this.maxPages-this.selectorCount : start);
    return {currentPage: newPos, selectorStart: start}
  }

  incrementPage = () => {
    this.setState((prevState,prevProps) => {
      return this.setPage(prevState.currentPage + 1)
    });
  }

  decrementPage = () => {
    this.setState((prevState,prevProps) => {
      return this.setPage(prevState.currentPage - 1)
    });
  }

  gotoFirst = () => {
    this.setState((prevState,prevProps) => {
      return this.setPage(0)
    });
  }

  gotoLast = () => {
    this.setState((prevState,prevProps) => {
      return this.setPage(this.maxPages)
    });
  }

  pageSelector(pos) {
    return (
      <Pagination.Item onClick={() => {
              this.setState((prevState,prevProps) => {
                return this.setPage(pos-1)
              });
            }} 
            className={this.state.currentPage===pos-1 ? "active": ""}
            key={pos}>
              {pos}
      </Pagination.Item>             
    )
  }

  getTableRows() { // Genera las filas de la tabla a partir de un rango de los datos
    let start = this.itemsPerPage*this.state.currentPage;
    let end = this.itemsPerPage*(this.state.currentPage+1);
    return (
      data.slice(start, end).map( (item, pos)=>(
        <tr key={pos}>
          <td>{start+pos+1}</td>
          <td>{item.Name}</td>
          <td>{item.Style}</td>
          <td>{item.BoilTime} min.</td>
          <td>{item.IBU}</td>
          <td>{item.ABV} %</td>
          <td style={LtoTextColor(item.Color)}>{item.Color} °L</td>
        </tr>
      ))                  
    )
  }

  render() {
    return (
        <Container>
          <Row><h3>Base de datos</h3></Row>
          <Row><p>Fuente: <a href="https://www.brewersfriend.com/homebrew-recipes/">Brewer's Friend Recipes</a></p></Row>
          <br></br>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Estilo</th>
                  <th>Tiempo de ebullición</th>
                  <th>IBU</th>
                  <th>ABV</th>
                  <th>Color</th>
                </tr>
              </thead>
              <tbody>
                {this.getTableRows()}
              </tbody>
            </Table>
          </Row>
          <Row className="justify-content-md-center">
            <Pagination>
              <Pagination.First  onClick={this.gotoFirst}/>
              <Pagination.Prev onClick={this.decrementPage} />
              {
                this.state.selectorStart > 0  ?
                  <Pagination.Ellipsis />
                  :
                  ""
              }
              {[...Array(this.selectorCount+1)].map((value, index) => (this.pageSelector(this.state.selectorStart+index+1)))}
              {
                this.state.selectorStart < this.maxPages-this.selectorCount  ?
                  <Pagination.Ellipsis />
                  :
                  ""
              }
              <Pagination.Next onClick={this.incrementPage} />
              <Pagination.Last onClick={this.gotoLast}/>
            </Pagination>
          </Row>
        </Container>
    );
  }
}

export default DataTable