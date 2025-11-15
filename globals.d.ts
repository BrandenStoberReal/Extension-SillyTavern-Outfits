import {ISillyTavernContext} from "./src/types/SillytavernContext.ts";

export {};

interface SillyTavernGlobal {
    getContext(): ISillyTavernContext;
    [key: string]: any; // Allow for other properties
}

declare global {
    const SillyTavern: SillyTavernGlobal;
    // Add global type declarations here
}
