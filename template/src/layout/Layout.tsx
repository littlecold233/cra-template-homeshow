import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { IAppLayoutProps } from './types';
import { GlobalStyles, FontPenrose } from '@muya-ui/theme-light';
import { muyaThemeHomeshow } from './theme';
import { ThemeProvider } from '@muya-ui/core';

const StyledLayout = styled.div`
    display: flex;
    padding-top: 52px;
    height: 100%;
    position: relative;
    flex-flow: row nowrap;
    box-sizing: border-box;
`;

export default React.memo(
    forwardRef<HTMLDivElement, IAppLayoutProps>((props, ref) => {
        const { children, ...other } = props;
        return (
            <ThemeProvider theme={muyaThemeHomeshow}>
                <StyledLayout {...other} ref={ref}>
                    <FontPenrose />
                    <GlobalStyles normalize resetScrollBar />
                    {children}
                </StyledLayout>
            </ThemeProvider>
        );
    })
);
