import React, { memo, useCallback, useState } from 'react';
import { IMenuSelectInfo, Row, Dropdown, Menu, MenuItem } from '@muya-ui/core';
import { MoreIcon } from '@muya-ui/theme-light';
import { IDataProps, IFolderListProps } from './types';
import {
    StyledCard,
    IconWrapper,
    StyledCheckbox,
    StyledCol,
    StyledImg,
    Text,
    StyledSkeleton,
} from './styled';

function getDefaultData(count: number) {
    const res: IDataProps[] = [];
    for (let i = 0; i < count; i++) {
        const obj: IDataProps = {
            imgSrc: '',
            key: i,
        };
        res.push(obj);
    }
    return res;
}

const FolderList = memo((props: IFolderListProps) => {
    const {
        data,
        onOverlayClick,
        checkedData,
        onClick,
        onChange,
        loading = false,
        defaultDataCount = 24,
        ...otherProps
    } = props;
    const defaultData = getDefaultData(defaultDataCount);
    const renderData = loading ? defaultData : data;
    const [hoveredKeys, setHoveredKeys] = useState<React.Key[]>([]);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, item: IDataProps) => {
            const checked = e.target.checked;
            const newState = [...checkedData];
            if (checked) {
                newState.push(item);
            } else {
                const index = newState.findIndex(value => value.key === item.key);
                newState.splice(index, 1);
            }
            onChange && onChange(newState);
        },
        [checkedData, onChange],
    );

    const handleMouseEnter = useCallback(key => {
        setHoveredKeys(prev => {
            if (prev.includes(key)) {
                return prev;
            }
            return [...prev, key];
        });
    }, []);
    const handleMouseLeave = useCallback(key => {
        setHoveredKeys(prev => {
            return prev.filter(k => k !== key);
        });
    }, []);

    const handleOverlayClick = useCallback(
        (selectInfo: IMenuSelectInfo, item: IDataProps) => {
            onOverlayClick && onOverlayClick(selectInfo, item);
        },
        [onOverlayClick],
    );
    const handleClick = useCallback(
        (item: IDataProps) => {
            onClick && onClick(item);
        },
        [onClick],
    );
    // 此处需要根据业务修改 Menu
    const menu = (
        <Menu>
            <MenuItem key="0">编辑</MenuItem>
            <MenuItem key="1">删除</MenuItem>
        </Menu>
    );

    return (
        <Row
            equalNum={{
                md: 6,
                lg: 8,
            }}
            gutter={{
                lg: 18,
            }}
            {...otherProps}
        >
            {renderData.map(item => {
                const isChecked = checkedData.some(v => v.key === item.key);
                const isHovered = hoveredKeys.includes(item.key);
                const isCheckedOrHovered = isChecked || isHovered;
                return (
                    <StyledCol key={item.key}>
                        <StyledSkeleton loading={loading} type="card">
                            <StyledCard
                                checked={isCheckedOrHovered}
                                onMouseEnter={() => handleMouseEnter(item.key)}
                                onMouseLeave={() => handleMouseLeave(item.key)}
                                onClick={() => handleClick(item)}
                            >
                                {isCheckedOrHovered ? (
                                    <StyledCheckbox
                                        checked={isChecked}
                                        onChange={e => handleChange(e, item)}
                                        onMouseEnter={() => handleMouseEnter(item.key)}
                                        onMouseLeave={() => handleMouseLeave(item.key)}
                                    />
                                ) : null}
                                {isHovered ? (
                                    <Dropdown
                                        overlay={menu}
                                        onOverlayClick={v => handleOverlayClick(v, item)}
                                        triggerAction="click"
                                    >
                                        <IconWrapper onClick={e => e.stopPropagation()}>
                                            <MoreIcon />
                                        </IconWrapper>
                                    </Dropdown>
                                ) : null}
                                <StyledImg aspectRatio="1:1" src={item.imgSrc} />
                                <Text>群岛</Text>
                            </StyledCard>
                        </StyledSkeleton>
                    </StyledCol>
                );
            })}
        </Row>
    );
});

export default FolderList;
