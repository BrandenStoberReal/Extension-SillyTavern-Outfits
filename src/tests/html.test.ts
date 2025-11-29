/**
 * @jest-environment jsdom
 */

import {
    AddButton,
    AddCheckbox,
    AddTextbox,
    createDescription,
    createLabel,
    createWrapper
} from '../../../SillyTavern-Utils/src/utils/html';

describe('HTML Utils', () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        document.body.appendChild(parent);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('createWrapper', () => {
        it('should create a div with the default class', () => {
            const wrapper = createWrapper({});
            expect(wrapper.tagName).toBe('DIV');
            expect(wrapper.classList.contains('st-outfits-option')).toBe(true);
        });

        it('should add a custom class', () => {
            const wrapper = createWrapper({class: 'my-class'});
            expect(wrapper.classList.contains('my-class')).toBe(true);
        });

        it('should add an id', () => {
            const wrapper = createWrapper({id: 'my-id'});
            expect(wrapper.id).toBe('my-id-wrapper');
        });
    });

    describe('createLabel', () => {
        it('should create a label with the correct for and text content', () => {
            const label = createLabel('my-id', 'My Label');
            expect(label.tagName).toBe('LABEL');
            expect(label.htmlFor).toBe('my-id');
            expect(label.textContent).toBe('My Label');
        });
    });

    describe('createDescription', () => {
        it('should create a p with the default class and text content', () => {
            const description = createDescription('My Description');
            expect(description.tagName).toBe('P');
            expect(description.classList.contains('st-outfits-option-description')).toBe(true);
            expect(description.textContent).toBe('My Description');
        });
    });

    describe('AddCheckbox', () => {
        it('should create a checkbox with a label', () => {
            const callback = jest.fn();
            const checkbox = AddCheckbox(parent, {label: 'My Checkbox'}, callback);
            expect(checkbox.type).toBe('checkbox');
            const label = parent.querySelector('label');
            expect(label).not.toBeNull();
            expect(label?.textContent).toBe('My Checkbox');
            expect(label?.contains(checkbox)).toBe(true);
        });

        it('should call the callback on change', () => {
            const callback = jest.fn();
            const checkbox = AddCheckbox(parent, {}, callback);
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
            expect(callback).toHaveBeenCalledWith(true);
        });

        it('should not include a description if includeDescription is false', () => {
            AddCheckbox(parent, {description: 'My Description', includeDescription: false}, jest.fn());
            const description = parent.querySelector('.st-outfits-option-description');
            expect(description).toBeNull();
        });
    });

    describe('AddTextbox', () => {
        it('should create a textbox with a label', () => {
            const callback = jest.fn();
            const textbox = AddTextbox(parent, {label: 'My Textbox'}, callback);
            expect(textbox.type).toBe('text');
            const label = parent.querySelector('label');
            expect(label).not.toBeNull();
            expect(label?.textContent).toBe('My Textbox');
        });

        it('should call the callback on input', () => {
            const callback = jest.fn();
            const textbox = AddTextbox(parent, {}, callback);
            textbox.value = 'hello';
            textbox.dispatchEvent(new Event('input'));
            expect(callback).toHaveBeenCalledWith('hello');
        });
    });

    describe('AddButton', () => {
        it('should create a button with text', () => {
            const callback = jest.fn();
            const button = AddButton(parent, {text: 'My Button'}, callback);
            expect(button.tagName).toBe('BUTTON');
            expect(button.textContent).toBe('My Button');
        });

        it('should call the callback on click', () => {
            const callback = jest.fn();
            const button = AddButton(parent, {text: 'Click Me'}, callback);
            button.dispatchEvent(new MouseEvent('click'));
            expect(callback).toHaveBeenCalled();
        });
    });
});
