import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@Core/models/user';
import { NotifyService } from '@Core/services/notify.service';
import { RegisterService } from '@Core/services/users/register.service';
import { CustomModalDialogComponent } from '@Shared/component/dialog/custom-dialog/custom-dialog.component';
import { flatMap, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

const StatusEmail: object = {
  VERIFICATION_LINK_SENT: 'verification-link-sent',
  EMAIL_ALREADY_VERIFIED: 'Email already verified',
  EMAIL_HAS_BEEN_VERIFIED: 'Email has been verified',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public checked = true;
  public registerForm: FormGroup;
  public registerFormErrors: any;
  public user: string = '';
  public password: string = '';
  public rememberUser = true;
  public images: any[] = [];
  public itemList: any[] = [];
  public noVisible: boolean = false;
  public logoBrickcontrol: string = '';
  public showLoadBar: boolean = false;
  public hide: boolean = true;
  public hideCpassword: boolean = true;

  constructor(
    private _router: Router,
    private _modal: MatDialog,
    private formBuilder: FormBuilder,
    private _apiService: ApiService,
    //private _notifyService: NotifyService,
    private _storageService: StorageService,
    private _registerService: RegisterService,
  ) {

    this.registerFormErrors = {
      firstName: {},
      lastName: {},
      userName: {},
      email: {},
      password: {},
      CPassword: {}
    };

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      CPassword: ['', Validators.required],
      rememberUser: [true],
    });
    this.registerForm.valueChanges.subscribe(() => {
      this._onRegisterFormValuesChanged();
    });
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    /*if (this._storageService.getValue(KeyStorage.TOKEN)) {
      this._apiService.loginByApiKey();
    }*/
  }

  private _onRegisterFormValuesChanged(): void {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }

  login() {
    const { CPassword, email, firstName, lastName, password, userName } = this.registerForm.value;
    const data: User = {
      nombre: firstName,
      apellido: lastName,
      username: userName,
      email: email,
      password: password,
      c_password: CPassword,
    }
    this.showLoadBar = true;
    this._registerService.registerUsere(data).pipe(
      flatMap((user) => this._registerService.verificationEmail(user.accessToken))
    ).subscribe((resp: any) => {
      const status = resp?.status || '';
      if (status !== '' && Object.values(StatusEmail).includes(status)) {
        this.openDialogMessage(status);
      } else {
        this.showLoadBar = false;
      }
    }, error => { 
      this.showLoadBar = false;
    })
  }

  openDialogMessage(messageChange: string) {
    const dialogRef = this._modal.open(CustomModalDialogComponent, {
      disableClose: true,
      width: '300px',
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
      this._storageService.setValue(KeyStorage.TOKEN, false);
      this._storageService.setValue(KeyStorage.IS_LOGGED_IN, false);
      this._router.navigate(['/auth/login']);
      this.showLoadBar = false;
    });
  }

}
