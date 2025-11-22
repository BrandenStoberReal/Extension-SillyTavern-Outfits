import {ISillyTavernContext} from './src/types/SillytavernContext.ts';

export {};

interface SillyTavernGlobal {
    getContext(): ISillyTavernContext;

    [key: string]: any; // Allow for other properties
    libs: {
        lodash: any;
        localforage: any;
        Fuse: any;
        DOMPurify: any;
        Handlebars: any;
        moment: any;
        showdown: any;
    };
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    length: number;

    on(events: string, handler: (eventObject: JQuery.Event<TElement>) => any): this;

    prop(name: string): any | undefined;

    prop(name: string, value: any): this;

    append(content: any): this;

    [index: number]: TElement;
}

interface JQueryStatic {
    (selector: string, context?: any): JQuery;

    (element: HTMLElement): JQuery;

    (object: {}): JQuery;

    (callback: (jQueryAlias?: JQueryStatic) => void): any;
}

declare global {
    const SillyTavern: SillyTavernGlobal;
    const $: JQueryStatic;

    // Add global type declarations here
    enum HttpHeader {
        ContentType = 'Content-Type',
    }
}
