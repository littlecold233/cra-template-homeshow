import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { IAppContentProps } from './types';
import { useTheme } from '@muya-ui/core';

const StyledContent = styled.div<IAppContentProps>`
    ${(props) => {
        const { disableBgColor, theme } = props;
        const bgStyle =
            !disableBgColor &&
            css`
                background: ${theme.colors.spec.neutral8.normal};
            `;
        return css`
            flex: 1;
            overflow-x: hidden;
            ${bgStyle}
        `;
    }}
`;

export default React.memo(
    forwardRef<HTMLDivElement, IAppContentProps>((props, ref) => {
        const theme = useTheme();
        const { disableBgColor = true, children, ...other } = props;
        return (
            <StyledContent theme={theme} disableBgColor={disableBgColor} {...other} ref={ref}>
                {children}
            </StyledContent>
        );
    })
);
