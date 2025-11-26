import {SettingsSchema} from "./settings";

// Default settings for the extension
export const schema = Object.freeze({
    debugMode: {
        type: 'checkbox',
        label: 'Debug Mode',
        description: 'Enable debug logging in the browser console.',
        value: false,
    },
} as const satisfies SettingsSchema);
