import React, {Component} from 'react';
import {Row, Table, Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataTable.css';



// Tabla de datos genericos con paginacion para bootstrap
class DataTable extends Component {

  // Parametros de configuracion
  itemsPerPage = 20 // Filas por pagina
  selectorCount = 10 // Cantidad de selectores de pagina a mostrar
  maxPages = 0 // Maxima cantidad de paginas (se ajusta en fc de los datos)

  state = {
    header: [],
    data: [],
    attrs: [],
    suffix: [],
    cellStyler: {
      method: (v)=>{return {}},
      col: ""
    },
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
      <Pagination.Item 
            onClick={() => {this.setState((prevState,prevProps) => {return this.setPage(pos-1)});}} 
            className={this.state.currentPage===pos-1 ? "active": ""}
            key={pos}> 
              {pos}
      </Pagination.Item>             
    )
  }

  getHeader() { // Genera el encabezado de la tabla
    return (
      this.state.header.map( (item, pos) => (
          <th key={pos}>{item}</th>
      ))      
    )
  }

  getTableRows() { // Genera las filas de la tabla a partir de un rango de los datos
    let start = this.itemsPerPage*this.state.currentPage;
    let end = this.itemsPerPage*(this.state.currentPage + 1);
    return (
      this.state.data.slice(start, end).map( (item, pos)=>(
        <tr key={pos}>
          { // Si enumera filas, agregar columna con los indices
            this.state.enumRows ?
            <td>{start+pos+1}</td>
            :
            ""
          }
          { // Resto de los atributos
            this.state.attrs.map( (i, p)=>
              (
                this.state.cellStyler.col === i ? // Si una columna tiene estilizador, agregar
                  <td key={p} style={this.state.cellStyler.method(item[i])}>{item[i].toFixed(2)}{this.state.suffix[i]}</td> 
                :
                  <td key={p}>{typeof item[i] === "number" && !Number.isInteger(item[i]) ? item[i].toFixed(2) : item[i]}{this.state.suffix[i]}</td> 
              )
            )
          }
        </tr>
      ))                  
    )
  }

  componentDidMount() {
    // Si la enumeracion de filas esta habilitada, agregar columna
    let header = this.props.header;
    if(this.props.enumRows)
      header.unshift("#");

    // Ajustar el numero de selectores
    this.maxPages = Math.floor(this.props.data.length / this.itemsPerPage)
    if(this.maxPages < this.selectorCount)
      this.selectorCount = this.maxPages-1;

    this.setState({
      header: header,
      data: this.props.data,
      attrs: this.props.attrs,
      suffix: this.props.suffix,
      cellStyler: this.props.cellStyler,
      enumRows: this.props.enumRows
    });
  }

  render() {    
    return (
        <div style={{width:"100%"}}>
          <Row>
            <Table striped bordered hover style={{maxWidth: "75%", margin: "0 auto"}}>
              <thead>
                <tr>
                  {this.getHeader()}
                </tr>
              </thead>
              <tbody>
                {this.getTableRows()}
              </tbody>
            </Table>
          </Row>

          <Row className="justify-content-md-center mt-3">
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
                this.state.selectorStart < this.maxPages - this.selectorCount  ?
                  <Pagination.Ellipsis />
                  :
                  ""
              }
              <Pagination.Next onClick={this.incrementPage} />
              <Pagination.Last onClick={this.gotoLast}/>
            </Pagination>
          </Row>

        </div>
    );
  }
}

export default DataTable