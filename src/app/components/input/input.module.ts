import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [InputComponent],
    exports: [InputComponent],
})
export class InputModule {}

