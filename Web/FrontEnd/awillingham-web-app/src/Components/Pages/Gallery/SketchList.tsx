import { Test, TestPreview } from 'Components/Sketches/Test';

export interface SketchPair {
    name: string;
    component: React.ComponentClass | React.FunctionComponent;
    preview: React.ComponentClass | React.FunctionComponent;
}
export const SketchList: SketchPair[] = [{ name: 'Test', component: Test, preview: TestPreview }];
