import _ from 'lodash';
//import { useMemo } from "react";
import React, { useState, useMemo, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TdInput from "./elements/TdInput.jsx";
import TdDropdown from "./elements/TdDropdown.jsx";
import TdCheckbox from "./elements/TdCheckbox.jsx";
import './elements/EditableTable.css';

function EditableTable({ items, dependencies, hasDependenciesLoaded, colNames = [], onChange, onSelect }) {

    //new
    // State to keep track of which column is being sorted and the direction
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Handler for sorting
    const onSort = useCallback((key) => {
        setSortConfig((currentSortConfig) => {
            if (currentSortConfig.key === key && currentSortConfig.direction === 'ascending') {
                return { key, direction: 'descending' };
            } else {
                return { key, direction: 'ascending' };
            }
        });
    }, []);

    // Sort items
    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (_.get(a, sortConfig.key) < _.get(b, sortConfig.key)) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (_.get(a, sortConfig.key) > _.get(b, sortConfig.key)) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    // Update the header cols to be clickable for sorting
    const headCols = useMemo(
        () => [
            (<th key={0}>#</th>)
        ].concat(
            colNames.map((column, index) => (
                <th
                    key={`${column.key}_${index}`}
                    onClick={() => onSort(column.key)}
                    style={{ cursor: 'pointer' }} // Indicates that the header is clickable
                >
                    {column.title}
                    {sortConfig.key === column.key ? ( // Add an icon or text to show sort direction
                        sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                    ) : null}
                </th>
            ))
        ),
        [colNames, onSort, sortConfig]
    );
    //new

    // const headCols = useMemo(
    //     () => [
    //         (<th key={0}>#</th>)
    //     ].concat(
    //         colNames.map((column, index) => (
    //             <th key={`${column.key}_${index}`}>
    //                 {column.title}
    //             </th>
    //         ))
    //     ),
    //     [colNames]
    // );

    const rows = useMemo(
        () => items.map((item, index) => (
            <tr key={`${item.id}_${index}`}>
                <TdCheckbox item={item} onSelect={onSelect} error={item.error}/>
                {
                    colNames.map(column => {
                        const content = _.get(item.contents, [column.key]);

                        if (item.isLoading || content.isLoading) {
                            return (
                                <td
                                    key={`loading-${item.id}-${column.key}`}
                                    id={`input-${item.id}-${column.key}-loading`}
                                >
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </td>
                            );
                        }

                        const dependency = dependencies.find(d => d.key === column.dependency);

                        if (dependency && hasDependenciesLoaded) {
                            return (
                                <TdDropdown
                                    key={`${item.id}-${column.key}`}
                                    row={item.id}
                                    col={column.key}
                                    value={content.value}
                                    error={content.error}
                                    options={dependency.options}
                                    isChanged={content.isChanged}
                                    onSelect={onChange}
                                />
                            );
                        }

                        return (
                            <TdInput
                                key={`${item.id}-${column.key}`}
                                row={item.id}
                                col={column.key}
                                error={content.error}
                                value={content.value}
                                isChanged={content.isChanged}
                                onChange={onChange}
                            />
                        );
                    })
                }
            </tr>
        )),
        [items, colNames, dependencies, hasDependenciesLoaded, onSelect, onChange]
    );

    return (
        <Table striped hover responsive bordered size="sm">
            <thead>
                <tr>
                    {headCols}
                </tr>
            </thead>
            <tbody>
                {
                    //items.length ? rows :
                    sortedItems.length ? rows : // new
                        <tr>
                            <td colSpan={headCols.length}>
                                {'No data to display'}
                            </td>
                        </tr>
                }
            </tbody>
        </Table>
    );
};

export default EditableTable;
