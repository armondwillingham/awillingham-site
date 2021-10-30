import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TimesTableInstance } from './TimesTables';
import P5 from 'p5';
import { Styles } from 'jss';
import { createUseStyles } from 'react-jss';
import { Theme } from 'Themes/BaseTheme';
import { DetailedTimesTableOptions } from './DetailedTimesTableOptions';
import { EmptyTimeTableOptions } from './EmptyTimesTableOptions';

interface TimesTablesControlsProps {
    timesTables: TimesTableInstance[];
    setTimesTables: Dispatch<SetStateAction<TimesTableInstance[]>>;
    width: number;
    height: number;
}
export const TimesTablesControls = ({
    timesTables,
    setTimesTables,
    width,
    height,
}: TimesTablesControlsProps): JSX.Element => {
    const [selectedTable, setSelectedTable] = useState<TimesTableInstance | undefined>(undefined);
    const styles = useStyles();

    useEffect((): void => {
        setTimesTables(getDefaultTimesTables(width, height));
    }, []);

    const list = timesTables.map((table, idx): JSX.Element => {
        return (
            <div
                onClick={(): void => {
                    setSelectedTable(table);
                }}
                key={idx}
                className={styles.listItem}
            >
                {table.name}
            </div>
        );
    });

    const details = selectedTable ? <DetailedTimesTableOptions table={selectedTable} /> : <EmptyTimeTableOptions />;

    return (
        <div className={styles.controlsContainer}>
            <div className={styles.listContainer}>{list}</div>
            {details}
        </div>
    );
};

const getDefaultTimesTables = (width: number, height: number): TimesTableInstance[] => {
    const size = width / 2;

    const pos1 = new P5.Vector();
    pos1.x = -width / 4;
    const pos2 = new P5.Vector();
    pos2.x = -pos1.x;
    const basicTimesTable: TimesTableInstance = {
        position: pos1,
        size: size,
        resolution: 10,
        factor: 2,
        name: 'Left',
    };
    const basicTimesTable2: TimesTableInstance = {
        position: pos2,
        size: size,
        resolution: 100,
        factor: 0.01,
        name: 'Right',
    };

    return [basicTimesTable, basicTimesTable2];
};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        controlsContainer: {
            display: 'flex',
        },
        listContainer: {
            display: 'flex',
        },
        listItem: {
            padding: '1rem',
            cursor: 'pointer',
        },
    }),
);
