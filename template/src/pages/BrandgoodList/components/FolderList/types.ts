import React from 'react';
import { IMenuSelectInfo, IRowProps } from '@muya-ui/core';

export interface IFolderListProps extends Omit<IRowProps, 'onChange' | 'onClick'> {
    /**
     * 列表数据
     */
    data: IDataProps[];
    /**
     * checkbox 选中数据
     */
    checkedData: IDataProps[];
    /**
     * checkbox 事件
     */
    onChange?: (checkedData: IDataProps[]) => void;
    /**
     * 菜单点击事件
     */
    onOverlayClick?: (selectInfo: IMenuSelectInfo, item: IDataProps) => void;
    /**
     * 卡片点击事件
     */
    onClick?: (item: IDataProps) => void;
    /**
     * 是否处于加载中
     *
     * @type {boolean}
     * @memberof IFolderListProps
     */
    loading?: boolean;
    /**
     * 默认数据的数量
     *
     * @type {number}
     * @memberof IFolderListProps
     */
    defaultDataCount?: number;
}

export interface StyledCardProps {
    checked: boolean;
}

export interface IDataProps {
    /**
     * 图片链接
     */
    imgSrc: string;
    key: React.Key;
}
