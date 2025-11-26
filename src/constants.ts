// Extension Info
export const EXTENSION_NAME = 'Outfit Extension';
export const EXTENSION_ID = 'extension-valuetracker-outfits';
export const MODULE_NAME = 'outfit_extension';

// Internal stuff
export const API_ROOT_URL = '/api/plugins/valuetracker';

// Define API enums
export enum ApiEndpoints {
    Register = '/register',
}

export enum HttpMethod {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

export enum HttpContentType {
    JSON = 'application/json',
}