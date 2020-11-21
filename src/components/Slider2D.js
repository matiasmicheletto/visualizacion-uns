import React, {Component} from 'react';
import knob from '../img/slider_knob.png'
import './Slider2D.css'

const knobImg = new Image(50, 50);
knobImg.src = knob;

class Slider2D extends Component {
    
    // Propiedades del slider
    width = 800
    height = 800
    xLabel = "Eje X"
    yLabel = "Eje Y"
    padding = 20
    ctx = null   

    dragging = false    
    
    state = { // Valor del slider
        xValue: 59,
        yValue: 60
    }

    constructor() {
        super();
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();        
    }

    render() {
        return (
            <div ref={this.containerRef} className="canvas-container">
                <canvas ref={this.canvasRef} 
                    onMouseDown={this.mouseDown}
                    onMouseMove={this.mouseMove}
                    onMouseUp={this.mouseUp}
                ></canvas>
            </div>
        )
    }

    componentDidUpdate() {

        // Redibujado canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Dibujar ejes de coordenadas
        // Eje Y
        this.ctx.moveTo(this.padding, this.height - this.padding);
        this.ctx.lineTo(this.padding, this.padding);
        // Etiqueta
        this.ctx.save();
        this.ctx.rotate(-Math.PI/2);
        this.ctx.fillText(this.yLabel, this.padding - 100, this.padding);
        this.ctx.restore();
        
        // Eje X
        this.ctx.moveTo(this.padding, this.height - this.padding);
        this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
        // Etiqueta
        this.ctx.fillText(this.xLabel, this.width - this.padding - 50, this.height - this.padding + 20);

        this.ctx.stroke();

        // Dibujar perilla del deslizador
        const x = Math.round(this.state.xValue / 100 * (this.width - 2*this.padding)) + this.padding;
        const y = Math.round((100 - this.state.yValue) / 100 * (this.height - 2*this.padding)) + this.padding;
        
        this.ctx.drawImage(knobImg, x - 20, y - 20, 40, 40);
    }

    componentDidMount() { 

        const canvas = this.canvasRef.current;

        // Configurar dimensiones del canvas
        this.width = this.containerRef.current.clientWidth;
        this.height = this.containerRef.current.clientHeight;
        canvas.width = this.width;
        canvas.height = this.height;

        this.ctx = canvas.getContext("2d");
        this.ctx.font = "25px Helvetica";
        this.ctx.textAlign = "center";

        if(this.props.xLabel) this.xLabel = this.props.xLabel;
        if(this.props.yLabel) this.yLabel = this.props.yLabel;

        // Configurar valor inicial del slider
        this.setState({
            xValue: this.props.xValue,
            yValue: this.props.yValue
        });

        // Crear eventos de mouse
        this.mouseDown = e => {            
            this.dragging = true;
        }

        this.mouseUp = e => {
            if(this.dragging){
                this.mouseMove(e); // Click sin arrastrar
                this.dragging = false;                
            }
        }

        this.mouseMove = e => {
            if(this.dragging){
                const r = canvas.getBoundingClientRect();

                // Mapear a escala 0-100
                const x = (e.clientX - r.left - this.padding) / (r.right - r.left - 2*this.padding) * 100;
                const y = 100 - (e.clientY - r.top - this.padding) / (r.bottom - r.top - 2*this.padding) * 100;
                
                this.setState({xValue: x, yValue: y}); // Actualizar estado

                this.props.onChange({ // Emitir evento
                    xValue: x, 
                    yValue: y
                });
            }
        }

        knobImg.onload = () => {
            this.componentDidUpdate();
        }
    }    
}

export default Slider2D;