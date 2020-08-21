import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Checkbox,
    Menu,
    MenuItem,
    DropdownButton,
    IMenuSelectInfo,
    toast,
    Col,
    Space,
    Pagination,
    Row,
    Tabs,
    Tab,
    Dropdown,
    InlineButton,
    Button,
    Breadcrumbs,
    useTheme,
} from '@muya-ui/core';
import { FoldIcon } from '@muya-ui/theme-light';
import styled, { css } from 'styled-components';
import { wait } from '@muya-ui/utils';
import { HeaderRow } from './components/HeaderRow';
import { DesignDetail } from './components/DesignDetail';
import { FolderList, IDataProps } from './components/FolderList';

const pageSize = 42;

async function getList() {
    await wait.time(1500);
    // 数据一般从后端获取，这里先mock掉
    const res: IDataProps[] = [];
    const imgs = [
        '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607287726/75870C63B6FF3D1AA7785159CA8FC942.png',
        '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607283033/7ECCCE91799B50B007A4EF93E83E9C58.png',
        '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607283460/0BC622FAACB03E681E38062FEAE5318D.png',
        '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607282412/230EF23B9F1A003B7370252A8C22ECB8.png',
        '//qhstaticssl.kujiale.com/newt/100759/image/png/1587607282417/A417339A9336406C1AAFDFDB9B706D8D.png',
    ];
    for (let i = 0; i < pageSize; i++) {
        const obj: IDataProps = {
            imgSrc: imgs[Math.floor(Math.random() * 5)],
            key: i,
        };
        res.push(obj);
    }
    return {
        res,
        total: pageSize * 10,
    };
}

const ExpandIcon = styled(FoldIcon)`
    width: 8px;
    height: 8px;
    opacity: 0.5;
`;

const StyledHeaderWrapper = styled.div`
    ${() => {
        return css`
            margin-bottom: 8px;
        `;
    }}
`;

const StyledWrapper = styled.div`
    min-width: 960px;
`;

const StyledMenu = styled(Menu)`
    ${props => {
        return css`
            height: 100%;
            border-radius: 0;
            border-right: 1px solid ${props.theme.colors.pattern.border.normal};
            box-shadow: unset;
        `;
    }}
`;

const StyledContentWrapper = styled.div`
    padding: 12px 40px 20px 40px;
    background: ${props => props.theme.colors.pattern.background.block};
`;

const StyledTabs = styled(Tabs)`
    background: ${props => props.theme.colors.pattern.background.block};
    padding: 20px 20px 0 20px;
`;

