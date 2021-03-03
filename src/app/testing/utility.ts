import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function changeComponent<T>(fixture: ComponentFixture<T>, action: () => void): Promise<void> {
    action();
    fixture.detectChanges();
    return fixture.whenStable();
}


export function getChildElements<T extends HTMLElement>(
    debugElement: DebugElement,
    selector: string): T[] {

    return debugElement.queryAll(By.css(selector)).map(de => de.nativeElement);
}

export function getChildComponents<T>(
    debugElement: DebugElement,
    componentType: new() => T): T[] {

    return debugElement.queryAll(By.directive(componentType)).map(de => de.componentInstance);
}
