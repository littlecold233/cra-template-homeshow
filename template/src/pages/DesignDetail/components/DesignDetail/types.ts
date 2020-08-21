import React from 'react';
export interface IDesignDetailProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 图片链接
     *
     * @type {string}
     * @memberof IDesignDetailProps
     */
    imgSrc?: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof IDesignDetailProps
     */
    title?: string;
    /**
     * 标题右侧标签
     *
     * @type {string}
     * @memberof IDesignDetailProps
     */
    titleTag?: string;
    /**
     * 方案标签数据
     *
     * @type {string[]}
     * @memberof IDesignDetailProps
     */
    designTags?: string[];
    /**
     * 更新时间
     *
     * @type {string}
     * @memberof IDesignDetailProps
     */
    updatedAt?: string;
}
