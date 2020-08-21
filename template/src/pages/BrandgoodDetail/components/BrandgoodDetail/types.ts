import React from 'react';
export interface IBrandgoodDetailProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 图片链接
     *
     * @type {string}
     * @memberof IBrandgoodDetailProps
     */
    imgSrc?: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof IBrandgoodDetailProps
     */
    title?: string;
    /**
     * 商品标签
     *
     * @type {string[]}
     * @memberof IBrandgoodDetailProps
     */
    tags?: string[];
}
