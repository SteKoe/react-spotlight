import {useEffect, useRef} from "react";


export function useEventListener(eventName: string, handler: Function, element = window) {
    const savedHandler = useRef<Function>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const eventListener = (event: Event) => {
                // @ts-ignore
                return savedHandler.current(event);
            };

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
}

