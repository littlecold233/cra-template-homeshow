import { createContext, useContext } from 'react';
import { ISiderContextValue } from './types';

const PrivateContext = createContext<ISiderContextValue>(undefined as any);
export const SiderProvider = PrivateContext.Provider;
export const SiderConsumer = PrivateContext.Consumer;

export function useSiderContext() {
    const value = useContext<ISiderContextValue>(PrivateContext);
    return value;
}
