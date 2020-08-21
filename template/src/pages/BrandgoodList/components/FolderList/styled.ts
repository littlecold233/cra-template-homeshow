import styled, { css } from 'styled-components';
import { Checkbox, Col, Img, InlineButton, Typography, Skeleton } from '@muya-ui/core';
import { StyledCardProps } from './types';

export const StyledCol = styled(Col)``;

export const StyledCard = styled.div`
    ${(props: StyledCardProps) => {
        return css`
            position: relative;
            text-align: center;
            padding: 16px 26px 12px;
            margin-bottom: 8px;
            border-radius: 4px;
            ${props.checked && `background: #f5f6f8`}
        `;
    }}
`;

export const StyledSkeleton = styled(Skeleton)`
    height: 170px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 8px;
`;

export const StyledImg = styled(Img)`
    border-radius: 2px;
`;

export const Text = styled(Typography.Paragraph)`
    margin-top: 12px;
`;

export const StyledCheckbox = styled(Checkbox)`
    position: absolute;
    top: 8px;
    right: 8px;
`;

export const IconWrapper = styled(InlineButton)`
    ${props => {
        const { theme } = props;
        return css`
            position: absolute;
            right: 8px;
            bottom: 40px;
            width: 24px;
            height: 24px;
            z-index: 999;
            background: ${theme.colors.pattern.background.block};
            box-shadow: ${theme.shadows.spec.s2.normal};
            border-radius: ${theme.spacing.spec.s1}px;
            display: flex;
            justify-content: center;
            align-content: center;
        `;
    }}
`;
