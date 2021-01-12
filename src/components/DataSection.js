import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DataTable from './DataTable.js';
import ScatterPlot from '../charts/ScatterPlot.js';
import rawData from '../data/brewers_friend_recipes.json';
import cleanData from '../data/beer_styles.json';
import {LtoTextColor} from '../utils/LovibondScale.js';

class DataSection extends Component {
    render(){
        return (
            <Container style={{maxWidth:"90%"}}>

                <Row><h3>Subconjunto de datos crudos</h3></Row>
          
                <Row>
                    <p>Fuente: <a href="https://www.brewersfriend.com/homebrew-recipes/">Brewer's Friend Recipes</a></p>
                </Row>

                <Row>
                    <DataTable 
                        header={["Nombre", "Estilo", "IBU", "ABV", "Color"]}
                        suffix={{ABV: " %", Color: " °L"}}
                        enumRows={true}
                        data={rawData}
                        attrs={["Name", "Style", "IBU", "ABV", "Color"]}
                        cellStyler={{method: LtoTextColor, col: "Color"}}
                    />
                </Row>            

                <Row className="mt-4">
                    <h3>Gráfico de datos dispersos</h3>
                </Row>
                
                <Row className="mt-3">
                    <Col md={12} lg={6}>
                        <ScatterPlot id="sp1" dataX="Color" dataY="IBU" />
                    </Col>
                    <Col md={12} lg={6}>
                        <ScatterPlot id="sp2" dataX="ABV" dataY="IBU" />
                    </Col>
                </Row>

                <Row><h3>Lista de estilos contemplados</h3></Row>

                <Row>
                    <p>Datos agrupados por estilo, contabilizando frecuencia de las clases y valores promedios</p>
                </Row>

                <Row>
                    <DataTable 
                        header={["Estilo", "Frecuencia", "IBU", "ABV", "Color"]}
                        suffix={{u_ABV: " %", u_Color: " °L"}}
                        enumRows={true}
                        data={cleanData}
                        attrs={["style", "freq", "u_IBU", "u_ABV", "u_Color"]}
                        cellStyler={{method: LtoTextColor, col: "u_Color"}}
                    />
                </Row>

            </Container>
        );
    }
}

export default DataSection;