import styled, { css } from 'styled-components';
import { Space, Img } from '@muya-ui/core';
import { FoldIcon, QuestionIcon } from '@muya-ui/theme-light';

export const StyledImgWrapper = styled(Space)``;
export const ExpandIcon = styled(FoldIcon)`
    width: 8px;
    height: 8px;

    opacity: 0.5;
`;
export const StyledHelpIcon = styled(QuestionIcon)``;
export const StyledImg = styled(Img)``;

export const StyledContentWrapper = styled.div``;
export const StyledDivider = styled.div``;
export const StyledDetailWrapper = styled.div`
    ${props => {
        const { theme } = props;
        return css`
            display: flex;
            position: relative;
            background: ${theme.colors.pattern.background.block};
            padding: 32px 40px 20px 40px;
            ${StyledDivider} {
                width: 100%;
                height: 1px;
                background: ${theme.colors.pattern.border.normal};
                margin: 20px 0;
            }
            ${StyledImg} {
                position: relative;
                height: 298px;
                width: 298px;
            }
            ${StyledImgWrapper} {
                display: flex;
                margin-right: 40px;
            }
            ${StyledContentWrapper} {
                display: flex;
                flex: 1;
                flex-flow: column nowrap;
            }
            ${StyledHelpIcon} {
                margin-left: 4px;
                color: ${theme.colors.pattern.text.assistant};
            }
        `;
    }}
`;
