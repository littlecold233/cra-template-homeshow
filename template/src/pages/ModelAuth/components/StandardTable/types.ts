import { ITableProps } from '@muya-ui/core';
import React from 'react';

export interface IStandardTableProps<T> extends Omit<ITableProps<T>, 'columns'> {
    onActionClick: (data: ITableData, type: ActionType) => void;
}

export interface ITableData {
    address: string;
    images: string[];
    shop: string;
    uploadDate: string;
    key: React.Key;
}

export enum ActionType {
    first,
    second,
}
