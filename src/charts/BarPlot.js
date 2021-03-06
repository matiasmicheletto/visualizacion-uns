import React, {Component} from 'react';
import Highcharts from 'highcharts';


class BarPlot extends Component {
    
    config = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Estilos de cerveza y puntajes de similitud',
            style: {
                fontSize: '2em',
                fontWeight: 'bold'
            } 
        },   
        xAxis: {
            categories: [], // Lista de estilos                                
            labels: {
                style: {
                    fontSize: '1.6em'
                }    
            }
        },
        yAxis: {            
            title: {
                text: 'Probabilidad [%]',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style: {
                    fontSize: '1.6em'
                }
            }
        },
        tooltip: {
            valueSuffix: ' %'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                events: {
                    click: e => {
                        this.props.onClassSelected(e.point.category);
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: 'Probabilidad',   
                showInLegend: false,
                data: [] // Definir
            }
        ]
    }

    chart = null

    render() {                
        return(
            <figure className="highcharts-figure">
                <div id={this.props.id} style={{height:"95%"}}></div>                
            </figure>
        )
    }
    
    componentDidMount() {        
        this.config.xAxis.categories = this.props.data.names;
        this.config.series[0].data = this.props.data.data;
        this.config.plotOptions.bar.pointWidth = Math.round(600/this.props.data.names.length);
        if(this.props.onClassSelected){ // Evento de seleccion de una clase para resaltar
            this.config.plotOptions.series = {
                events: {
                    click: e => {this.props.onClassSelected(e.point.category)}
                }
            };
        }
        this.chart = Highcharts.chart(this.props.id, this.config);
    }

    componentDidUpdate() {
        this.chart.update({
            xAxis: {
                categories: this.props.data.names
            },       
            plotOptions: {
                bar: {
                    pointWidth: Math.round(600/this.props.data.names.length)
                }
            },  
            series:[
                {
                    data: this.props.data.data
                }
            ]
        });
    }
}

export default BarPlot;