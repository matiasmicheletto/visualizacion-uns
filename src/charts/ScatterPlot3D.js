import React, {Component} from 'react'
import Highcharts from 'highcharts';
import 'highcharts/highcharts-3d';
import data from '../data/Brewers_Friend_Recipes.json'
import _ from 'lodash'

class ScatterPlot3D extends Component {
    config = {
        "chart": {            
            "type": "scatter3d",
            "zoomType": "xy",
            "height": "80%",
            "options3d": {
                "enabled": true,
                "alpha": 10,
                "beta": 30,
                "depth": 250,
                "viewDistance": 5,
                "fitToPlot": false,
                "frame": {
                    "bottom": { "size": 1, "color": 'rgba(0,0,0,0.02)' },
                    "back": { "size": 1, "color": 'rgba(0,0,0,0.04)' },
                    "side": { "size": 1, "color": 'rgba(0,0,0,0.06)' }
                }
            }
        },
        "credits":{
            "enabled":false
        },
        "title": {
            "text": this.props.dataX+" vs "+this.props.dataY+" para distintos estilos de cerveza"
        },
        "subtitle": {
            "text": "Fuente: Brewer's Friend Recipes"
        },
        "xAxis": {
            "title": {
                "enabled": true,
                "text": this.props.dataX
            }           
        },
        "yAxis": {
            "title": {
                "text": this.props.dataY
            }
        },
        "<Axis": {
            "title": {
                "text": this.props.dataZ
            }
        },
        "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",        
            "floating": true,
            "backgroundColor": "#ffffff",
            "borderWidth": 1
        },
        "plotOptions": {
            "scatter": {
                "marker": {
                    "radius": 5,
                    "states": {
                        "hover": {
                            "enabled": true,
                            "lineColor": "rgb(100,100,100)"
                        }
                    }
                },
                "states": {
                    "hover": {
                        "marker": {
                            "enabled": false
                        }
                    }
                },
                "tooltip": {
                    "headerFormat": "<b>{series.name}</b><br>",
                    "pointFormat": "{point.x}, {point.y}"
                }
            }
        }
    }

    render() {        
        return(
            <figure className="highcharts-figure">
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
                serie.data.push([
                    styles[s][d][this.props.dataX], 
                    styles[s][d][this.props.dataY],
                    styles[s][d][this.props.dataZ]
                ]);
            series.push(serie);
        }

        this.config.series = series;

        Highcharts.chart(this.props.id, this.config);        
    }
}

export default ScatterPlot3D;