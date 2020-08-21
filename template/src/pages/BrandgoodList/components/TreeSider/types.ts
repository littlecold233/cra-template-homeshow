import { ITreeProps } from '@muya-ui/core';

export interface ITreeSiderProps extends ITreeProps {
    /**
     * 容器是否需要右边框
     *
     * @type {boolean}
     * @memberof ITreeSiderProps
     */
    bordered?: boolean;
    /**
     * 输入框搜索事件
     *
     * @memberof ITreeSiderProps
     */
    onSearch?: (search: string) => void;
    /**
     * 回收站选中事件
     *
     * @memberof ITreeSiderProps
     */
    onDustbinSelect?: (selected: boolean) => void;
}
