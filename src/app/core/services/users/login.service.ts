import { Injectable } from '@angular/core';
import { ResetPasswordModel } from '@Core/models/auth/reset-password.model';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

export interface LoginInterface {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _apiService: ApiService
  ) { }

  loginUser(login: LoginInterface): Observable<any> {
    return this._apiService.post('/auth/login', login).pipe(
      map((res: any) => {        
        return res;
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this._apiService.post('/auth/forgot-password', { email : email }).pipe(
      map((res: any) => {        
        return res;
      })
    );
  }

  resetPassword(dataUser: ResetPasswordModel): Observable<any> {
    return this._apiService.post('/auth/reset-password', dataUser).pipe(
      map((res: any) => {        
        return res;
      })
    );
  }
}
