// src/utils/html.ts
import {EXTENSION_ID} from "../constants";

export interface BaseOptions {
    id?: string;
    label?: string;
    description?: string;
    value?: any;
    class?: string;
    attributes?: { [key: string]: string };
}

export interface CheckboxOptions extends BaseOptions {
    value?: boolean;
}

export interface TextboxOptions extends BaseOptions {
    value?: string;
    placeholder?: string;
}

export interface RangeOptions extends BaseOptions {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
}

export interface ButtonOptions extends BaseOptions {
    text: string;
}

export namespace HtmlUtils {
    function createWrapper(options: BaseOptions): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`${EXTENSION_ID}-option`);
        if (options.class) {
            wrapper.classList.add(...options.class.split(' '));
        }
        if (options.id) {
            wrapper.id = `${options.id}-wrapper`;
        }
        return wrapper;
    }

    function createLabel(forId: string, text: string): HTMLLabelElement {
        const label = document.createElement('label');
        label.htmlFor = forId;
        label.textContent = text;
        return label;
    }

    function createDescription(text: string): HTMLElement {
        const description = document.createElement('p');
        description.classList.add(`${EXTENSION_ID}-option-description`);
        description.textContent = text;
        return description;
    }

    export function AddCheckbox(
        parent: HTMLElement,
        options: CheckboxOptions,
        callback: (value: boolean) => void
    ): HTMLInputElement {
        const wrapper = createWrapper(options);

        const id = options.id ?? `${EXTENSION_ID}-checkbox-${Math.random().toString(36).substring(2)}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.checked = options.value ?? false;

        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                checkbox.setAttribute(key, value);
            });
        }

        checkbox.addEventListener('change', () => {
            callback(checkbox.checked);
        });

        const labelAndInput = document.createElement('div');
        labelAndInput.classList.add(`${EXTENSION_ID}-option-label-input`);

        if (options.label) {
            const label = createLabel(id, options.label);
            labelAndInput.appendChild(label);
        }
        labelAndInput.appendChild(checkbox);

        wrapper.appendChild(labelAndInput);

        if (options.description) {
            const description = createDescription(options.description);
            wrapper.appendChild(description);
        }

        parent.appendChild(wrapper);
        return checkbox;
    }

    export function AddTextbox(
        parent: HTMLElement,
        options: TextboxOptions,
        callback: (value: string) => void
    ): HTMLInputElement {
        const wrapper = createWrapper(options);

        const id = options.id ?? `${EXTENSION_ID}-textbox-${Math.random().toString(36).substring(2)}`;

        if (options.label) {
            const label = createLabel(id, options.label);
            wrapper.appendChild(label);
        }

        const textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = id;
        textbox.value = options.value ?? '';
        textbox.placeholder = options.placeholder ?? '';

        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                textbox.setAttribute(key, value);
            });
        }

        textbox.addEventListener('input', () => {
            callback(textbox.value);
        });

        wrapper.appendChild(textbox);

        if (options.description) {
            const description = createDescription(options.description);
            wrapper.appendChild(description);
        }

        parent.appendChild(wrapper);
        return textbox;
    }

    export function AddButton(
        parent: HTMLElement,
        options: ButtonOptions,
        callback: (event: MouseEvent) => void
    ): HTMLButtonElement {
        const wrapper = createWrapper(options);

        const button = document.createElement('button');
        button.id = options.id ?? `${EXTENSION_ID}-button-${Math.random().toString(36).substring(2)}`;
        button.textContent = options.text;

        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                button.setAttribute(key, value);
            });
        }

        button.addEventListener('click', (event) => {
            callback(event);
        });

        wrapper.appendChild(button);

        if (options.description) {
            const description = createDescription(options.description);
            wrapper.appendChild(description);
        }

        parent.appendChild(wrapper);
        return button;
    }
}
