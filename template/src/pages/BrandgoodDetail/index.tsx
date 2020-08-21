import React from 'react';
import { Breadcrumbs, InlineButton, Button, Space } from '@muya-ui/core';
import { RiseIcon } from '@muya-ui/theme-light';
import { HeaderRow } from './components/HeaderRow';
import { BrandgoodDetail } from './components/BrandgoodDetail';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    min-width: 960px;
`;

export default function Home() {
    return (
        <StyledWrapper>
            <HeaderRow>
                <Space spacing={12}>
                    <Button shape="square" size="s">
                        <RiseIcon style={{ transform: 'rotate(-90deg)' }} />
                    </Button>
                    <Breadcrumbs>
                        <InlineButton size="l" href="../../" type="secondary">
                            商品管理
                        </InlineButton>
                        <InlineButton size="l" href="../../" type="secondary">
                            通用
                        </InlineButton>
                        <InlineButton size="l" href="../../" type="strong" constant>
                            安迪洛凡尼家居
                        </InlineButton>
                    </Breadcrumbs>
                </Space>
            </HeaderRow>
            <BrandgoodDetail
                imgSrc="//qhrenderpicoss.kujiale.com/dev/2019/05/17/L3D186S8ENDIHBLJUIUFFBXSLUF3P3X4888_1920x1080.jpg"
                title="安迪洛凡尼灯品001"
                tags={['美式', '现代']}
            />
        </StyledWrapper>
    );
}
