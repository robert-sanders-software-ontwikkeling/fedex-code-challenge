import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})
export class InputComponent implements ControlValueAccessor {
    @Input() type: string;
    @Input() label: string;
    @Input() errors: string[];
    public value: string;
    public emitChange: (value: string) => void;
    private $isDisabled: boolean;

    public get isDisabled(): boolean {
        return this.$isDisabled;
    }

    public get hasErrors(): boolean {
        return this.errors?.length > 0;
    }

    public writeValue(value: any): void {
       this.value = value;
    }

    public onValueChanged(): void {
        if (this.emitChange) {
            this.emitChange(this.value);
        }
    }

    public registerOnChange(emitChange: (value: string) => void): void {
        this.emitChange = emitChange;
    }
    
    public registerOnTouched(_: any): void {
       return;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.$isDisabled = isDisabled;
    }
}
