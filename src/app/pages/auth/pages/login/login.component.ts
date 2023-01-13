import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '@Core/services/users/login.service';
import { CustomModalDialogComponent } from '@Shared/component/dialog/custom-dialog/custom-dialog.component';
import { ApiService } from 'src/app/services/api/api.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public checked = true;
  public loginForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  public loginFormErrors: any;
  public loginforgotPasswordFormErrors: any;
  public user: string = '';
  public password: string = '';
  public rememberUser = true;
  public images: any[] = [];
  public itemList: any[] = [];
  public noVisible: boolean = false;
  public logoBrickcontrol: string = '';
  public showLoadBar: boolean = false;
  public optioForgotPassword: boolean = false;

  constructor(
    private _router: Router,
    private _modal: MatDialog,
    private _apiService: ApiService,
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _storageService: StorageService,
  ) {

    this.loginFormErrors = {
      email: {},
      password: {},
    };

    this.loginforgotPasswordFormErrors = {
      email: {}
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [true],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this._onLoginFormValuesChanged();
    });

    this.forgotPasswordForm.valueChanges.subscribe(() => {
      this._onForgotPasswordFormValuesChanged();
    })

  }

  ngOnInit(): void {
    if (this._storageService.getValue(KeyStorage.TOKEN)) {
      console.log('existe tokennnn')
      //this._apiService.loginByApiKey();
    }

  }

  private _onLoginFormValuesChanged(): void {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);
      
      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  private _onForgotPasswordFormValuesChanged(): void {
    for (const field in this.loginforgotPasswordFormErrors) {
      if (!this.loginforgotPasswordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginforgotPasswordFormErrors[field] = {};

      // Get the control
      const control = this.loginforgotPasswordFormErrors.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginforgotPasswordFormErrors[field] = control.errors;
      }
    }

  }

  login() {
    const { rememberUser, ...data } = this.loginForm.value;
    this._loginService.loginUser(data).subscribe((resp: any) => {
      const { accessToken, user } = resp;
      const dataUser = this._apiService.processLogin(user);
      if (dataUser) {
        this._storageService.setValue(
          KeyStorage.TOKEN,
          accessToken,
          false
        );
        this.loginForm.reset();
        this._router.navigate(['/']);
      }
    }, error => {
      console.log(error);
    });
  }

  forgotPassword() {
    this.optioForgotPassword = true;
  }

  sendEmailForgotPassword() {
    const control = this.forgotPasswordForm.get('email');
    this.showLoadBar = true;
    if (control?.value) {
      this._loginService.forgotPassword(control.value).subscribe(
        (resp: any) => {
          const value = resp?.status || '';
          value === 'We have emailed your password reset link!' && this.openDialogMessage(`Check your email ${control.value}`, control.value);
        }, error => { console.log(error) }
      )
    } else {
      this.forgotPasswordForm?.get('email')?.markAsTouched();
      this.loginforgotPasswordFormErrors['email'] = control?.errors || '';
    }
    this.showLoadBar = false;
  }

  openDialogMessage(messageChange: string, email: string) {
    const dialogRef = this._modal.open(CustomModalDialogComponent, {
      disableClose: true,
      width: '450px',
      data: {
        type: 'info',
        message: messageChange,
        buttons: {
          no: false,
          yes: false,
          cancel: false,
          ok: true,
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this._storageService.setValue(
        KeyStorage.IS_EMAIL_RESET_PASSWORD,
        email,
        false
      );
      this._storageService.setValue(KeyStorage.TOKEN, false);
      this._storageService.setValue(KeyStorage.IS_LOGGED_IN, false);
      this.optioForgotPassword = false;
    });
  }

}
