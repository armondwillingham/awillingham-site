import React from 'react';
import { TimesTableInstance } from './TimesTables';

export const DetailedTimesTableOptions = ({ table }: { table: TimesTableInstance }): JSX.Element => {
    return <div>{table.name}</div>;
};
