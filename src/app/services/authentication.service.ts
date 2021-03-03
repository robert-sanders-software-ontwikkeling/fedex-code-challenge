import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationSettings, APPLICATION_SETTINGS } from '../app.model';
import { IUser } from './authentication.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        @Inject(APPLICATION_SETTINGS)
        private readonly appSettings: ApplicationSettings,
        private readonly http: HttpClient
    ) {}

    public signup(user: IUser): Observable<any> {
        return this.http.post(this.appSettings.authServiceUrl, user);
    }
}
