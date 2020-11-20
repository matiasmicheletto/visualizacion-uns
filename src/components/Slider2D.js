import React, {Component} from 'react';
import knob from '../img/slider_knob.png'
import './Slider2D.css'

class Slider2D extends Component {
    
    state = {
        xValue: 0,
        yValue: 0
    }

    constructor() {
        super();
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();        
    }

    render() {
        return (
            <div ref={this.containerRef} className="canvas-container">
                <canvas ref={this.canvasRef}></canvas>
            </div>
        )
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.width = this.containerRef.current.clientWidth;
        canvas.height = this.containerRef.current.clientHeight;

        const ctx = canvas.getContext("2d");
        
        const img = new Image(50, 50);        
        img.src = knob;
        img.onload = function() {            
            ctx.drawImage(img, canvas.width/2, canvas.height/2, 50, 50);
        }
        
    }
}

export default Slider2D;