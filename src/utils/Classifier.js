import data from '../data/beer_styles_distribution.json';
import {multiply, transpose} from 'mathjs';

const randomColor = () => {
    // Devuelve un valor aleatorio entre 0 y 256 para generar colores
    return Math.floor(Math.random()*256);
};

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

const classify = (s) => {
    // Dado el estilo de cerveza con atributos s = {color, ibu, abv} obtiene la distancia
    // de Mahalanobis a cada estilo de cerveza conocido presente en el dataset "data"

    let x = [s.color, s.ibu, s.abv]; // Vector de la receta a evaluar
    
    let styles = []; // Lista de distancias a cada distribucion

    for(let k in data){ // Para cada clase o estilo

        let u = [ // Centroide de la clase
            data[k].u_Color,
            data[k].u_IBU,
            data[k].u_ABV
        ];

        let ci = [ // Matriz de covarianza inversa de la distribucion
            [data[k].s11, data[k].s12, data[k].s13],
            [data[k].s21, data[k].s22, data[k].s23],
            [data[k].s31, data[k].s32, data[k].s33]
        ];

        styles.push({ // Agregar nuevo resultado
            name: data[k].Style,
            dist: mahalanobis(x, u, ci)
        });
    }
  
    styles.sort(( a,b ) => { // Ordenar resultados por distancia
        return  a.dist > b.dist ? 1 : -1;
    });

    // Adaptar los resultados al formato de salida
    let result = {
        names: [],
        data: []
    };

    for(let k in styles.slice(0,20)){
        result.names[k] = styles[k].name;
        result.data[k] = {
            y: Math.round(styles[k].dist*100)/100,
            color: colors[styles[k].name]
        }
    }

    return result;
};

// Generar colores aleatorios para las clases o estilos
var colors = {};
for(let k in data){
    let r = randomColor();
    let g = randomColor();
    let b = randomColor();
    colors[data[k].Style] = "rgb("+r+","+g+","+b+")";
};

export default classify;