import { createUseStyles, Styles, useTheme } from 'react-jss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SketchList } from './SketchList';
import { Theme } from 'Themes/BaseTheme';
import { SketchPreviewProps } from 'Components/Sketches/SketchTypes';

export const Gallery: React.FC = () => {
    const theme: Theme = useTheme();
    const styles = useStyles();

    const galleryComponents: JSX.Element[] = SketchList.map((sketch, i) => (
        <div className={styles.contentContainer} key={i}>
            <div className={styles.sketchTitle}>{sketch.name}</div>
            <NavLink to={sketch.name} className={styles.content}>
                {React.createElement<SketchPreviewProps>(sketch.preview, { theme: theme, width: 100, height: 100 })}
            </NavLink>
        </div>
    ));

    return <div className={styles.container}>{galleryComponents}</div>;
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
        },
        content: {
            margin: '1rem',
            border: `1px ${theme.textColor.primary} solid`,
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }),
);
