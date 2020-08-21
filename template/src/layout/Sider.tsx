import React, { forwardRef, useCallback, useState, useMemo } from 'react';
import { Menu, ThemeProvider, Typography } from '@muya-ui/core';
import { SpeedLeftIcon, SpeedIcon } from '@muya-ui/theme-light';
import { muyaThemeHomeshowMenu } from './theme';
import styled, { css } from 'styled-components';
import { IAppSiderProps } from './types';
import { SiderProvider } from './SiderContext';

interface IStyledSiderProps {
    $width: number;
    $collapsed: boolean;
    $topMargin?: number;
    $static?: boolean;
    $fixed?: boolean;
}

interface IStyledMenuTitleProps {
    $collapsed: boolean;
}

const StyledSider = styled.div<IStyledSiderProps>`
    ${(props) => {
        const {
            $fixed,
            $width,
            $topMargin,
            $collapsed,
            $static,
            theme: {
                components: { Menu: menuToken },
                transition: {
                    pattern: { easing, duration }
                }
            }
        } = props;
        const positionStyle =
            !$static &&
            css`
                position: ${$fixed ? 'fixed' : 'absolute'};
                left: 0;
                top: ${$topMargin || 0}px;
                bottom: 0;
                background: ${menuToken.wrapper.background};
            `;
        return css`
            ${positionStyle}
            display: flex;
            flex-flow: column nowrap;
            width: ${$collapsed ? menuToken.wrapper.inlineCollapsedWidth : $width}px;
            transition: all ${duration.status}ms ${easing.status};
            &
                .muya-pangu-menu-wrapper
                > .muya-pangu-menu-menu
                > div
                > .muya-pangu-menu-group:first-child
                .muya-pangu-menu-group-label {
                margin-top: -${menuToken.group.paddingTop}px;
            }
        `;
    }}
`;

const StyledMenuTitleWrapper = styled.div<IStyledMenuTitleProps>`
    ${(props) => {
        const {
            $collapsed,
            theme: {
                transition: {
                    pattern: { easing, duration }
                }
            }
        } = props;
        const collapsedStyle =
            $collapsed &&
            css`
                display: flex;
                justify-content: center;
                padding: 12px 0;
            `;
        return css`
            padding: 16px 20px;
            margin: 12px 0;
            * {
                transition: all ${duration.status}ms ${easing.status};
            }
            button {
                white-space: nowrap;
                overflow: hidden;
                max-width: 100%;
                text-overflow: ellipsis;
            }
            ${collapsedStyle}
        `;
    }}
`;

const StyledMenuWrapper = styled.div`
    flex: 1;
    overflow: hidden;
`;

const StyledMenuFooterWrapper = styled.div`
    display: flex;
    flex-flow: row-reverse nowrap;
    height: 40px;
`;

const StyledCollopsedIconWrapper = styled.span`
    ${(props) => {
        const { colors, typography } = props.theme;
        const { spec: colorsSpec } = colors;
        return css`
            display: inline-flex;
            align-items: center;
            padding: 0 20px;
            height: 100%;
            font-size: ${typography.spec.fontSize.s2}px;
            cursor: pointer;
            color: ${colorsSpec.neutral1.normal};
            &:hover {
                color: ${colorsSpec.neutral1.hover};
            }
            &:active {
                color: ${colorsSpec.neutral1.click};
            }
        `;
    }}
`;

const defaultGetTopMargin = () => {
    const workbenchHeader = document.getElementById('workbench-header');
    return workbenchHeader ? workbenchHeader.clientHeight : 52;
};

export default React.memo(
    forwardRef<HTMLDivElement, IAppSiderProps>((props, ref) => {
        const {
            onItemSelect,
            children,
            getTopMargin = defaultGetTopMargin,
            width = 200,
            fixed = true,
            menuTitle,
            collapsedMenuTitle,
            collapsed: collapsedProp,
            onCollapse,
            hideCollapseIcon = false,
            ...other
        } = props;
        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
        const [collapsedState, setCollapsedState] = useState(false);
        const isControlled = 'collapsed' in props;
        const collapsed =
            isControlled && collapsedProp !== undefined ? collapsedProp : collapsedState;
        const topMargin = useMemo(() => getTopMargin(), [getTopMargin]);
        const currentTitle = collapsed ? collapsedMenuTitle : menuTitle;
        const currentTitleNode = useMemo(
            () =>
                typeof currentTitle === 'string' ? (
                    <Typography.Title level={5} ellipsis>
                        {currentTitle}
                    </Typography.Title>
                ) : (
                    currentTitle
                ),
            [currentTitle]
        );
        const collapseIcon = useMemo(() => (collapsed ? <SpeedIcon /> : <SpeedLeftIcon />), [
            collapsed
        ]);

        const handleCollapse = useCallback(() => {
            const newCollapsed = !collapsed;
            setCollapsedState(newCollapsed);

            onCollapse && onCollapse(newCollapsed);
        }, [onCollapse, collapsed]);

        const setSelectedKey = useCallback((key: string) => {
            setSelectedKeys((keys) => {
                const currentKey = keys[0];
                if (currentKey !== key) return [key];
                return keys;
            });
        }, []);

        const siderContextValue = useMemo(
            () => ({
                setSelectedKey
            }),
            [setSelectedKey]
        );

        return (
            <ThemeProvider theme={muyaThemeHomeshowMenu}>
                <SiderProvider value={siderContextValue}>
                    <StyledSider $width={width} $collapsed={collapsed} $static>
                        <StyledSider
                            $width={width}
                            $topMargin={topMargin}
                            $fixed={fixed}
                            $collapsed={collapsed}
                        >
                            {currentTitleNode ? (
                                <StyledMenuTitleWrapper $collapsed={collapsed}>
                                    {currentTitleNode}
                                </StyledMenuTitleWrapper>
                            ) : null}
                            <StyledMenuWrapper>
                                <Menu
                                    {...other}
                                    ref={ref}
                                    selectedKeys={selectedKeys}
                                    mode="inline"
                                    triggerSubMenuAction="click"
                                    inlineCollapsed={collapsed}
                                    width={width}
                                >
                                    {children}
                                </Menu>
                            </StyledMenuWrapper>
                            {hideCollapseIcon ? null : (
                                <StyledMenuFooterWrapper>
                                    <StyledCollopsedIconWrapper onClick={handleCollapse}>
                                        {collapseIcon}
                                    </StyledCollopsedIconWrapper>
                                </StyledMenuFooterWrapper>
                            )}
                        </StyledSider>
                    </StyledSider>
                </SiderProvider>
            </ThemeProvider>
        );
    })
);
