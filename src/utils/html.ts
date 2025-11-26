// src/utils/html.ts

export interface BaseOptions {
    id?: string;
    label?: string;
    description?: string;
    value?: any;
    class?: string;
    labelClass?: string;
    attributes?: { [key: string]: string };
    includeDescription?: boolean;
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

export function createWrapper(options: BaseOptions): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(`st-outfits-option`);
    if (options.class) {
        wrapper.classList.add(...options.class.split(' '));
    }
    if (options.id) {
        wrapper.id = `${options.id}-wrapper`;
    }
    return wrapper;
}

export function createLabel(forId: string, text: string, labelClass?: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.htmlFor = forId;
    label.textContent = text;
    if (labelClass) {
        label.classList.add(...labelClass.split(' '));
    }
    return label;
}

export function createDescription(text: string): HTMLElement {
    const description = document.createElement('p');
    description.classList.add(`st-outfits-option-description`);
    description.textContent = text;
    return description;
}

export function AddCheckbox(
    parent: HTMLElement,
    options: CheckboxOptions,
    callback: (value: boolean) => void,
): HTMLInputElement {
    const wrapper = createWrapper(options);

    const id = options.id ?? `st-outfits-checkbox-${Math.random().toString(36).substring(2)}`;

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
    labelAndInput.classList.add(`st-outfits-option-label-input`);

    if (options.label) {
        const label = createLabel(id, options.label, options.labelClass);
        labelAndInput.appendChild(checkbox);
        labelAndInput.appendChild(label);
    } else {
        labelAndInput.appendChild(checkbox);
    }

    wrapper.appendChild(labelAndInput);

    if (options.description && (options.includeDescription ?? true)) {
        const description = createDescription(options.description);
        wrapper.appendChild(description);
    }

    parent.appendChild(wrapper);
    return checkbox;
}

export function AddTextbox(
    parent: HTMLElement,
    options: TextboxOptions,
    callback: (value: string) => void,
): HTMLInputElement {
    const wrapper = createWrapper(options);

    const id = options.id ?? `st-outfits-textbox-${Math.random().toString(36).substring(2)}`;

    if (options.label) {
        const label = createLabel(id, options.label, options.labelClass);
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

    if (options.description && (options.includeDescription ?? true)) {
        const description = createDescription(options.description);
        wrapper.appendChild(description);
    }

    parent.appendChild(wrapper);
    return textbox;
}

export function AddButton(
    parent: HTMLElement,
    options: ButtonOptions,
    callback: (event: MouseEvent) => void,
): HTMLButtonElement {
    const wrapper = createWrapper(options);

    const button = document.createElement('button');
    button.id = options.id ?? `st-outfits-button-${Math.random().toString(36).substring(2)}`;
    button.textContent = options.text;

    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            button.setAttribute(key, value);
        });
    }

    button.addEventListener('click', (event) => {
        callback(event);
    });

    if (options.label) {
        const label = createLabel(button.id, options.label, options.labelClass);
        wrapper.appendChild(label);
    }

    wrapper.appendChild(button);

    if (options.description && (options.includeDescription ?? true)) {
        const description = createDescription(options.description);
        wrapper.appendChild(description);
    }

    parent.appendChild(wrapper);
    return button;
}
