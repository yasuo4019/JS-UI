import React, { useMemo, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import _ from 'lodash';

import DynamicBreadcrumbs from './DynamicBreadcrumbs';

function ViewTable({ items, colNames }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const sortedItems = useMemo(() => {
        if (sortConfig.key !== null) {
            return [...items].sort((a, b) => {
                if (_.get(a.contents, [sortConfig.key]) < _.get(b.contents, [sortConfig.key])) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (_.get(a.contents, [sortConfig.key]) > _.get(b.contents, [sortConfig.key])) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return items;
    }, [items, sortConfig]);

    const onSort = useCallback((key) => {
        setSortConfig((currentSortConfig) => {
            if (currentSortConfig.key === key && currentSortConfig.direction === 'ascending') {
                return { key, direction: 'descending' };
            } else {
                return { key, direction: 'ascending' };
            }
        });
    }, []);

    const headCols = useMemo(() => colNames.map(column => (
            <th key={_.uniqueId(column.key)} onClick={() => onSort(column.key)} style={{ cursor: 'pointer' }}>
                {column.title}
                {sortConfig.key === column.key ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ''}
            </th>
        )),
        [colNames, onSort, sortConfig]
    );

    const rows = useMemo(() => sortedItems.map(item => (
            <tr key={_.uniqueId(item.id)}>
                {colNames.map(column => {
                    const content = _.get(item.contents, [column.key, 'defaultValue']);
                    
                    return (
                        <td key={column.key}>
                            {content ?? '-'}
                        </td>
                    );
                })}
            </tr>
        )),
        [sortedItems, colNames]
    );


    return (
    <>
        <DynamicBreadcrumbs />
            <Table striped hover responsive size="sm" className="table">
                <thead>
                    <tr>{headCols}</tr>
                </thead>
                <tbody>
                    {sortedItems.length ? rows :
                        <tr className="empty-state">
                            <th colSpan={headCols.length} className="no-data">
                                {'No data to display'}
                            </th>
                        </tr>
                    }
                </tbody>
            </Table>
    </>
    );
}

export default ViewTable;
