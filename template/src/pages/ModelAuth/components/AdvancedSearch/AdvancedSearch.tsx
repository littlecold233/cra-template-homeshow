import React, { useState, memo, useCallback, useMemo, useRef } from 'react';
import {
    Form,
    FormItem,
    Row,
    Col,
    Input,
    Animation,
    Button,
    InlineButton,
    IFormBag,
    Cascader,
    Select,
    Option,
    AutoComplete,
    useTheme,
} from '@muya-ui/core';
import { FoldIcon, UnfoldIcon } from '@muya-ui/theme-light';
import styled from 'styled-components';
import addressOptions from './address';
import { IAdvancedSearchValues, IAdvancedSearchProps, IFormItemWithValuesType } from './types';

const StyledFormItem = styled<IFormItemWithValuesType>(FormItem)`
    margin: 0;
    width: 100%;
`;

const StyledCollapseButton = styled(InlineButton)`
    margin-left: 20px;
`;

const StyledWrapper = styled.div`
    position: relative;
    padding: 28px;
    background: ${props => props.theme.colors.spec.neutral10.normal};
    border-radius: ${props => props.theme.size.spec.borderRadius.s2};
`;

// 表单数据结构
const defaultValues: IAdvancedSearchValues = {
    name: '王总',
    phone: '13667890456',
    buildingVillage: '莱茵矩阵国际',
    album: '范特西',
    autocomplete: '',
    address: [],
    sports: [],
};

// 校验手机号的正则，不用可以去掉
const phoneReg = /^1[3-9][0-9]{9}$/;

export const AdvancedSearch = memo(function(props: IAdvancedSearchProps) {
    const [collapse, setCollapse] = useState(false); // 展开收起状态
    const theme = useTheme();
    const formBagRef = useRef<IFormBag<IAdvancedSearchValues> | null>(null);
    const collapseButtonText = useMemo(() => (collapse ? '收起' : '展开'), [collapse]);
    const collapseButtonIcon = useMemo(
        () => (collapse ? <UnfoldIcon fontSize={8} /> : <FoldIcon fontSize={8} />),
        [collapse],
    );
    const equalNum = {
        sm: 4,
        md: 5,
    };
    const gutter = {
        sm: 24,
        md: 32,
    };

    const handleCollapse = useCallback(() => {
        setCollapse(c => !c);
    }, []);

    return (
        <Form<IAdvancedSearchValues>
            inline
            independent
            labelPosition="top"
            defaultValues={defaultValues}
            formBagRef={formBagRef}
            {...props}
        >
            <StyledWrapper theme={theme}>
                <Row equalNum={equalNum} gutter={gutter}>
                    <Col>
                        <StyledFormItem
                            label="客户姓名"
                            name="name"
                            rule={[
                                {
                                    max: 5,
                                    type: 'string',
                                    message: '客户姓名不能超过五个字符',
                                },
                            ]}
                        >
                            <Input width="100%" placeholder="请输入客户姓名" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem
                            label="客户电话"
                            name="phone"
                            rule={[
                                {
                                    type: 'string',
                                    required: false,
                                    validator(_r, v) {
                                        return v ? phoneReg.test(v) : true;
                                    },
                                    message: '手机号格式不正确',
                                },
                            ]}
                        >
                            <Input width="100%" placeholder="请输入客户电话" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="楼盘地址" name="address">
                            <Cascader options={addressOptions} inputWidth="100%" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="楼盘信息" name="buildingVillage">
                            <Input width="100%" placeholder="小区名、楼盘名" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem name="album" label="专辑">
                            <Select allowClear width="100%">
                                <Option value="范特西" key="1">
                                    范特西
                                </Option>
                                <Option value="八度空间" key="2">
                                    八度空间
                                </Option>
                                <Option value="叶惠美" key="3">
                                    叶惠美
                                </Option>
                            </Select>
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem name="sports" label="运动">
                            <Select allowClear mode="multiple" width="100%">
                                <Option value="篮球" label="篮球🏀" key="1" />
                                <Option value="排球" label="排球🏐" key="2" />
                                <Option value="足球" label="⚽足球️" key="3" />
                                <Option value="乒乓球" label="乒乓球🏓" key="4" />
                                <Option value="网球" label="网球🎾" key="5" />
                            </Select>
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="联想" name="autocomplete">
                            <AutoComplete
                                dataSource={['联想词1', '联想词2', '联想词3']}
                                placeholder="联想词autoComplete"
                                width="100%"
                                allowClear
                            />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="更多字段" name="other">
                            <Input width="100%" placeholder="输入关键词查找" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="更多字段" name="other">
                            <Input width="100%" placeholder="输入关键词查找" />
                        </StyledFormItem>
                    </Col>
                    <Col>
                        <StyledFormItem label="更多字段" name="other">
                            <Input width="100%" placeholder="输入关键词查找" />
                        </StyledFormItem>
                    </Col>
                </Row>
                {/* 展开/收起部分 */}
                <Animation.Collapse in={collapse}>
                    <Row equalNum={equalNum} gutter={gutter}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                            <Col key={v}>
                                <StyledFormItem label="更多字段" name="other">
                                    <Input width="100%" placeholder="输入关键词查找" />
                                </StyledFormItem>
                            </Col>
                        ))}
                    </Row>
                </Animation.Collapse>
                <Row gutter={gutter} justify="end">
                    <Col>
                        <Button htmlType="reset">重置</Button>
                        <Button htmlType="submit" type="primary" plain>
                            搜索
                        </Button>
                        <StyledCollapseButton
                            type="primary"
                            onClick={handleCollapse}
                            suffixNode={collapseButtonIcon}
                        >
                            {collapseButtonText}
                        </StyledCollapseButton>
                    </Col>
                </Row>
            </StyledWrapper>
        </Form>
    );
});

export default AdvancedSearch;
