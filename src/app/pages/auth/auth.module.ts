import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@Shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { BCThemeSharedModule } from '@BCTheme/shared.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BCThemeSharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthModule { }
