import data from '../data/Brewers_Friend_Recipes.json'
var _ = require('lodash');

// Par de variables a relacionar
const vars = ["Color", "ABV"]

// Agrupar estilos
let styles = _.groupBy(data, 'Style');

// Generar series de datos
let series = [];
for(var s in styles){
    let serie = {
        name: s,
        //color: "rgba("+Math.floor(Math.random()*100+155)+", "+Math.floor(Math.random()*50+150)+", "+Math.floor(Math.random()*10)+", 0.6)",
        data: []
    };
    for(var d in styles[s])
        serie.data.push([styles[s][d][vars[0]], styles[s][d][vars[1]]]);
    series.push(serie);
}

const config = {
    "chart": {
        "type": "scatter",
        "zoomType": "xy",
        "height": "80%"
    },
    "credits":{
        "enabled":false
    },
    "title": {
        "text": vars[0]+" vs "+vars[1]+" para distintos estilos de cerveza"
    },
    "subtitle": {
        "text": "Source: Brewer's Friend Recipes"
    },
    "xAxis": {
        "title": {
            "enabled": true,
            "text": vars[0]
        },
        "startOnTick": true,
        "endOnTick": true,
        "showLastLabel": true
    },
    "yAxis": {
        "title": {
            "text": vars[1]
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
    },
    "series": series
  }

  export default config;