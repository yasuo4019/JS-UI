import _ from 'lodash';
import { createSelector } from "@reduxjs/toolkit";

export const getItems = state => state.table.items;
export const getColumnNames = state => state.table.cols;
export const getPageIndex = state => state.table.page;
export const getPagesCount = state => state.table.pageCount;
export const getLoadingState = state => state.table.state;
export const getDependencies = state => state.table.dependencies;

export const selectedRowsCount = createSelector([getItems], items => items.filter(item => item.selected).length);
export const isAnyDataLoading = createSelector([getItems], items => items.filter(
    item => item.isLoading || _.values(item.contents).some(property => property.isLoading)
).length);

export const hasValueChanged = createSelector([getItems], items => Boolean(
    items.filter(item => _.values(item.contents)
        .some(content => content.isChanged)
    ).length
));

export const hasDependenciesLoaded = createSelector(
    [getDependencies],
    dependencies => dependencies.some(dependency => dependency?.options?.length)
);
