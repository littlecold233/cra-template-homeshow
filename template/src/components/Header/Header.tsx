import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/kulogo.svg';

const StyledHeader = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    background-color: #021329;
    font-size: 14px;
    height: 52px;
    user-select: none;
`;

const StyledLogo = styled.img`
    width: 80px;
    height: 32px;
    border-radius: 2px;
    overflow: hidden;
    margin-left: 32px;
`;

export default function Header () {
    return <StyledHeader id="workbench-header">
        <StyledLogo src={logo} />
    </StyledHeader>
}
