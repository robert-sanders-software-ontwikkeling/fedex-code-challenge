import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { changeComponent, getChildElements } from '../../testing/utility';
import { InputComponent } from './input.component';

describe('Input component', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [InputComponent],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('can create an input component', () => {
        expect(component).toBeTruthy();
    });

    it('input element id attribute is bound to label property', async () => {
        await changeComponent(fixture, () => component.label = 'test');
        const inputElement = getInputElement();
        expect(inputElement.getAttribute('id')).toEqual('test');
    });

    it('input element value is bound to value property', async () => {
        await changeComponent(fixture, () => component.value = 'test');
        const inputElement = getInputElement();
        expect(inputElement.value).toEqual('test');
    });

    it('input element type attribute is bound to type property', async () => {
        await changeComponent(fixture, () => component.type = 'email');
        const inputElement = getInputElement();
        expect(inputElement.getAttribute('type')).toEqual('email');
    });

    it('calling setDisabledState with true will add disabled attribute from input element', async () => {
        await changeComponent(fixture, () => component.setDisabledState(true));
        const inputElement = getInputElement();
        expect(inputElement.hasAttribute('disabled')).toBeTruthy();
    });

    it('calling setDisabledState with false will remove disabled attribute from input element', async () => {
        await changeComponent(fixture, () => component.setDisabledState(true));
        await changeComponent(fixture, () => component.setDisabledState(false));
        const inputElement = getInputElement();
        expect(inputElement.hasAttribute('disabled')).toBeFalsy();
    });

    it('label for attribute is bound to label property', async () => {
        await changeComponent(fixture, () => component.label = 'test');
        const labelElement = getLabelElement();
        expect(labelElement.getAttribute('for')).toEqual('test');
    });

    it('label text content is bound to label property', async () => {
        await changeComponent(fixture, () => component.label = 'test');
        const labelElement = getLabelElement();
        expect(labelElement.textContent.trim()).toEqual('test');
    });

    it('errors div will not be added to dom tree when we do not have error', () => {
        const errorElement = getErrorsElement();
        expect(errorElement).toBeFalsy();
    });

    it('errors div will be added to dom tree when we have errors', async () => {
        await changeComponent(fixture, () => component.errors = ['oeps']);
        const errorElement = getErrorsElement();
        expect(errorElement).toBeTruthy();
    });

    it('errors will be shown', async () => {
        await changeComponent(fixture, () => component.errors = ['oeps', 'oei']);
        const  errors = getErrors();
        expect(errors).toEqual(['oeps', 'oei']);
    });

    it('input value change will call onValueChanged', () => {
        const onValueChangedSpy = jest.spyOn(component, 'onValueChanged');
        const inputElement = getInputElement();
        inputElement.dispatchEvent(new Event('input'));
        expect(onValueChangedSpy).toHaveBeenCalledTimes(1);
    });

    it('user input will update value property', async () => {
        await changeComponent(fixture, () => {
            const inputElement = getInputElement();
            inputElement.value = 'hi';
            inputElement.dispatchEvent(new Event('input'));
        });
        expect(component.value).toEqual('hi');
    });

    it('onValueChanged will call passed change handler', () => {
        const changeHandler = {
            onChange: jest.fn()
        };

        const onChangeSpy = jest.spyOn(changeHandler, 'onChange');

        component.registerOnChange(changeHandler.onChange);
        component.value = 'test';
        component.onValueChanged();

        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'test');
    });

    it('writeValue will set value', () => {
        component.writeValue('test');
        expect(component.value).toEqual('test');
    });

    function getInputElement(): HTMLInputElement {
        return getChildElements<HTMLInputElement>(fixture.debugElement, 'input')[0];
    }

    function getLabelElement(): HTMLLabelElement {
        return getChildElements<HTMLLabelElement>(fixture.debugElement, 'label')[0];
    }

    function getErrorsElement(): HTMLElement {
        return getChildElements<HTMLElement>(fixture.debugElement, '.c-input-errors')[0];
    }

    function getErrors(): string[] {
        return getChildElements<HTMLElement>(fixture.debugElement, 'small').map(element => element.textContent.trim());
    }
});
