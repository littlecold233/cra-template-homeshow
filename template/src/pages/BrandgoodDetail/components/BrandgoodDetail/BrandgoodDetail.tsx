import React, { useMemo, forwardRef } from 'react';

import {
    Button,
    Menu,
    MenuItem,
    Col,
    Row,
    Typography,
    useTheme,
    InlineButton,
    Dropdown,
    CheckboxGroup,
    Tag,
    Link,
    Tooltip,
    Space,
} from '@muya-ui/core';

import { EditIcon, DustbinIcon } from '@muya-ui/theme-light';

import {
    StyledDetailWrapper,
    StyledImgWrapper,
    StyledContentWrapper,
    ExpandIcon,
    StyledImg,
    StyledDivider,
    StyledHelpIcon,
} from './styled';

import BrandInfoRow from './BrandInfoRow';
import { IBrandgoodDetailProps } from './types';

export default React.memo(
    forwardRef<HTMLDivElement, IBrandgoodDetailProps>((props, ref) => {
        const { title, imgSrc, tags = [], ...other } = props;
        const theme = useTheme();
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

        return (
            <StyledDetailWrapper theme={theme} {...other}>
                <StyledImgWrapper direction="vertical" spacing={20}>
                    <StyledImg src={imgSrc} />
                    <div>
                        <Button size="s" plain type="primary">
                            3D材质替换
                        </Button>
                        <Button size="s">属性信息编辑</Button>
                    </div>
                </StyledImgWrapper>
                <StyledContentWrapper>
                    <Space block direction="vertical" spacing={20}>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Typography.Title level={4}>{title}</Typography.Title>
                            </Col>
                            <Col>
                                <Button size="s" type="primary" shape="square">
                                    <EditIcon />
                                </Button>
                                <Button size="s" shape="square">
                                    <DustbinIcon />
                                </Button>
                                <Dropdown overlay={menu}>
                                    <Button size="s" suffixNode={<ExpandIcon />}>
                                        管理
                                    </Button>
                                </Dropdown>
                                <Dropdown overlay={menu}>
                                    <Button size="s" suffixNode={<ExpandIcon />}>
                                        导出
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Space block direction="vertical" spacing={38}>
                            <Typography.Text color="assistant">
                                上传时间：2019-10-24 11:48:07
                            </Typography.Text>
                            <BrandInfoRow label="设置">
                                <CheckboxGroup
                                    styles={{
                                        wrapper: { marginRight: 32 },
                                    }}
                                    options={[
                                        {
                                            value: 1,
                                            label: (
                                                <span>
                                                    在工具中显示
                                                    <Tooltip title="我是提示文案">
                                                        <StyledHelpIcon />
                                                    </Tooltip>
                                                </span>
                                            ),
                                        },
                                        {
                                            value: 2,
                                            label: (
                                                <span>
                                                    商品
                                                    <Tooltip title="我是商品提示文案">
                                                        <StyledHelpIcon />
                                                    </Tooltip>
                                                </span>
                                            ),
                                        },
                                        {
                                            value: 3,
                                            label: (
                                                <span>
                                                    锁定尺寸
                                                    <Tooltip title="我是锁定尺寸提示文案">
                                                        <StyledHelpIcon />
                                                    </Tooltip>
                                                </span>
                                            ),
                                        },
                                    ]}
                                />
                            </BrandInfoRow>
                        </Space>
                    </Space>
                    <StyledDivider />
                    <Space block direction="vertical" spacing={12}>
                        <BrandInfoRow label="模型尺寸">
                            <Space>
                                <Typography.Text>600 X 399 X 470mm</Typography.Text>
                                <InlineButton>
                                    <EditIcon />
                                </InlineButton>
                            </Space>
                        </BrandInfoRow>
                        <BrandInfoRow label="型号">43243243</BrandInfoRow>
                        <BrandInfoRow label="产品编码">15435465760</BrandInfoRow>
                    </Space>
                    <StyledDivider />
                    <Space block direction="vertical" spacing={12}>
                        <BrandInfoRow label="品牌">政华武理</BrandInfoRow>
                        <BrandInfoRow label="系列">大尺寸</BrandInfoRow>
                        <BrandInfoRow label="商品标签">
                            {tags.map(t => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                        </BrandInfoRow>
                        <BrandInfoRow label="商品尺寸">600.378 X 399.496 X 470.158mm</BrandInfoRow>
                        <BrandInfoRow label="材质">木质</BrandInfoRow>
                        <BrandInfoRow label="价格">100.00元/个</BrandInfoRow>
                        <BrandInfoRow label="购买链接">
                            <Link href="https://www.kujiale.com" target="_blank">
                                https://www.kujiale.com
                            </Link>
                        </BrandInfoRow>
                        <BrandInfoRow label="描述">
                            新货备放，限量销售，以准备双十二的冲刺
                        </BrandInfoRow>
                    </Space>
                </StyledContentWrapper>
            </StyledDetailWrapper>
        );
    }),
);
