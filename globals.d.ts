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
    const API_ROOT_URL = '/api/plugins/valuetracker'
    const EXTENSION_ID = 'extension-valuetracker-outfits'

    enum ApiEndpoints {
        Register = '/register',
    }

    enum HttpHeader {
        ContentType = 'Content-Type',
    }

    enum HttpContentType {
        JSON = 'application/json',
    }

    enum HttpMethod {
        GET = 'GET',
        HEAD = 'HEAD',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE',
        OPTIONS = 'OPTIONS',
    }
}
