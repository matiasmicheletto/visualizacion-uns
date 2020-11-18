import React, {Component} from 'react'
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
            categories: [] // Lista de estilos
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',            
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: 'Probabilidad',   
                showInLegend:false,
                data: [] // Definir
            }
        ]
    }

    render() {        
        return(
            <figure className="highcharts-figure">
                <div id={this.props.id}></div>                
            </figure>
        )
    }
    
    componentDidMount() {

        this.config.xAxis.categories = ['Imperial IPA', 'Red Irish Ale', 'Imperial Stout'];
        this.config.series[0].data = [
            {y: 12, color: "#ff0000"},
            {y: 10},
            {y: 9}
        ];

        Highcharts.chart(this.props.id, this.config);
    }
}

export default BarPlot;