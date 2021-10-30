import { SketchPreviewProps } from 'Components/Sketches/SketchTypes';
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
];
