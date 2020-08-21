import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Checkbox,
    Menu,
    MenuItem,
    DropdownButton,
    IMenuSelectInfo,
    toast,
    Col,
    Input,
    Space,
    Typography,
    Pagination,
    Row,
    Tabs,
    Tab,
    InputGroup,
    Select,
    Option,
    InlineButton,
    ITreeSelectInfo,
    Dropdown,
    ButtonGroup,
    Button,
    Breadcrumbs,
    Link,
} from '@muya-ui/core';
import { AddIcon, EditIcon, DustbinIcon, SearchIcon, FoldIcon } from '@muya-ui/theme-light';
import styled, { css } from 'styled-components';
import { wait } from '@muya-ui/utils';

import { TreeSider } from './components/TreeSider';
import { HeaderRow } from './components/HeaderRow';
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

const treeData = [
    {
        title: '系统默认',
        key: '0-0',
        children: [
            {
                title: '朝鲜',
                key: '0-0-0',
                children: [
                    {
                        title: '朝鲜0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '朝鲜1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '朝鲜2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '上海',
                key: '0-0-1',
                children: [
                    {
                        title: '上海0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '上海1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '上海2',
                        key: '0-0-1-2',
                    },
                ],
            },
        ],
    },
];

const ExpandIcon = styled(FoldIcon)`
    width: 8px;
    height: 8px;
    opacity: 0.5;
`;

const StickyHeader = styled.div`
    ${props => {
        return css`
            position: sticky;
            top: 0;
            left: 0;
            z-index: 100;
            box-sizing: border-box;
            background-color: ${props.theme.colors.spec.light};
        `;
    }}
`;

const StickyTreeSider = styled(TreeSider)`
    ${props => {
        return css`
            height: 100%;
            box-sizing: border-box;
            background-color: ${props.theme.colors.spec.light};
            width: 100%;
        `;
    }}
`;

const StyledContentWrapper = styled.div`
    padding: 12px 40px 20px 40px;
`;

const StyledTabs = styled(Tabs)`
    padding: 0 20px;
`;

export default function Home() {
    const [data, setData] = useState<IDataProps[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [checkedData, setCheckedData] = useState<IDataProps[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const checked = !!checkedData.length;
    const indeterminate = checked && checkedData.length < data.length;

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

    const handleButtonTabChange = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const handleAddItem = useCallback(
        (info: IMenuSelectInfo) => {
            if (!checkedData.length) {
                toast.warning('请先选择需要添加的项目');
                return;
            }
            toast.success(`将数据${checkedData.map(d => d.key).join(',')}成功添加到${info.key}`);
        },
        [checkedData],
    );

    const handleSelect = useCallback((selectedKeys: React.ReactText[], info: ITreeSelectInfo) => {
        console.log(selectedKeys, info);
    }, []);

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

    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line

    return (
        <div>
            <StickyHeader>
                <HeaderRow bordered={false}>
                    <Col>
                        <Typography.Title level={4}>商品管理</Typography.Title>
                    </Col>
                    <Col>
                        <InputGroup size="s">
                            <Select width={90} defaultValue="1">
                                <Option value="1">分类一</Option>
                                <Option value="2">分类二</Option>
                                <Option value="3">分类三</Option>
                            </Select>
                            <Input placeholder="搜索" suffixNode={<SearchIcon />} />
                        </InputGroup>
                    </Col>
                </HeaderRow>
                <StyledTabs>
                    <Tab>硬装</Tab>
                    <Tab>全屋定制</Tab>
                    <Tab>厨卫定制</Tab>
                    <Tab>门窗定制</Tab>
                </StyledTabs>
            </StickyHeader>
            <Row>
                <Col span={4} style={{ alignSelf: 'stretch' }}>
                    <StickyTreeSider
                        data={treeData}
                        renderAfterExpand
                        defaultExpandedKeys={['0-0-1']}
                        onSelect={handleSelect}
                    />
                </Col>
                <Col span={20}>
                    <StyledContentWrapper>
                        <Space block spacing="s7" direction="vertical">
                            <div>
                                <HeaderRow noPadding bordered={false}>
                                    <Col>
                                        <Breadcrumbs>
                                            <InlineButton>顶层</InlineButton>
                                            <InlineButton type="strong" constant>
                                                当前层
                                                <Typography.Text color="assistant">
                                                    ({data.length})
                                                </Typography.Text>
                                            </InlineButton>
                                        </Breadcrumbs>
                                    </Col>
                                    <Col>
                                        <Space spacing={24}>
                                            <Link href="./">高级设置</Link>
                                            <Link href="./">柜体模型设置</Link>
                                        </Space>
                                    </Col>
                                </HeaderRow>
                                <HeaderRow noPadding bordered={false}>
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
                                            <Button size="s" shape="square">
                                                <AddIcon />
                                            </Button>
                                            <Button size="s" shape="square">
                                                <EditIcon />
                                            </Button>
                                            <Button size="s" shape="square">
                                                <DustbinIcon />
                                            </Button>
                                            <DropdownButton
                                                size="s"
                                                overlay={menu}
                                                onOverlayClick={handleAddItem}
                                                type="normal"
                                                plain
                                            >
                                                添加至
                                            </DropdownButton>
                                            <DropdownButton
                                                size="s"
                                                overlay={commonOverlay}
                                                type="normal"
                                                plain
                                            >
                                                管理
                                            </DropdownButton>
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
                                                        按上传顺序
                                                    </InlineButton>
                                                </Dropdown>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col>
                                        <ButtonGroup plain={true} size="s">
                                            {['素材', '款式'].map((item, i) => (
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
        </div>
    );
}
