import { TestBed } from '@angular/core/testing';
import { ThanksComponent } from './thanks.component';

describe('Thanks component', () => {
  let component: ThanksComponent;

  beforeEach(() => {
    return TestBed.configureTestingModule({

      declarations: [
        ThanksComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    const fixture = TestBed.createComponent(ThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('can create thanks component', () => {
    expect(component).toBeTruthy();
  });

});
