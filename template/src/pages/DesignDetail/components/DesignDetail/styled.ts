import styled, { css } from 'styled-components';
import { Img, MaskButton } from '@muya-ui/core';
import { FoldIcon } from '@muya-ui/theme-light';

export const StyledMaskButton = styled(MaskButton)``;
export const StyledImg = styled(Img)``;
export const ExpandIcon = styled(FoldIcon)`
    width: 8px;
    height: 8px;

    /* opacity: 0.5; */
`;

export const StyledContentWrapper = styled.div``;
export const StyledDivider = styled.div``;
export const StyledHorizontalDivider = styled.div``;

export const StyledDetailWrapper = styled.div`
    ${props => {
        const { theme } = props;
        return css`
            display: flex;
            position: relative;
            background: ${theme.colors.pattern.background.block};
            padding: 32px 40px 38px 40px;
            ${StyledDivider} {
                width: 100%;
                height: 1px;
                background: ${theme.colors.pattern.border.normal};
            }
            ${StyledImg} {
                position: relative;
                height: 216px;
                width: 216px;
                margin-right: 40px;
            }
            ${StyledContentWrapper} {
                display: flex;
                flex: 1;
                flex-flow: column nowrap;
                justify-content: space-between;
            }
            ${StyledMaskButton} {
                position: absolute;
                right: 12px;
                top: 12px;
            }
            ${StyledHorizontalDivider} {
                width: 1px;
                height: 8px;
                background: ${theme.colors.pattern.border.normal};
            }
        `;
    }}
`;
