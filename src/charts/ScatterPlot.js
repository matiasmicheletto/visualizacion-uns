import React, {Component} from 'react';
import Highcharts from 'highcharts';
import data from '../data/brewers_friend_recipes.json';
import _ from 'lodash';

class ScatterPlot extends Component {
    
    config = {
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            height: '80%'
        },
        credits: {
            enabled: false
        },
        title: {
            text: this.props.dataX+' vs '+this.props.dataY+' para distintos estilos de cerveza'
        },
        subtitle: {
            text: "Fuente: Brewer's Friend Recipes"
        },
        xAxis: {
            title: {
                enabled: true,
                text: this.props.dataX
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: this.props.dataY
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',        
            floating: true,
            backgroundColor: '#ffffff',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        }
    }

    render() {        
        return(
            <figure className='highcharts-figure'>
                <div id={this.props.id}></div>                
            </figure>
        )
    }
    
    componentDidMount() {
        
        // Agrupar estilos
        let styles = _.groupBy(data, 'Style');

        // Generar series de datos
        let series = [];
        for(var s in styles){
            let serie = {
                name: s,
                data: []
            };
            for(var d in styles[s])
                serie.data.push([styles[s][d][this.props.dataX], styles[s][d][this.props.dataY]]);
            series.push(serie);
        }

        this.config.series = series;

        Highcharts.chart(this.props.id, this.config);
    }
}

export default ScatterPlot;