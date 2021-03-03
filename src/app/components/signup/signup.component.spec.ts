import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IUser } from 'src/app/services/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { changeComponent, getChildComponents, getChildElements } from '../../testing/utility';
import { InputComponent } from '../input/input.component';
import { InputModule } from '../input/input.module';
import { SignupComponent } from './signup.component';

describe('Signup component', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    authenticationService =  {
      signup: jest.fn()
    } as any;

    router = {
      navigateByUrl: jest.fn()
    } as any;

    return TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        InputModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: () => authenticationService,
        },
        {
          provide: Router,
          useFactory: () => router,
        },
      ],
      declarations: [
        SignupComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('can create signup component', () => {
    expect(component).toBeTruthy();
  });

  it('firstNameErrors is bound to first name input error', async () => {
    await changeComponent(fixture, () => {
      jest.spyOn(component, 'firstNameErrors', 'get').mockReturnValue(['error1', 'error2']);
    });
    const firstNameInput = getFirstNameInputComponent();
    expect(firstNameInput.errors).toEqual(['error1', 'error2']);
  });

  it('lastNameErrors is bound to last name input errors', async () => {
    await changeComponent(fixture, () => {
      jest.spyOn(component, 'lastNameErrors', 'get').mockReturnValue(['error1', 'error2']);
    });
    const lastNameInput = getLastNameInputComponent();
    expect(lastNameInput.errors).toEqual(['error1', 'error2']);
  });

  it('emailErrors is bound to email input errors', async () => {
    await changeComponent(fixture, () => {
      jest.spyOn(component, 'emailErrors', 'get').mockReturnValue(['error1', 'error2']);
    });
    const emailnput = getEmailInputComponent();
    expect(emailnput.errors).toEqual(['error1', 'error2']);
  });

  it('passwordErrors is bound to password input errors', async () => {
    await changeComponent(fixture, () => {
      jest.spyOn(component, 'passwordErrors', 'get').mockReturnValue(['error1', 'error2']);
    });
    const passwordInput = getPasswordInputComponent();
    expect(passwordInput.errors).toEqual(['error1', 'error2']);
  });

  it('\'First name is required\' error message will be added to firstNameErrors when no first name', async () => {
    await changeComponent(fixture, () => {
        component.form.markAllAsTouched();
    });
    expect(component.firstNameErrors).toContain('First name is required');
  });

  it('\'Last name is required\' error message will be added to lastNameErrors when no last name', async () => {
    await changeComponent(fixture, () => {
        component.form.markAllAsTouched();
    });
    expect(component.lastNameErrors).toContain('Last name is required');
  });


  it('\'Email is required\' error message will be added to emailErrors when no email', async () => {
    await changeComponent(fixture, () => {
        component.form.markAllAsTouched();
    });
    expect(component.emailErrors).toContain('Email is required');
  });

  it('\'Email has an invalid format\' error message will be added to emailErrors email format is invalid', async () => {
    await changeComponent(fixture, () => {
        component.form.controls.email.setValue('x');
        component.form.markAllAsTouched();
    });
    expect(component.emailErrors).toContain('Email has an invalid format');
  });

  it('\'Password is required\' error message will be added to passwordErrors if no password', async () => {
    await changeComponent(fixture, () => {
        component.form.markAllAsTouched();
    });

    expect(component.passwordErrors).toContain('Password is required');
  });

  it('\'The minimum password length must be 8\' error message will be added to passwordErrors when password length < 8', async () => {
    await changeComponent(fixture, () => {
        component.form.controls.password.setValue('xxxxxxx');
        component.form.markAllAsTouched();
    });

    expect(component.passwordErrors).toContain('The minimum password length must be 8');
  });

  it('\'Password can only contain letters\' error message will be added to passwordErrors ' +
    'when password contains not only letters', async () => {
    await changeComponent(fixture, () => {
        component.form.controls.password.setValue('1');
        component.form.markAllAsTouched();
    });

    expect(component.passwordErrors).toContain('Password can only contain letters');
  });

  it('\'Password cannot contain first or last name\' error message will be added to passwordErrors ' +
    'when password contains first name', async () => {
    await changeComponent(fixture, () => {
        component.form.controls.firstName.setValue('Pietje');
        component.form.controls.password.setValue('PietjetHi');
        component.form.markAllAsTouched();
    });

    expect(component.passwordErrors).toContain('Password cannot contain first or last name');
  });

  it('\'Password cannot contain first or last name\' error message will be added to passwordErrors ' +
    'when password contains last name', async () => {
    await changeComponent(fixture, () => {
      component.form.controls.lastName.setValue('Puk');
      component.form.controls.password.setValue('PukHi');
      component.form.markAllAsTouched();
    });

    expect(component.passwordErrors).toContain('Password cannot contain first or last name');
  });

  it('calling signup will mark all inputs as toched when form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.form, 'markAllAsTouched');
      component.signup();
      expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
  });

  it('calling signup will call AuthenticationService.signup when form is valid', () => {
    const signupSpy = jest.spyOn(authenticationService, 'signup').mockReturnValue(of(null));

    const user: IUser = {
      firstName: 'Pietje',
      lastName: 'Puk',
      email: 'pietjes@puk',
      password: 'xxxxxxxx',
    };
    component.form.setValue(user);

    component.signup();

    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(signupSpy).toHaveBeenNthCalledWith(1, user);
  });

  it('signup will redirect to thanks page when successful', () => {
    jest.spyOn(authenticationService, 'signup').mockReturnValue(of(null));

    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');

    const user: IUser = {
      firstName: 'Pietje',
      lastName: 'Puk',
      email: 'pietjes@puk',
      password: 'xxxxxxxx',
    };
    component.form.setValue(user);

    component.signup();

    expect(navigateByUrlSpy).toHaveBeenCalledTimes(1);
    expect(navigateByUrlSpy).toHaveBeenNthCalledWith(1, 'thanks');
  });

  it('signup will show an alert when something went wromh', () => {
    jest.spyOn(authenticationService, 'signup').mockReturnValue(throwError('Oeps'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => null);

    const user: IUser = {
      firstName: 'Pietje',
      lastName: 'Puk',
      email: 'pietjes@puk',
      password: 'xxxxxxxx',
    };
    component.form.setValue(user);

    component.signup();

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenNthCalledWith(1, 'Oeps something went wrong. Please try again.');
  });

  it('clicking submit button wil call signup', () => {
    const signupSpy = jest.spyOn(component, 'signup');
    const submitButton = getSubmitButtonElement();
    submitButton.click();
    expect(signupSpy).toHaveBeenCalledTimes(1);
  });

  function getFirstNameInputComponent(): InputComponent {
    return getChildComponents(fixture.debugElement, InputComponent)[0];
  }

  function getLastNameInputComponent(): InputComponent {
    return getChildComponents(fixture.debugElement, InputComponent)[1];
  }

  function getEmailInputComponent(): InputComponent {
    return getChildComponents(fixture.debugElement, InputComponent)[2];
  }

  function getPasswordInputComponent(): InputComponent {
    return getChildComponents(fixture.debugElement, InputComponent)[3];
  }

  function getSubmitButtonElement(): HTMLElement {
    return getChildElements(fixture.debugElement, 'button')[0];
  }


});
