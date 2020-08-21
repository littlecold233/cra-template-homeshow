import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Button,
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
    InlineButton,
    Dropdown,
} from '@muya-ui/core';
import {
    AddIcon,
    EditIcon,
    DustbinIcon,
    RiseIcon,
    SearchIcon,
    FoldIcon,
    ReminderIcon,
} from '@muya-ui/theme-light';
import styled, { css } from 'styled-components';
import { wait } from '@muya-ui/utils';
import { HeaderRow } from './components/HeaderRow';
import { FolderList, IDataProps } from './components/FolderList';

const pageSize = 48;

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

const StyledHeaderRow = styled(HeaderRow)`
    ${props => {
        return css`
            position: sticky;
            top: 0;
            background-color: ${props.theme.colors.spec.light};
            z-index: 1001;
        `;
    }}
`;

const StyledContentWrapper = styled.div`
    padding: 12px 40px 20px;
`;

export default function Home() {
    const [data, setData] = useState<IDataProps[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [checkedData, setCheckedData] = useState<IDataProps[]>([]);
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
            <StyledHeaderRow>
                <Col>
                    <Space spacing="s7">
                        <Button shape="square" size="s">
                            <RiseIcon style={{ transform: 'rotate(-90deg)' }} />
                        </Button>
                        <Typography.Title level={4}>款式详情</Typography.Title>
                        <Space>
                            <Typography.Text type="warning">
                                <ReminderIcon />
                            </Typography.Text>
                            <Typography.Text color="assistant">
                                请谨慎选择，以下内容将同步到应用使用配置中
                            </Typography.Text>
                        </Space>
                    </Space>
                </Col>
            </StyledHeaderRow>
            <StyledContentWrapper>
                <Space block spacing="s7" direction="vertical">
                    <HeaderRow bordered={false} noPadding>
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
                            <Input size="s" placeholder="搜索" suffixNode={<SearchIcon />} />
                        </Col>
                    </HeaderRow>
                    <FolderList
                        loading={loading}
                        data={data}
                        checkedData={checkedData}
                        onChange={handleFolderListChange}
                        defaultDataCount={pageSize}
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
        </div>
    );
}
