import { ChristmasSketchComponent, ChristmasSketchPreview } from 'Components/Sketches/Chistmas/Christmas';
import { EcosystemSketchComponent, EcosystemSketchPreview } from 'Components/Sketches/Ecosystem/Ecosystem';
import { MandelbrotPreview, MandelbrotSketchComponent } from 'Components/Sketches/Mandelbrot/Mandelbrot';
import { SketchPreviewProps } from 'Components/Sketches/SketchTypes';
import { SnowflakeSketchComponent, SnowflakeSketchPreview } from 'Components/Sketches/Snowflake/Snowflake';
import { TestSketch, TestSketchPreview } from 'Components/Sketches/Test';
import { TimesTablesPreview, TimesTablesSketchComponent } from 'Components/Sketches/TimesTables/TimesTables';
import React from 'react';

export interface SketchPair {
    name: string;
    component: React.ComponentType<SketchPreviewProps>;
    preview: React.ComponentType<SketchPreviewProps>;
}
export const SketchList: SketchPair[] = [
    { name: 'Test', component: TestSketch, preview: TestSketchPreview },
    { name: 'TimesTables', component: TimesTablesSketchComponent, preview: TimesTablesPreview },
    { name: 'Mandelbrot', component: MandelbrotSketchComponent, preview: MandelbrotPreview },
    { name: 'Ecosystem', component: EcosystemSketchComponent, preview: EcosystemSketchPreview },
    { name: 'Snowflake', component: SnowflakeSketchComponent, preview: SnowflakeSketchPreview },
    { name: 'Christmas', component: ChristmasSketchComponent, preview: ChristmasSketchPreview },
];
