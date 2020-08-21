import { IFormProps as IMuyaFormProps, IFormItemProps } from '@muya-ui/core';

// 表单默认值
export interface IAdvancedSearchValues {
    name: string;
    phone: string;
    album: string;
    buildingVillage: string;
    autocomplete: string;
    address: string[];
    sports: string[];
    other?: string;
}

export type IAdvancedSearchProps = IMuyaFormProps<IAdvancedSearchValues>;

export type IFormItemWithValuesType = (props: IFormItemProps<IAdvancedSearchValues>) => JSX.Element;

export type IFormProps = IMuyaFormProps;
