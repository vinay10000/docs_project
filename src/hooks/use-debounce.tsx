import { useCallback, useRef } from "react";

type AnyFunction = (...args: unknown[]) => unknown;

export const useDebounce = <T extends AnyFunction>(callback: T, delay: number = 500) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};