export default function Home() {
    const [data, setData] = useState<IDataProps[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [checkedData, setCheckedData] = useState<IDataProps[]>([]);
    const [activePlaceKeys, setActivePlaceKeys] = useState(['2']);
    const theme = useTheme();
    const checked = !!checkedData.length;
    const indeterminate = checked && checkedData.length < data.length;

    const roomPlaceList = useMemo(
        () => [
            {
                id: '0',
                label: '全部',
                count: 21,
            },
            {
                id: '1',
                label: '玄关',
                count: 4,
            },
            {
                id: '2',
                label: '客厅',
                count: 1,
            },
            {
                id: '3',
                label: '餐厅',
                count: 4,
            },
            {
                id: '4',
                label: '主卧',
                count: 5,
            },
            {
                id: '5',
                label: '次卧',
                count: 3,
            },
            {
                id: '6',
                label: '书房',
                count: 9,
            },
        ],
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

    const handleFolderListChange = useCallback((checkedData: IDataProps[]) => {
        console.log(checkedData, 'handleFolderListChange');
        setCheckedData(checkedData);
    }, []);

    const handleSelectAll = useCallback(() => {
        if (!checked || indeterminate) {
            setCheckedData(data);
        } else {
            setCheckedData([]);
        }
    }, [checked, data, indeterminate]);

    const handlePageChange = useCallback(
        p => {
            setPage(p);
            fetchData();
            setCheckedData([]);
        },
        [fetchData],
    );

    const commonOverlay = useMemo(
        () => (
            <Menu>
                <MenuItem key="1">item 1</MenuItem>
                <MenuItem key="2">item 2</MenuItem>
                <MenuItem key="3">item 3</MenuItem>
            </Menu>
        ),
        [],
    );

    const handlePlaceChange = useCallback((selectInfo: IMenuSelectInfo) => {
        if (selectInfo.newSelectedKeys) {
            setActivePlaceKeys(selectInfo.newSelectedKeys);
        }
    }, []);

    const menuStyles = useMemo(
        () => ({
            item: { paddingLeft: 20 },
            itemContent: { height: 36 },
            menu: { paddingTop: 18 },
        }),
        [],
    );

    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line

    return (
        <StyledWrapper>
            <StyledHeaderWrapper>
                <HeaderRow>
                    <Breadcrumbs>
                        <InlineButton size="l" href="../../" type="secondary">
                            我的方案
                        </InlineButton>
                        <InlineButton size="l" href="../../" type="strong" constant>
                            方案详情
                        </InlineButton>
                    </Breadcrumbs>
                </HeaderRow>
                <DesignDetail
                    imgSrc="//qhrenderpicoss.kujiale.com/dev/2019/05/17/L3D186S8ENDIHBLJUIUFFBXSLUF3P3X4888_1920x1080.jpg"
                    title="拱苑小区2期 三室一厅二卫 王耶波先生"
                    titleTag="标签"
                    designTags={['BIM方案', '装修阶段', '现代', '简约', '北欧', '日式']}
                />
            </StyledHeaderWrapper>
            <StyledTabs theme={theme}>
                <Tab>装修效果图</Tab>
                <Tab>户型图</Tab>
                <Tab>精选图</Tab>
            </StyledTabs>
            <Row>
                <Col span={4} style={{ alignSelf: 'stretch' }}>
                    <StyledMenu
                        noSpacing
                        selectedKeys={activePlaceKeys}
                        styles={menuStyles}
                        onSelectChange={handlePlaceChange}
                        height="100%"
                    >
                        {roomPlaceList.map(p => (
                            <MenuItem key={p.id}>
                                <Row justify="space-between">
                                    <Col>{p.label}</Col>
                                    <Col>{p.count}</Col>
                                </Row>
                            </MenuItem>
                        ))}
                    </StyledMenu>
                </Col>
                <Col span={20}>
                    <StyledContentWrapper theme={theme}>
                        <Space block spacing="s7" direction="vertical">
                            <div>
                                <HeaderRow noPadding bordered={false} height={40}>
                                    <Col>
                                        <Space>
                                            <Button
                                                size="s"
                                                prefixNode={
                                                    <Checkbox
                                                        onClick={handleSelectAll}
                                                        indeterminate={indeterminate}
                                                        checked={checked}
                                                    />
                                                }
                                                onClick={handleSelectAll}
                                            >
                                                全选{checkedData.length}/{data.length}
                                            </Button>
                                            <Space spacing={20}>
                                                <DropdownButton
                                                    size="s"
                                                    overlay={commonOverlay}
                                                    type="normal"
                                                    plain
                                                >
                                                    导出
                                                </DropdownButton>
                                                <Dropdown overlay={commonOverlay}>
                                                    <InlineButton
                                                        type="normal"
                                                        size="s"
                                                        suffixNode={<ExpandIcon />}
                                                    >
                                                        全部类型
                                                    </InlineButton>
                                                </Dropdown>
                                                <Dropdown overlay={commonOverlay}>
                                                    <InlineButton
                                                        type="normal"
                                                        size="s"
                                                        suffixNode={<ExpandIcon />}
                                                    >
                                                        全部分辨率
                                                    </InlineButton>
                                                </Dropdown>
                                            </Space>
                                        </Space>
                                    </Col>
                                </HeaderRow>
                            </div>
                            <FolderList
                                equalNum={{
                                    md: 6,
                                    lg: 7,
                                }}
                                defaultDataCount={pageSize}
                                loading={loading}
                                data={data}
                                checkedData={checkedData}
                                onChange={handleFolderListChange}
                            />
                            <Row justify="end">
                                <Col>
                                    <Pagination
                                        totalRecords={total}
                                        pageSize={pageSize}
                                        current={page}
                                        onChange={handlePageChange}
                                        size="s"
                                    />
                                </Col>
                            </Row>
                        </Space>
                    </StyledContentWrapper>
                </Col>
            </Row>
        </StyledWrapper>
    );
}
