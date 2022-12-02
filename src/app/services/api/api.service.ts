import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { KeyStorage, StorageService } from '../storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotifyService } from '@Core/services/notify.service';
import { AuthService } from '@Core/services/auth.service';
import { flatMap } from 'lodash';
import { ThemeService } from '@BCTheme/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = environment.server;

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _authService: AuthService,
    private _themeService: ThemeService,
    private _notifyService: NotifyService,
    private _storageService: StorageService) { }

  public get(
    url: string,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .get<any>(this._apiUrl + url, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public post(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .post<any>(this._apiUrl + url, body, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public put(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .put<any>(this._apiUrl + url, body, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public delete(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .request<any>('delete', this._apiUrl + url, {
        body,
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public deleteByParams(
    url: string,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .request<any>('delete', this._apiUrl + url, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  private _handleError(_parent: ApiService, error: any): Observable<never> {
    this._notifyService.showNotification('error', 'server response error');
    return throwError(error);
  }

  private _toStringParams(params: Object): HttpParams {
    let refactoParams: { [key: string]: string } = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        refactoParams[key] = value.toString();
      } else {
        refactoParams[key] = value;
      }
    });

    return new HttpParams({ fromObject: refactoParams });
  }

  public authGuard(): Observable<boolean | UrlTree> {
    if (this._authService.isLoggedIn) {
      return of(true);
    } else if (this._storageService.getValue(KeyStorage.TOKEN)) {
      console.log('storage')
      //return of(true);
      return this.loginByApiKey().pipe(
        map((isLogin: boolean) =>
          isLogin ? true : this._router.parseUrl('/auth/login')
        )
      );
    } else {
      this.logout();
      return of(this._router.parseUrl('/auth/login'));
    }
  }

   /**
   * @name logout
   * @return {void}
   */
    public logout(withNavigate: boolean = true): void {
    this._authService.userLogged = null;
    this._cleanLocalStorageForAuth();

    if (withNavigate) this._router.navigate(['auth/login']);
    // this._storageService.setValue(KeyStorage.USER_DATA, false);
    this._themeService.theme = this._themeService.getColorThemeDefault();
  }

  public loginByApiKey(): Observable<boolean> {
    return this.get('auth/profile').pipe(
      map((res: any) => {
        console.log(this.processLogin(res))
        return this.processLogin(res);
      })
    );
  }

  processLogin(user: any): boolean {
    try {
      this._authService.userLogged = user;
      return true;

    } catch (error) {
      this._cleanLocalStorageForAuth();
      return false;
    }
  }

  private _cleanLocalStorageForAuth() {
    this._storageService.setValue(KeyStorage.TOKEN, false);
    this._storageService.setValue(KeyStorage.IS_LOGGED_IN, false);
  }



  public isAuthenticatedGuard(): Observable<boolean | UrlTree> {
    if (this._authService.isLoggedIn) {
      return of(this._router.parseUrl('/'));
    } else if (this._storageService.getValue(KeyStorage.TOKEN)) {
      return of(this._router.parseUrl('/'));
    } else {
      return of(true);
    }
  }
}
