import React, { memo, useCallback, useMemo } from 'react';
import { Table, ITableColumn, Img, InlineButton } from '@muya-ui/core';
import { IStandardTableProps, ITableData, ActionType } from './types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledImg = styled(Img)`
    width: 80px;
    height: 60px;
    &:not(:last-child) {
        margin-right: 8px;
    }
`;

const StyledInlineButton = styled(InlineButton)`
    margin-right: 24px;
`;

export default memo((props: IStandardTableProps<ITableData>) => {
    const { onActionClick, ...otherProps } = props;
    const handleActionClick = useCallback(
        (data: ITableData, type: ActionType) => {
            onActionClick && onActionClick(data, type);
        },
        [onActionClick],
    );
    // 根据数据自定义表格渲染
    const columns: ITableColumn<ITableData>[] = useMemo(
        () => [
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
                width: '10%',
            },
            {
                title: '图片',
                key: 'images',
                width: '30%',
                render: data => (
                    <StyledWrapper>
                        {data.images.map(image => (
                            <StyledImg key={image} src={image} />
                        ))}
                    </StyledWrapper>
                ),
            },
            {
                title: '门店',
                key: 'shop',
                width: '20%',
                dataIndex: 'shop',
            },
            {
                title: '上传时间',
                key: 'key',
                width: '20%',
                dataIndex: 'uploadDate',
            },
            {
                title: '操作',
                key: 'action',
                width: '10%',
                render: data => (
                    <StyledWrapper>
                        <StyledInlineButton
                            size="s"
                            type="primary"
                            onClick={() => handleActionClick(data, ActionType.first)}
                        >
                            操作 1
                        </StyledInlineButton>
                        <InlineButton
                            size="s"
                            type="primary"
                            onClick={() => handleActionClick(data, ActionType.second)}
                        >
                            操作 2
                        </InlineButton>
                    </StyledWrapper>
                ),
            },
        ],
        [handleActionClick],
    );
    return <Table<ITableData> columns={columns} {...otherProps} />;
});
