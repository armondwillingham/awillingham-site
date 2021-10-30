import P5 from 'p5';
import React, { useCallback, useEffect, useState } from 'react';

import { hexToRgb } from 'Utils/HexToRgb';
import { SketchPreviewProps } from '../SketchTypes';

const MAX_ITER = 10;

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

interface MandlebrotSketchProps extends SketchPreviewProps {
    zoom: number;
}
export class MandlebrotSketch extends React.PureComponent<MandlebrotSketchProps, TestSketchState> {
    constructor(props: MandlebrotSketchProps) {
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

        p5.setup = (): void => {
            p5.createCanvas(W, H);
        };

        p5.draw = (): void => {
            const backgroundColor = hexToRgb(this.props.theme.backgroundColor.primary);
            p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            p5.colorMode(p5.HSB);
            const zoom = this.props.zoom;
            for (let i = 0; i < W; ++i) {
                for (let j = 0; j < H; ++j) {
                    const x = p5.map(i + translateX * zoom, 0, W, -2 / zoom, 1 / zoom);
                    const y = p5.map(j + translateY * zoom, 0, H, -1.5 / zoom, 1.5 / zoom);
                    const mandlebrot = this.calculateMandlebrot(x, y);
                    const color = p5.map(mandlebrot, 1, MAX_ITER * zoom, 0, 255);
                    p5.set(i, j, p5.color(color, 100, 100));
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
        };

        p5.mouseDragged = (e: any): void => {
            if (e.clientX < 0 || e.clientX > W || e.clientY < 0 || e.clientY > H) {
                return;
            }
            const dx = (prevMouseX - e.clientX) / this.props.zoom;
            const dy = (prevMouseY - e.clientY) / this.props.zoom;
            translateX += dx;
            translateY += dy;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        };
    };

    calculateMandlebrot(x: number, y: number): number {
        const z = new Complex(0, 0);
        let n = 0;
        while (z.abs() <= 2 && n < MAX_ITER * this.props.zoom) {
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
    const [zoom, setZoom] = useState(1);
    const [deltaZoom, setDeltaZoom] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const W = 500;
    const H = 500;

    const startZoom = useCallback((amt: number) => {
        setIsZooming(true);
        setDeltaZoom(amt);
    }, []);

    const stopZoom = useCallback((): void => {
        setIsZooming(false);
    }, []);

    useEffect(() => {
        if (!isZooming) return;
        setZoom(zoom + deltaZoom);
    }, [isZooming, zoom, deltaZoom]);

    return (
        <div>
            <MandlebrotSketch {...props} width={W} height={H} zoom={zoom} />
            <button onMouseDown={() => startZoom(0.25)} onMouseUp={() => stopZoom()}>
                Zoom in
            </button>
            <button onMouseDown={() => startZoom(-0.25)} onMouseUp={() => stopZoom()}>
                Zoom out
            </button>
            <div>Zoom: {zoom}</div>
        </div>
    );
};

export const MandlebrotPreview = (props: SketchPreviewProps): JSX.Element => {
    return <MandlebrotSketch {...props} zoom={1} />;
};
