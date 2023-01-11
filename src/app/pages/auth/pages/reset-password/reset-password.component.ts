import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '@Core/services/users/login.service';
import { CustomModalDialogComponent } from '@Shared/component/dialog/custom-dialog/custom-dialog.component';
import { ApiService } from 'src/app/services/api/api.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public checked = true;
  public resetForm: FormGroup;
  public resetFormErrors: any;
  public user: string = '';
  public password: string = '';
  public rememberUser = true;
  public images: any[] = [];
  public itemList: any[] = [];
  public noVisible: boolean = false;
  public showLoadBar: boolean = false;
  public hide: boolean = true;
  public hideCpassword: boolean = true;
  public token: string = '';

  constructor(
    private _router: Router,
    private _modal: MatDialog,
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _routeActive: ActivatedRoute,
    private _storageService: StorageService,
  ) {

    this.token = this._routeActive.snapshot.paramMap?.get('token') || '';
    this.resetFormErrors = {
      email: {},
      password: {},
      password_confirmation: {}
    };
    const email = this._storageService.getValue(KeyStorage.IS_EMAIL_RESET_PASSWORD)
    this.resetForm = this.formBuilder.group({
      token: [this.token],
      email: [(email) ? email : '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });

    this.resetForm.valueChanges.subscribe(() => {
      this._onLoginFormValuesChanged();
    });
  }

  ngOnInit(): void { }

  private _onLoginFormValuesChanged(): void {
    for (const field in this.resetFormErrors) {
      if (!this.resetFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.resetFormErrors[field] = {};

      // Get the control
      const control = this.resetForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.resetFormErrors[field] = control.errors;
      }
    }
  }

  reset() {
    this.showLoadBar = true;
    this._loginService.resetPassword(this.resetForm.value).subscribe((result: any) => {
      const message = result?.message || '';
      message === 'Password reset successfully' && this.openDialogMessage(message)

    }, error => { console.log(error); this.showLoadBar = false;})
  }

  openDialogMessage(messageChange: string) {
    const dialogRef = this._modal.open(CustomModalDialogComponent, {
      disableClose: true,
      width: '350px',
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
    dialogRef.afterClosed().subscribe((result: any) => {
      this._storageService.setValue(KeyStorage.TOKEN, false);
      this._storageService.setValue(KeyStorage.IS_LOGGED_IN, false);
      this._router.navigate(['auth/login'])
    });
  }

}
