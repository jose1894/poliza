import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@Core/services/auth.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

@Injectable()
export class HttpTokenUserInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const request = req;

    const requestAuthorization = request.clone({
      headers: this._createAuthorizationHeader(),
    });

    return next.handle(requestAuthorization);
  }

  private _createAuthorizationHeader(): HttpHeaders {
    let token: string = '';
    if (this._authService.userLogged != null) {
      token = this._authService.userLogged.readonly_apiKey;
    } else {
      token = this._storageService.getValue(KeyStorage.TOKEN, false);
      // token = Crypto.decrypt(tokenEncrypted);
    }

    if (token !== '') {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      return new HttpHeaders();
    }
  }
}
