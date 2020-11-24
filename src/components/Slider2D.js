import React, {Component} from 'react';
import knob from '../img/slider_knob.png'
import './Slider2D.css'

const knobImg = new Image(50, 50);
knobImg.src = knob;

class Slider2D extends Component {
    // Implementa un slider para desplazarse por un espacio de dos dimensiones
    
    // Propiedades del slider
    width = 800
    height = 800
    padding = 20 // Espacio entre el borde y el eje
    updateFreq = 100 // Velocidad de actualizacion de mouse (ms)

    // Atributos privados
    ctx = null   
    lastUpdate = 0
    dragging = false  

    config = { // Configuracion por defecto
        xLabel: "Eje X",
        yLabel: "Eje Y",
        xPrefix: "",
        yPrefix: "",
        xMin: 0,
        yMin: 0,
        xMax: 100,
        yMax: 100
    }

    state = { // Valor del slider
        xValue: 59,
        yValue: 60
    }

    xyToCanvas(x, y) { // Conversion de coordenadas
        const v = Math.round((x - this.config.xMin) / (this.config.xMax - this.config.xMin) * (this.width - 2*this.padding)) + this.padding;
        const w = Math.round((this.config.yMax - y) / (this.config.yMax - this.config.yMin) * (this.height - 2*this.padding)) + this.padding;
        return [v, w];
    }

    canvasToXY(v, w, canvas) { // Conversion de coordenadas
        const r = canvas.getBoundingClientRect();

        const x = (v - r.left - this.padding) / (r.right - r.left - 2*this.padding) * (this.config.xMax - this.config.xMin) + this.config.xMin;
        const y = this.config.yMax - (w - r.top - this.padding) / (r.bottom - r.top - 2*this.padding) * (this.config.yMax - this.config.yMin);

        return [x, y];
    }

    constructor() {
        super();
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();        

        window.addEventListener('resize', () => { // Ajustar escalas al cambiar tamanio de ventana
            try{
                const canvas = this.canvasRef.current;
                this.width = this.containerRef.current.clientWidth;
                this.height = this.containerRef.current.clientHeight;
                canvas.width = this.width;
                canvas.height = this.height;
                //this.ctx.font = "18px Helvetica";
                //this.ctx.lineWidth = 3;
                this.componentDidUpdate();
            }catch(e){
                //console.log(e);
            }
        });
    }

    render() {
        return (
            <div ref={this.containerRef} className="canvas-container">
                <canvas ref={this.canvasRef} 
                    onMouseDown={this.mouseDown}
                    onMouseMove={this.mouseMove}
                    onMouseUp={this.mouseUp}
                    onWheel={this.mouseWheel}
                ></canvas>
            </div>
        )
    }

