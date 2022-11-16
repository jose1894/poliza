import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, LoginInterface } from '@Core/services/users/login.service';
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
  public loginFormErrors: any;
  public user: string = '';
  public password: string = '';
  public rememberUser = true;
  public images: any[] = [];
  public itemList: any[] = [];
  public noVisible: boolean = false;
  public logoBrickcontrol: string = '';
  public showLoadBar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _apiService: ApiService,
    private _storageService: StorageService,
    private _loginService: LoginService
  ) {

    this.loginFormErrors = {
      email: {},
      password: {},
    };

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [true],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this._onLoginFormValuesChanged();
    });

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

  login() {
    const {rememberUser, ...data} = this.loginForm.value;
    this._loginService.loginUser(data).subscribe((resp:any) => {
      const { accessToken, user } = resp;
      const dataUser = this._apiService.processLogin(user);
      if(dataUser) {
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

}
