import React, {Component} from 'react';
import knob from '../img/slider_knob.png'
import './Slider2D.css'

const knobImg = new Image(50, 50);
knobImg.src = knob;

class Slider2D extends Component {
    
    // Propiedades del slider
    width = 800
    height = 800
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

        // Mapeo de coordenadas
        const x = Math.round(this.state.xValue / 100 * this.width);
        const y = Math.round((100 - this.state.yValue) / 100 * this.height);

        // Redibujado canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(knobImg, x - 20, y - 20, 40, 40);
    }

    componentDidMount() { 

        const canvas = this.canvasRef.current;

        // Configurar dimensiones del canvas
        canvas.width = this.width;
        canvas.height = this.height;

        this.ctx = canvas.getContext("2d");

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
                const x = (e.clientX - r.left) / (r.right - r.left) * 100;
                const y = 100 - (e.clientY - r.top) / (r.bottom - r.top) * 100;
                
                this.setState({xValue: x, yValue: y}); // Actualizar estado

                this.props.onChange({ // Emitir evento
                    xValue: this.state.xValue, 
                    yValue: this.state.yValue
                });
            }
        }

        knobImg.onload = () => {
            this.componentDidUpdate();
        }
    }    
}

export default Slider2D;