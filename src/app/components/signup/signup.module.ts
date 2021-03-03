import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule
    ],
    declarations: [SignupComponent],
    exports: [SignupComponent],
})
export class SignupModule {}
