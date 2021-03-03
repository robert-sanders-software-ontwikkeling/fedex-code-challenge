import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SignupModule } from './components/signup/signup.module';
import { ThanksComponent } from './components/thanks/thanks.component';
import { ThanksModule } from './components/thanks/thanks.module';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signup'  },
    { path: 'signup', component: SignupComponent},
    { path: 'thanks',  component: ThanksComponent},
    { path: '**', redirectTo: 'signup' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        SignupModule,
        ThanksModule
    ],
    providers: [
        AuthenticationService
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
