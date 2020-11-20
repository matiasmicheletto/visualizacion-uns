import React, {Component} from 'react';
import Highcharts from 'highcharts';


class BarPlot extends Component {
    
    config = {
        chart: {
            type: 'bar',
            height: '100%'
        },
        title: {
            text: 'Probabilidad de que la receta pertenezca a cada estilo'
        },   
        xAxis: {
            categories: [], // Lista de estilos
            width: '200px',
            /*
            labels:{
                useHTML: true,                        
                step: 1,
                formatter: function () {
                    return '<div style="width:500px">' + this.value + '</div>';
                }
            }
            */
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Probabilidad (%)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
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
                <div id={this.props.id}></div>                
            </figure>
        )
    }
    
    componentDidMount() {        
        this.config.xAxis.categories = this.props.data.names;
        this.config.series[0].data = this.props.data.data;
        this.chart = Highcharts.chart(this.props.id, this.config);
    }

    componentDidUpdate() {
        this.chart.update({
            xAxis: {
                categories: this.props.data.names
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