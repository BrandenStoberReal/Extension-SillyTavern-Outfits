import {AddCheckbox, AddGroup, AddTextbox} from '../../SillyTavern-Utils/src/utils/html';
import {MODULE_NAME} from './constants';

export type SettingType = 'checkbox' | 'textbox' | 'range';

export interface SettingDefinition {
    type: SettingType;
    label: string;
    description?: string;
    value: any;
}

export interface SettingsSchema {
    [key: string]: SettingDefinition;
}

export class SettingsManager<T extends SettingsSchema> {
    private settings!: { [K in keyof T]: T[K]['value'] };
    private readonly defaultSettings: T;

    constructor(defaultSettings: T) {
        this.defaultSettings = defaultSettings;
        this.load();
    }

    get<K extends keyof T>(key: K): T[K]['value'] {
        return this.settings[key];
    }

    set<K extends keyof T>(key: K, value: T[K]['value']) {
        this.settings[key] = value;
        this.save();
    }

    render(container: HTMLElement) {
        const settingsGroup = AddGroup(container, {
            title: 'Settings',
            id: `${MODULE_NAME}-settings-group`,
        });

        for (const key in this.defaultSettings) {
            const definition = this.defaultSettings[key as keyof T];
            const currentValue = this.get(key as keyof T);

            switch (definition.type) {
                case 'checkbox':
                    AddCheckbox(settingsGroup, {
                        id: `${MODULE_NAME}-${String(key)}`,
                        label: definition.label,
                        labelClass: 'normal',
                        description: definition.description,
                        value: currentValue,
                    }, (value) => this.set(key as keyof T, value));
                    break;
                case 'textbox':
                    AddTextbox(settingsGroup, {
                        id: `${MODULE_NAME}-${String(key)}`,
                        label: definition.label,
                        labelClass: 'normal',
                        description: definition.description,
                        value: currentValue,
                    }, (value) => this.set(key as keyof T, value));
                    break;
                // Add other types when needed
                default:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    console.warn(`Unknown setting type: ${definition.type}`);
            }
        }
    }

    private load() {
        const context = SillyTavern.getContext();
        const extensionSettings = (context.extensionSettings as Record<string, any>)[MODULE_NAME] ?? {};

        const loadedSettings: any = {};
        for (const key in this.defaultSettings) {
            loadedSettings[key] = extensionSettings[key] ?? this.defaultSettings[key].value;
        }

        this.settings = loadedSettings;
    }

    private save() {
        const context = SillyTavern.getContext();
        if (!(context.extensionSettings as Record<string, any>)[MODULE_NAME]) {
            (context.extensionSettings as Record<string, any>)[MODULE_NAME] = {};
        }
        Object.assign((context.extensionSettings as Record<string, any>)[MODULE_NAME], this.settings);
        context.saveSettingsDebounced();
    }
}
