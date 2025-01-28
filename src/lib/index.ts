import type { Writable } from "svelte/store";

export type DIFFICULTY = 'easy' | 'medium' | 'hard'

export interface API {
    quit_app: () => void,
    extract_questions: (file_path: string , number_of_questions?: number , difficulty?: DIFFICULTY) => Promise<QUESTION[]>,
}

export interface QUESTION {
    id: string,
    question: string,
    options: string[],
    answer: string
}

//DO NOT CHANGE THESE VALUES
export enum GAMEPAD_AXIS {
    X_AXIS,
    Y_AXIS,
}

//DO NOT CHANGE THESE VALUES
export enum GAMEPAD_BUTTONS {
    TRIANGLE_BUTTON,
    CIRCLE_BUTTON,
    CROSS_BUTTON,
    SQUARE_BUTTON,
}

export interface SCREEN_CONTEXT {
    active_layout_item_id: Writable<string>,
    layout_items: Writable<LAYOUT_ITEM[]>
}

export interface LAYOUT_ITEM {
    id: string,
    events?: LAYOUT_ITEM_EVENT,
    data?: any
}

export interface LAYOUT_ITEM_EVENT {
    select?: (item: LAYOUT_ITEM) => void;
    focus?: (item: LAYOUT_ITEM) => void;
    up?: (item: LAYOUT_ITEM) => void;
    right?: (item: LAYOUT_ITEM) => void;
    down?: (item: LAYOUT_ITEM) => void;
    left?: (item: LAYOUT_ITEM) => void;
}