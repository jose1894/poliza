import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@Core/models/user';
import { map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _storageService: StorageService,
    private _httpClient: HttpClient,
    private _apiService: ApiService) { }


  registerUsere(user: User): Observable<any> {
    return this._apiService.post('/auth/register', user).pipe(
      map((res: any) => {        
        return res;
      })
    );
  }

  verificationEmail(tokenApi: string): Observable<any> {
    this._storageService.setValue(
      KeyStorage.TOKEN,
      tokenApi,
      false
    );
    return this._apiService.post('auth/email/verification-notification', null).pipe(
      map((res: any) => {        
        return res;
      })
    )
  }

}
