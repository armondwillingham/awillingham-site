import P5 from 'p5';
import React from 'react';

import { hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

const MAX_ITER = 50;

interface TestSketchState {
    canvasRef: React.RefObject<HTMLDivElement>;
    p5Instance: P5 | undefined;
}

class Complex {
    re: number;
    im: number;

    constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }

    abs(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    square(): Complex {
        this.multiply(this.re, this.im);
        return this;
    }

    multiply(re: number, im: number): Complex {
        const k1 = re * (this.im + this.re);
        const k2 = this.re * (im - re);
        const k3 = this.im * (re + im);
        this.re = k1 - k3;
        this.im = k1 + k2;
        return this;
    }

    add(re: number, im: number): Complex {
        this.re += re;
        this.im += im;
        return this;
    }
}

export class MandlebrotSketch extends React.PureComponent<SketchPreviewProps, TestSketchState> {
    constructor(props: SketchPreviewProps) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            p5Instance: undefined,
        };
    }

    componentDidMount(): void {
        this.setState({
            ...this.state,
            p5Instance: new P5(this.sketch, this.state.canvasRef.current),
        });
    }

    sketch = (p5: P5): void => {
        const W = this.props.width;
        const H = this.props.height;
        let translateX = 0;
        let translateY = 0;
        let prevMouseX = 0;
        let prevMouseY = 0;

        const scale = 1;
        p5.setup = (): void => {
            p5.createCanvas(W, H);
            p5.colorMode(p5.HSB);
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            for (let i = 0; i < W; ++i) {
                for (let j = 0; j < H; ++j) {
                    const x = p5.map(i + translateX, 0, W, -2, 1);
                    const y = p5.map(j + translateY, 0, H, -1.5, 1.5);
                    const mandlebrot = this.calculateMandlebrot(x, y);
                    const color = p5.map(mandlebrot, 1, MAX_ITER, 0, 255);
                    p5.set(i, j, color);
                }
            }
            p5.updatePixels();
        };

        p5.mousePressed = (e: any): void => {
            if (e.clientX < 0 || e.clientX > W || e.clientY < 0 || e.clientY > H) {
                return;
            }
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
            console.log({ prevMouseX, prevMouseY });
        };

        p5.mouseDragged = (e: any): void => {
            if (e.clientX < 0 || e.clientX > W || e.clientY < 0 || e.clientY > H) {
                return;
            }
            const dx = prevMouseX - e.clientX;
            const dy = prevMouseY - e.clientY;
            translateX += dx;
            translateY += dy;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
            console.log(translateX);
        };
    };

    calculateMandlebrot(x: number, y: number): number {
        const z = new Complex(0, 0);
        let n = 0;
        while (z.abs() <= 2 && n < MAX_ITER) {
            z.square().add(x, y);
            ++n;
        }
        return n;
    }

    render(): JSX.Element {
        return <div ref={this.state.canvasRef} />;
    }
}

export const MandlebrotSketchComponent = (props: SketchPreviewProps): JSX.Element => {
    const W = 500;
    const H = 500;
    return <MandlebrotSketch {...props} width={W} height={H} />;
};

export const MandlebrotPreview = (props: SketchPreviewProps): JSX.Element => {
    return <MandlebrotSketch {...props} />;
};
