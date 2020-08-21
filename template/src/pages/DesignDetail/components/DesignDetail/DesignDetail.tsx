import React, { useMemo, forwardRef } from 'react';

import {
    Button,
    Menu,
    MenuItem,
    Col,
    Row,
    Typography,
    Space,
    Tag,
    useTheme,
    InlineButton,
    Dropdown,
} from '@muya-ui/core';

import {
    StyledDetailWrapper,
    StyledHorizontalDivider,
    StyledMaskButton,
    StyledContentWrapper,
    ExpandIcon,
    StyledImg,
    StyledDivider,
} from './styled';
import { IDesignDetailProps } from './types';

export default React.memo(
    forwardRef<HTMLDivElement, IDesignDetailProps>((props, ref) => {
        const { title, imgSrc, designTags, titleTag, ...other } = props;
        const theme = useTheme();
        const menu = useMemo(
            () => (
                <Menu>
                    <MenuItem key="collect-1">item1</MenuItem>
                    <MenuItem key="collect-2">item2</MenuItem>
                    <MenuItem key="collect-3">item3</MenuItem>
                </Menu>
            ),
            [],
        );

        return (
            <StyledDetailWrapper theme={theme} {...other}>
                <StyledImg src={imgSrc}>
                    <StyledMaskButton size="s">设置封面</StyledMaskButton>
                </StyledImg>
                <StyledContentWrapper>
                    <Space block direction="vertical" spacing={20}>
                        <Space>
                            <Typography.Title level={3}>{title}</Typography.Title>
                            {titleTag && <Tag size="l">{titleTag}</Tag>}
                        </Space>
                        <Typography.Text color="assistant">
                            <Space spacing={28}>
                                3天前更新
                                <Space spacing={4}>
                                    地区: 杭州 拱墅区
                                    <StyledHorizontalDivider />
                                    面积：建筑224.8㎡，套内177.8㎡
                                    <StyledHorizontalDivider />
                                    楼层：1层
                                </Space>
                            </Space>
                        </Typography.Text>
                    </Space>
                    <Space block direction="vertical" spacing={20}>
                        {designTags ? (
                            <span>
                                {designTags.map(d => (
                                    <Tag size="l" key={d}>
                                        {d}
                                    </Tag>
                                ))}
                            </span>
                        ) : null}
                        <StyledDivider />
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Button size="s" type="primary">
                                    装修设计
                                </Button>
                                <Dropdown overlay={menu}>
                                    <Button size="s" suffixNode={<ExpandIcon />}>
                                        全景图
                                    </Button>
                                </Dropdown>
                                <Dropdown overlay={menu}>
                                    <Button size="s" suffixNode={<ExpandIcon />}>
                                        管理方案
                                    </Button>
                                </Dropdown>
                                <Dropdown overlay={menu}>
                                    <Button size="s" suffixNode={<ExpandIcon />}>
                                        导出
                                    </Button>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Space spacing={12}>
                                    <Dropdown overlay={menu}>
                                        <InlineButton
                                            size="s"
                                            type="primary"
                                            suffixNode={<ExpandIcon />}
                                        >
                                            公开可复制
                                        </InlineButton>
                                    </Dropdown>
                                    <InlineButton size="s" type="primary">
                                        编辑
                                    </InlineButton>
                                    <InlineButton size="s" type="primary">
                                        复制
                                    </InlineButton>
                                    <InlineButton size="s" type="primary">
                                        分享
                                    </InlineButton>
                                    <InlineButton size="s" type="primary">
                                        删除
                                    </InlineButton>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                </StyledContentWrapper>
            </StyledDetailWrapper>
        );
    }),
);
