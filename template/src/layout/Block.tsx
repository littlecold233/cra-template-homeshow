import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { IBlockProps } from './types';
import { useTheme } from '@muya-ui/core';

function addPx(value?: string | number) {
    if (typeof value === 'number') {
        return `${value}px`;
    }
    if (!value) {
        return '';
    }
    return value;
}

interface IStyledBlockProps {
    $width?: string | number;
    $height?: string | number;
}
const StyledBlock = styled.div<IStyledBlockProps>`
    ${(props) => {
        const {
            theme: {
                colors: {
                    pattern: { background }
                }
            },
            $width,
            $height
        } = props;
        const widthStyle =
            $width &&
            css`
                width: ${addPx($width)};
            `;
        const heightStyle =
            $height &&
            css`
                height: ${addPx($height)};
            `;
        return css`
            background-color: ${background.block};
            ${widthStyle}
            ${heightStyle}
        `;
    }}
`;

export default React.memo(
    forwardRef<HTMLDivElement, IBlockProps>((props, ref) => {
        const theme = useTheme();
        const { width, height, ...other } = props;
        return <StyledBlock theme={theme} $width={width} $height={height} {...other} ref={ref} />;
    })
);
