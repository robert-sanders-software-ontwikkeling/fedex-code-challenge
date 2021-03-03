import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    public readonly form: FormGroup;
    private $signingUp = false;
    private readonly errorMessages = {
        firstName: {
            required: 'First name is required'
        },
        lastName: {
            required: 'Last name is required'
        },
        email: {
            required: 'Email is required',
            email: 'Email has an invalid format'
        },
        password: {
            required: 'Password is required',
            minlength: 'The minimum password length must be 8',
            pattern: 'Password can only contain letters',
            withFirstOrLasttName: 'Password cannot contain first or last name'
        }
    };

    constructor(
        formBuilder: FormBuilder,
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router) {

        this.form = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^[a-zA-Z]+$/),
                this.passwordIncludeFirstOrLastName]
            ],
        });
    }

    public get firstNameErrors(): ValidationErrors {
        return  this.getErrors('firstName');
    }

    public get lastNameErrors(): ValidationErrors {
        return  this.getErrors('lastName');
    }

    public get emailErrors(): ValidationErrors {
        return  this.getErrors('email');
    }

    public get passwordErrors(): ValidationErrors {
        return  this.getErrors('password');
    }

    public get signingUp(): boolean {
        return this.$signingUp;
    }

    public signup(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.$signingUp = true;
        this.authenticationService.signup(this.form.value).subscribe(
            () => this.router.navigateByUrl('thanks'),
            () => {
                this.$signingUp = false;
                window.alert('Oeps something went wrong. Please try again.');
            }
        );
    }

    private get firstName(): string {
        return this.form.controls.firstName.value;
    }

    private get lastName(): string {
        return this.form.controls.lastName.value;
    }

    private get password(): string {
        return this.form.controls.password.value;
    }

    private passwordIncludeFirstOrLastName = (): ValidationErrors => {
        if (!this.form) {
            return;
        }
        if (this.passwordContainsText(this.firstName) || this.passwordContainsText(this.lastName)) {
            return { withFirstOrLasttName: true};
        }
        return null;
    }

    private passwordContainsText(text: string): boolean {
        return text && this.password.toLowerCase().includes(text.toLowerCase());
    }

    private getErrors(controlName: string): string[]{
        if (!this.hasErrors(controlName)) {
            return [];
        }
        const control = this.form.controls[controlName];
        return Object
            .keys(control.errors)
            .map(error => this.errorMessages[controlName][error]);
    }

    private hasErrors(controlName: string): boolean {
        if (!this.form.invalid) {
            return false;
        }
        const control = this.form.controls[controlName];
        return control.invalid && (control.touched || control.dirty);
    }
}
