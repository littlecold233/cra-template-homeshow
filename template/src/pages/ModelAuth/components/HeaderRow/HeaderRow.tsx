import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { useTheme, Row } from '@muya-ui/core';

import { IHeaderRowProps } from './types';
import addPx from './addPx';

interface IStyledWrapperProps {
    $bordered: boolean;
    $height: string;
    $noPadding: boolean;
}

const StyledRow = styled(Row)<IStyledWrapperProps>`
    ${props => {
        const { theme, $bordered, $noPadding, $height } = props;
        const borderStyle =
            $bordered &&
            css`
                border-bottom: 1px solid ${theme.colors.pattern.border.normal};
            `;
        const paddingStyle =
            !$noPadding &&
            css`
                padding: 0 20px;
            `;

        return css`
            height: ${$height};
            background: ${theme.colors.pattern.background.block};
            ${paddingStyle}
            ${borderStyle}
        `;
    }}
`;

export default React.memo(
    forwardRef<HTMLDivElement, IHeaderRowProps>((props, ref) => {
        const { bordered = true, height = 52, noPadding = false, ...other } = props;
        const theme = useTheme();

        return (
            <StyledRow
                ref={ref}
                theme={theme}
                $height={addPx(height)}
                $bordered={bordered}
                $noPadding={noPadding}
                justify="space-between"
                align="middle"
                {...other}
            />
        );
    }),
);
