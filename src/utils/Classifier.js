import data from '../data/beer_styles_distribution.json';
import {multiply, transpose} from 'mathjs';
import {hsl2rgb} from './Colors.js';
import {LtoRGB} from '../utils/LovibondScale.js';

const mahalanobis = (x, u, ci) => { 
    // Calcula la distancia de Mahalanobies entre el vector x y el vector u dada
    // la matriz de covarianza inversa ci.

    let x_mu = [
        x[0] - u[0],
        x[1] - u[1],
        x[2] - u[2]
    ];

    let m = multiply( multiply(x_mu, ci), transpose(x_mu) );
    
    return m;
};

const classify = (s, n = 10, uf = false, cm = false) => {
    // Dado el estilo de cerveza con atributos "s = {color, ibu, abv}" obtiene la distancia
    // de Mahalanobis a cada estilo de cerveza conocido presente en el dataset "data"
    // "n" es la cantidad de resultados a devolver, "uf" indica si hay que tener
    // en cuenta la frecuencia de cada clase o no y "cm" es para alternar el mapa
    // de color basado en el color del centroide de la clase o el color predefinido

    // Devuelve un objeto con el formato necesario para graficar clases con Highcharts
    

    let x = [s.color, s.ibu, s.abv]; // Vector de la receta a evaluar
    
    let styles = []; // Lista de distancias a cada distribucion

    const fSum = uf ? data.reduce((a, b) => {return a + b.Freq}, 0) : 0; // Suma de la frecuencia de cada clase

    for(let k in data){ // Para cada clase o estilo

        let u = [ // Centroide de la clase (promedio)
            data[k].u_Color,
            data[k].u_IBU,
            data[k].u_ABV
        ];

        let ci = [ // Matriz de covarianza inversa de la distribucion
            [data[k].s11, data[k].s12, data[k].s13],
            [data[k].s21, data[k].s22, data[k].s23],
            [data[k].s31, data[k].s32, data[k].s33]
        ];

        const m = uf ? mahalanobis(x, u, ci) * data[k].Freq / fSum : mahalanobis(x, u, ci);

        styles.push({ // Agregar nuevo resultado de distancia de Mahalanobis
            name: data[k].Style,
            dist: m,
            u: [data[k].u_Color, data[k].u_IBU, data[k].u_ABV]
        });
    }

    
    styles.sort(( a,b ) => { // Ordenar resultados por distancia
        return  a.dist > b.dist ? 1 : -1;
    });


    // Convertir a una escala legible similar a porcentaje de probabilidad
    // La condicion es que la suma de las escalas invertidas, de P = 100%

    let subStyles = styles.slice(0, n+1); // Tomar un elemento mas de los que se van a mostrar para que el ultimo no quede en 0
    const maxDist = Math.max.apply(Math, subStyles.map(v => { return v.dist; })); // Maxima distancia dentro de las n primeras clases
    const cSum = subStyles.reduce((a, b) => {return a + b.dist}, 0); // Suma de todos los elementos del subconjunto
    subStyles = subStyles.map( v => {return { // Aplicar formula a cada elemento
        name: v.name, 
        dist: (maxDist - v.dist)/(maxDist*n - cSum + maxDist)*100,
        u: v.u
    }} ); 

    // Adaptar los resultados al formato de salida
    let result = {
        names: [],
        data: [],
        u: []
    };

    for(let k in subStyles.slice(0,n)){ // Volver a recortar para quitar el ultimo elemento (n+1) que no debe graficarse
        result.names[k] = subStyles[k].name;
        if(!cm) // Usar colores predefinidos
            result.data[k] = {
                // Datos para grafico highchart
                y: Math.round(subStyles[k].dist*100)/100, // Reducir a dos cifras
                color: colors[subStyles[k].name], // Asignar color solido
                // Datos para scatterplot en canvas
                color_t: colors[subStyles[k].name+"_t"], // Asignar color semitransparente
                u: subStyles[k].u // Pasar centroide
            };
        else{ // Usar color del centroide de la clase
            const centrColor = LtoRGB(subStyles[k].u[0]); // Componente 0 de u es Color
            result.data[k] = {
                // Datos para grafico highchart
                y: Math.round(subStyles[k].dist*100)/100, // Reducir a dos cifras
                color: "rgb("+centrColor[0]+","+centrColor[1]+","+centrColor[2]+")", // Asignar color solido
                // Datos para scatterplot en canvas
                color_t: "rgba("+centrColor[0]+","+centrColor[1]+","+centrColor[2]+","+0.5+")", // Asignar color semitransparente
                u: subStyles[k].u // Pasar centroide
            };
        }
    }

    return result;
};

// Generar colores para las clases o estilos
// Cada clase tiene asignado un valor de matiz distinto y los valores de saturacion
// y luminosidad son aleatorios
var colors = {};
let N = data.length; 
for(let k in data){    
    let rgb = hsl2rgb(k/N, 0.6 + Math.random()*0.4, 0.2 + Math.random()*0.4);    
    colors[data[k].Style] = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")"; // Color solido
    colors[data[k].Style+"_t"] = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+", 0.5)"; // Color semitransparente
};

export default classify;