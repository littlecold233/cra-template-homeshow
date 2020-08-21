import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    Typography,
    Pagination,
    Button,
    Menu,
    MenuItem,
    Dropdown,
    toast,
    IMenuSelectInfo,
    Space,
    Tab,
    Tabs,
    InlineButton,
    ButtonGroup,
    Col,
    Link,
} from '@muya-ui/core';
import styled, { css } from 'styled-components';
import { FoldIcon } from '@muya-ui/theme-light';
import { wait } from '@muya-ui/utils';

import { ITableData, StandardTable, ActionType } from './components/StandardTable';
import { AdvancedSearch } from './components/AdvancedSearch';
import { HeaderRow } from './components/HeaderRow';

const ExpandIcon = styled(FoldIcon)`
    width: 8px;
    height: 8px;
    margin-left: 4px;
`;

const StyledContentWrapper = styled.div`
    display: flex;
    padding: 12px 40px 20px;
`;

const StyledTabsWrapper = styled(Tabs)`
    padding: 0 20px;
`;

const StyledPaginationWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
`;

const StyledInlineButton = styled(InlineButton)`
    margin-left: 8px;
    padding: 0 11px;
`;

const StyledStickyWrapper = styled.div`
    ${props => {
        return css`
            position: sticky;
            top: 0;
            background-color: ${props.theme.colors.spec.light};
            z-index: 1001;
        `;
    }}
`;

const pageSize = 9;

async function getList() {
    await wait.time(1500);
    // 数据一般从后端获取，这里先mock掉
    const res: ITableData[] = [];
    for (let i = 1; i < 10; i++) {
        res.push({
            key: i,
            address: '韩国',
            shop: '德宏傣族景颇族自治州',
            uploadDate: '2020/3/16',
            images: [
                '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607282412/230EF23B9F1A003B7370252A8C22ECB8.png',
                '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607283033/7ECCCE91799B50B007A4EF93E83E9C58.png',
                '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607283460/0BC622FAACB03E681E38062FEAE5318D.png',
            ],
        });
    }
    return {
        res,
        total: pageSize * 10,
    };
}

export default function Team() {
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ITableData[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const menu = useMemo(
        () => (
            <Menu>
                <MenuItem key="collect-1">收藏夹1</MenuItem>
                <MenuItem key="collect-2">收藏夹2</MenuItem>
                <MenuItem key="collect-3">收藏夹3</MenuItem>
            </Menu>
        ),
        [],
    );

    const fetchData = useCallback(() => {
        setLoading(true);
        getList()
            .then(d => {
                setData(d.res);
                setTotal(d.total);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                toast.error('获取数据失败');
            });
    }, []);

    const handleButtonTabChange = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const handlePageChange = useCallback(
        (page: number) => {
            fetchData();
            setPage(page);
            setSelectedKeys([]);
        },
        [fetchData],
    );

    const handleAddItem = useCallback(
        (info: IMenuSelectInfo) => {
            if (!selectedKeys.length) {
                toast.warning('请先选择需要添加的项目');
                return;
            }
            toast.success(`将数据${selectedKeys.join(',')}成功添加到${info.key}`);
        },
        [selectedKeys],
    );

    const handleTableSelectionChange = useCallback((selectedRowKeys: React.Key[]) => {
        setSelectedKeys(selectedRowKeys);
    }, []);

    const handleActionClick = useCallback((data: ITableData, type: ActionType) => {
        console.log(data, type, 'handleActionClick');
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <StyledStickyWrapper>
                <HeaderRow bordered={false}>
                    <Typography.Title level={4}>模型授权</Typography.Title>
                    <Space spacing={24}>
                        <Link href="./" type="primary" size="s">
                            授权管理
                        </Link>
                        <Link href="./" type="primary" size="s">
                            模型公馆
                        </Link>
                    </Space>
                </HeaderRow>
                <StyledTabsWrapper>
                    <Tab>硬装</Tab>
                    <Tab>软装</Tab>
                </StyledTabsWrapper>
            </StyledStickyWrapper>
            <StyledContentWrapper>
                <Space direction="vertical">
                    <Space direction="vertical" spacing={12}>
                        <HeaderRow bordered={false} noPadding>
                            <Col>
                                <ButtonGroup plain={true} size="s">
                                    {['模型', '模型包'].map((item, i) => (
                                        <Button
                                            key={item}
                                            fontWeight="lighter"
                                            selected={activeIndex === i}
                                            onClick={() => handleButtonTabChange(i)}
                                        >
                                            {item}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Col>
                        </HeaderRow>
                        <Space direction="vertical" spacing={20}>
                            <AdvancedSearch
                                onSubmit={values => {
                                    const jsonString = JSON.stringify(values, null, 2);
                                    console.log(
                                        '高级搜索提交的数据，此数据可以传给后端',
                                        jsonString,
                                    );
                                    alert(`高级搜索提交的数据，此数据可以传给后端\n${jsonString}`);
                                    fetchData();
                                }}
                            />
                            <HeaderRow bordered={false} noPadding>
                                <Col>
                                    <Dropdown overlay={menu} onOverlayClick={handleAddItem}>
                                        <Button type="normal" plain size="s">
                                            添加
                                        </Button>
                                    </Dropdown>
                                    <Button type="normal" plain size="s">
                                        上架
                                    </Button>
                                    <Button type="normal" plain size="s">
                                        下架
                                    </Button>
                                    <Dropdown overlay={menu}>
                                        <StyledInlineButton type="normal" size="s">
                                            筛选类型
                                            <ExpandIcon />
                                        </StyledInlineButton>
                                    </Dropdown>
                                </Col>
                            </HeaderRow>
                        </Space>
                        <StandardTable
                            dataSource={data}
                            onActionClick={handleActionClick}
                            loading={loading}
                            rowSelection={{
                                selectedRowKeys: selectedKeys,
                                onChange: handleTableSelectionChange,
                            }}
                            stripe
                        />
                    </Space>
                    <StyledPaginationWrapper>
                        <Pagination
                            totalRecords={total}
                            pageSize={pageSize}
                            current={page}
                            onChange={handlePageChange}
                            size="s"
                        />
                    </StyledPaginationWrapper>
                </Space>
            </StyledContentWrapper>
        </>
    );
}
