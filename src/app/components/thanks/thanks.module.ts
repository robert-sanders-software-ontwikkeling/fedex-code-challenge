import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThanksComponent } from './thanks.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ThanksComponent],
    exports: [ThanksComponent],
})
export class ThanksModule {}