    componentDidUpdate() { // Redibujado 

        // Borrar canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Dibujar ejes de coordenadas
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "18px Helvetica";
        this.ctx.lineWidth = 3;

        // Eje Y
        this.ctx.moveTo(this.padding, this.height - this.padding);
        this.ctx.lineTo(this.padding, this.padding);
        // Etiqueta (90° de rotacion)
        this.ctx.save();
        this.ctx.rotate(-1.571);
        this.ctx.fillText(this.config.yLabel, this.padding - 80, this.padding - 5);
        this.ctx.restore();
        
        // Eje X
        this.ctx.moveTo(this.padding, this.height - this.padding);
        this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
        // Etiqueta
        this.ctx.fillText(this.config.xLabel, this.width - this.padding - 50, this.height - this.padding + 20);

        this.ctx.stroke();        

        // Ejes del deslizador
        const xy = this.xyToCanvas(this.state.xValue, this.state.yValue);
        
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(xy[0], xy[1]);
        this.ctx.lineTo(xy[0], this.height - this.padding);
        this.ctx.fillText(this.state.xValue.toFixed(2)+this.config.xPrefix, xy[0] + 30, this.height - this.padding - 5);
        
        this.ctx.moveTo(xy[0], xy[1]);
        this.ctx.lineTo(this.padding, xy[1]);
        this.ctx.fillText(this.state.yValue.toFixed(2), this.padding + 30, xy[1]);
        
        this.ctx.stroke();
        

        // Dibujar centroides de cada clase
        // El radio es proporcional al peso de la clase
        if(this.props.dataBackground){
            this.ctx.font = "bold 12px Helvetica"; // Estilo de las etiquetas de las clases
            for(let k in this.props.dataBackground.data){
                let d = this.props.dataBackground.data[k]; // Para simplificar nombre
                
                this.ctx.strokeStyle = d.color; // Color solido de borde
                this.ctx.fillStyle = d.color_t; // Color semitransparente de fondo
                this.ctx.lineWidth = this.props.dataBackground.names[k] === this.props.selected ? 10 : 2; // Estilo seleccionado
                
                let p = this.xyToCanvas(d.u[2], d.u[1]); // Coordenadas para dibujar circulo y texto
                
                this.ctx.beginPath();
                this.ctx.arc(p[0], p[1], d.y*5, 0, 6.3);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();

                if(this.props.showLabels) // Los nombres de los estilos se muestran si estan habilitados
                    this.ctx.fillText(this.props.dataBackground.names[k], p[0], p[1]);
            }
        }

        // Dibujar perilla del deslizador
        this.ctx.drawImage(knobImg, xy[0] - 20, xy[1] - 20, 40, 40);
    }

    componentDidMount() { 

        const canvas = this.canvasRef.current;

        // Configurar dimensiones del canvas
        this.width = this.containerRef.current.clientWidth;
        this.height = this.containerRef.current.clientHeight;
        canvas.width = this.width;
        canvas.height = this.height;

        this.ctx = canvas.getContext("2d");
        this.ctx.textAlign = "center";
        this.ctx.lineWidth = 3;

        // Copiar configuracion
        if(this.props.config)
            this.config = Object.assign(this.config, this.props.config);

        // Configurar valor inicial del slider
        this.setState({
            xValue: this.props.xValue,
            yValue: this.props.yValue
        });

        // Crear eventos de mouse para las interacciones
        this.mouseDown = e => { // Inicio del arrastre del la perilla
            this.dragging = true;
        }

        this.mouseUp = e => { // Fin del arrastre de la perilla
            if(this.dragging){
                this.mouseMove(e); // En caso de click sin arrastrar, efectuar actualizacion con este metodo
                this.dragging = false;                
            }
        }

        this.mouseMove = e => {
            if(this.dragging && Date.now() - this.lastUpdate > this.updateFreq){ // Limitar frecuencia

                this.lastUpdate = Date.now(); // Limitar frecuencia de actualizacion

                const xy = this.canvasToXY(e.clientX, e.clientY, canvas);
                
                this.setState({ // Actualizar estado
                    xValue: xy[0], 
                    yValue: xy[1]
                }); 

                this.props.onChange({ // Emitir evento
                    xValue: xy[0], 
                    yValue: xy[1]
                });
            }
        }

        this.mouseWheel = e => { 
            if(Date.now() - this.lastUpdate > this.updateFreq){ // Limitar frecuencia
            
                this.lastUpdate = Date.now(); // Limitar frecuencia de actualizacion

                const xy = this.canvasToXY(e.clientX, e.clientY, canvas);

                const w = this.config.xMax - this.config.xMin;
                const h = this.config.yMax - this.config.yMin;

                const r = e.deltaY < 0 ? 0.4 : 0.6; // Zoom in : Zoom out
                
                this.config.xMin = xy[0] - w * r;
                this.config.xMax = xy[0] + w * r;

                this.config.yMin = xy[1] - h * r;
                this.config.yMax = xy[1] + h * r;

                this.componentDidUpdate();
            }
        }

        knobImg.onload = () => { // Luego de cargar imagen de la perilla, redibujar
            this.componentDidUpdate();
        }
    }    
}

export default Slider2D;