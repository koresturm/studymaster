import type { TransitionConfig } from "svelte/transition";

interface TranslateParams {
    duration?: number;
    axis?: 'x' | 'y';
}

export function translate(node: HTMLElement, params: TranslateParams = {}): TransitionConfig {
    const duration = params.duration ?? 300;
    const axis = params.axis ?? 'x';

    return {
        duration,
        css: (t: number) => {
            const eased = 1 - Math.pow(1 - t, 3);
            return `
                transform: translate${axis}(${(1 - eased) * 100}%);
                opacity: ${eased};
            `;
        }
    };
}