import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from '@Shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BCThemeSharedModule } from '@BCTheme/shared.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReuseRouteReuseStrategy } from './app.routes-strategy';
import { HttpEncodeParamsInterceptor } from '@Core/interceptors/http-encode-params.interceptor';
import { HttpTokenUserInterceptor } from '@Core/interceptors/http-token-user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    LayoutModule,
    SharedModule,
    BCThemeSharedModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'Window', useValue: window },
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpEncodeParamsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenUserInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: ReuseRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
