import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APPLICATION_SETTINGS } from './app.model';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APPLICATION_SETTINGS,
      useFactory: () => environment
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
