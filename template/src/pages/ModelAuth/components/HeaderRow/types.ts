import { IRowProps } from '@muya-ui/core';

export interface IHeaderRowProps extends IRowProps {
    /**
     * 是否展示下边框
     *
     * @default true
     * @type {boolean}
     * @memberof IPageHeaderProps
     */
    bordered?: boolean;
    /**
     * Row的高度
     *
     * @default 52
     * @type {(string | number)}
     * @memberof IHeaderRowProps
     */
    height?: string | number;
    /**
     * 隐藏内部padding
     *
     * @default false
     * @type {boolean}
     * @memberof IHeaderRowProps
     */
    noPadding?: boolean;
}
