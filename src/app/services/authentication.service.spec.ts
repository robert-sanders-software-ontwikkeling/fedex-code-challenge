import { HttpClient } from '@angular/common/http';
import { IUser } from './authentication.model';
import { AuthenticationService } from './authentication.service';

describe('Authentication service', () => {
    let authenticationService: AuthenticationService;
    let httpClient: HttpClient;
    let user: IUser;


    beforeEach(() => {
        const settings = {
            authServiceUrl: 'https://test'
        };
        httpClient = {
            post: jest.fn()
        } as any;
        authenticationService = new AuthenticationService(settings, httpClient);

        user = {
            firstName: 'Pietje',
            lastName: 'Puk',
            email: 'pietjes@puk',
            password: 'xxxxxxxx',
        };
    });

    it('calling signup will create a post request correctly', () => {
        const postSpy = jest.spyOn(httpClient, 'post');
        authenticationService.signup(user);
        expect(postSpy).toHaveBeenCalledTimes(1);
        expect(postSpy).toHaveBeenNthCalledWith(1, 'https://test', user);
    });
});
