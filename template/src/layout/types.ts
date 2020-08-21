import { IMenuProps, IMenuItemProps } from '@muya-ui/core';
import { HTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

export interface IAppSiderProps extends IMenuProps {
    /**
     * 获取Sider的上边距，默认取header的高度，取不到默认为0
     *
     * @memberof IAppSiderProps
     */
    getTopMargin?: () => number;
    /**
     * 是否固定Sider在页面左侧
     *
     * @type {boolean}
     * @default true
     * @memberof IAppSiderProps
     */
    fixed?: boolean;
    /**
     * 菜单标题内容
     *
     * @type {React.ReactNode}
     * @memberof IAppSiderProps
     */
    menuTitle: React.ReactNode;
    /**
     * 菜单收起时的标题内容
     *
     * @type {React.ReactNode}
     * @memberof IAppSiderProps
     */
    collapsedMenuTitle: React.ReactNode;
    /**
     * 侧边栏折叠状态
     *
     * @type {boolean}
     * @memberof IAppSiderProps
     */
    collapsed?: boolean;
    /**
     * 折叠状态变化时触发该事件
     *
     * @memberof IAppSiderProps
     */
    onCollapse?: (collapsed: boolean) => void;
    /**
     * 隐藏展开收起按钮
     *
     * @default false
     * @type {boolean}
     * @memberof IAppSiderProps
     */
    hideCollapseIcon?: boolean;
}

export interface ILinkProps extends IMenuItemProps, Pick<LinkProps, 'to' | 'replace'> {
    /**
     * match pathname exactly.
     *
     * @default true
     * @type {boolean}
     * @memberof ILinkProps
     */
    exact?: boolean;
    /**
     * 严格匹配模式，例如/test 与 /test/ 不匹配
     *
     * @default false
     * @type {boolean}
     * @memberof ILinkProps
     */
    strict?: boolean;
    /**
     * 大小写敏感
     *
     * @default false
     * @type {boolean}
     * @memberof ILinkProps
     */
    sensitive?: boolean;
    /**
     * 通过matchers可以路由匹配选中的规则，matchers中任意一条规则与当前页面路由匹配成功，链接即为选中状态
     *
     * @type {(Array<string | ILinkMatcher>)}
     * @memberof ILinkProps
     */
    matchers?: Array<string | ILinkMatcher>;
}

export interface ILinkMatcher extends Pick<ILinkProps, 'exact' | 'strict' | 'sensitive'> {
    /**
     * 需要匹配的路由
     *
     * @type {(string | string[])}
     * @memberof ILinkMatcher
     */
    path: string | string[];
}

export interface IAppContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * 是否禁用盘古默认的背景色
     *
     * @default true
     * @type {boolean}
     * @memberof IAppContentProps
     */
    disableBgColor?: boolean;
}

export interface IBlockProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * block宽度
     *
     * @type {(string | number)}
     * @memberof IBlockProps
     */
    width?: string | number;
    /**
     * block高度
     *
     * @type {(string | number)}
     * @memberof IBlockProps
     */
    height?: string | number;
}

export type IAppLayoutProps = HTMLAttributes<HTMLDivElement>;

export interface ISiderContextValue {
    setSelectedKey: (key: string) => void;
}
