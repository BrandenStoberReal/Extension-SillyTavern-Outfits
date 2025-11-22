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

declare global {
    const SillyTavern: SillyTavernGlobal;
    type JQuery = any;

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
