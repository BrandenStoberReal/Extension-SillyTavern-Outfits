import {ISillyTavernContext} from "./types/SillytavernContext";

export {};

// 1. Import when extension is user-scoped
import './sillytavern' ;

// 2. Import when extension is server-scoped
// import '../../../../global';

interface SillyTavernGlobal {
    getContext(): ISillyTavernContext;
    [key: string]: any; // Allow for other properties
}

declare global {
    const SillyTavern: SillyTavernGlobal;
    // Add global type declarations here
}
