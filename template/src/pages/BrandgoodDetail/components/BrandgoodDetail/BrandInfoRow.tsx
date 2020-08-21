import React, { forwardRef } from 'react';
import { Row, Col, Typography } from '@muya-ui/core';
import styled from 'styled-components';

const StyledRow = styled(Row)`
    height: 28px;
`;
interface IBrandInfo {
    /**
     * 信息属性名，例如"型号"
     *
     * @type {string}
     * @memberof IBrandInfo
     */
    label: string;
    /**
     * 信息内容
     *
     * @type {React.ReactNode}
     * @memberof IBrandInfo
     */
    children?: React.ReactNode;
}

export default React.memo(
    forwardRef<HTMLDivElement, IBrandInfo>((props, ref) => {
        const { label, children } = props;
        return (
            <StyledRow gutter={20} align="middle">
                <Col
                    xs={{
                        span: 3,
                    }}
                    sm={{
                        span: 3,
                    }}
                    lg={{ span: 2 }}
                >
                    <Typography.Text color="assistant">{label}</Typography.Text>
                </Col>
                <Col
                    xs={{
                        span: 21,
                    }}
                    sm={{
                        span: 21,
                    }}
                    lg={{
                        span: 22,
                    }}
                >
                    {typeof children === 'string' ? (
                        <Typography.Text>{children}</Typography.Text>
                    ) : (
                        children
                    )}
                </Col>
            </StyledRow>
        );
    }),
);
