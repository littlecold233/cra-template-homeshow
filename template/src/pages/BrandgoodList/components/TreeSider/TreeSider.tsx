import React, { forwardRef, useMemo, useCallback, useState } from 'react';

import {
    ITreeSelectInfo,
    ITreeNodeData,
    Input,
    useTheme,
    Tree,
    ITreeNodeKey,
} from '@muya-ui/core';
import { SearchIcon, DustbinIcon } from '@muya-ui/theme-light';

import { ITreeSiderProps } from './types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div<{ $bordered: boolean }>`
    ${props => {
        const { $bordered, theme } = props;
        const borderStyle =
            $bordered &&
            css`
                border-right: 1px solid ${theme.colors.pattern.border.normal};
            `;
        return css`
            display: flex;
            flex-flow: column nowrap;
            padding: 12px 0;
            background: ${theme.colors.pattern.background.block};
            box-sizing: border-box;
            ${borderStyle}
        `;
    }}
`;

const StyledPrefixWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
`;

const StyledDustbinTree = styled(Tree)`
    padding: 12px 0 0 12px;
    ${props => {
        const { theme } = props;
        return css`
            border-top: 1px solid ${theme.colors.pattern.border.normal};
        `;
    }}
`;

const StyledTree = styled(Tree)`
    width: 100%;
    margin-bottom: 12px;
    padding-left: 12px;
`;

export default React.memo(
    forwardRef<HTMLDivElement, ITreeSiderProps>((props, ref) => {
        const {
            bordered = true,
            className,
            style,
            onSearch,
            onDustbinSelect,
            onSelect,
            selectedKeys,
            ...other
        } = props;
        const theme = useTheme();
        const [search, setSearch] = useState('');
        const [treeSelectKeys, setTreeSelectKeys] = useState<ITreeNodeKey[]>([]);
        const [dustbinSelectKeys, setDustbinSelectKeys] = useState<ITreeNodeKey[]>([]);
        const isControlled = 'selectedKeys' in props;
        const finalSelectedKeys = isControlled && selectedKeys ? selectedKeys : treeSelectKeys;
        const dustbinTreeData: ITreeNodeData[] = useMemo(
            () => [
                {
                    title: '回收站',
                    icon: <DustbinIcon />,
                    key: 'dustbin',
                },
            ],
            [],
        );

        const handleSearch = useCallback(() => {
            onSearch && onSearch(search);
        }, [onSearch, search]);

        const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        }, []);

        const handleDustbinSelect = useCallback(
            (selectedKeys: ITreeNodeKey[], info: ITreeSelectInfo<ITreeNodeData>) => {
                // 回收站选中，清空主Tree的选中状态
                setTreeSelectKeys([]);
                onSelect && onSelect([], info);

                // 更新回收站Tree的状态
                setDustbinSelectKeys(selectedKeys);
                onDustbinSelect && onDustbinSelect(info.selected);
            },
            [onSelect, onDustbinSelect],
        );

        const handleTreeSelect = useCallback(
            (selectedKeys: ITreeNodeKey[], info: ITreeSelectInfo<ITreeNodeData>) => {
                // 主Tree选中，清除回收站的选中状态
                setDustbinSelectKeys([]);

                // 更新主Tree的状态
                setTreeSelectKeys(selectedKeys);
                onSelect && onSelect(selectedKeys, info);
            },
            [onSelect],
        );

        const searchIcon = useMemo(() => <SearchIcon onClick={handleSearch} />, [handleSearch]);

        return (
            <StyledWrapper
                $bordered={bordered}
                theme={theme}
                ref={ref}
                className={className}
                style={style}
            >
                <StyledPrefixWrapper theme={theme}>
                    <Input
                        value={search}
                        onChange={handleInputChange}
                        onPressEnter={handleSearch}
                        size="s"
                        width="100%"
                        placeholder="搜索"
                        suffixNode={searchIcon}
                    />
                </StyledPrefixWrapper>
                <StyledTree
                    renderAfterExpand
                    selectedKeys={finalSelectedKeys}
                    onSelect={handleTreeSelect}
                    {...other}
                />
                <StyledDustbinTree
                    data={dustbinTreeData}
                    onSelect={handleDustbinSelect}
                    selectedKeys={dustbinSelectKeys}
                />
            </StyledWrapper>
        );
    }),
);
