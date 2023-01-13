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
    return this.get('/auth/profile').pipe(
      map((res: any) => {
        return this.processLogin(res);
      })
    );
  }

  processLogin(user: any): boolean {
    try {
      user['loginResultPermissions'] = [
        {
            "readonly_permissionId": "P01",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "PS010101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        /*{
            "readonly_permissionId": "B010103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B010104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B02",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B020101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B020102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B020103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B04",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0401",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040201",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040202",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040203",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040204",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040206",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040207",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B040208",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B03",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0302",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030201",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030202",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B030301",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B05",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050107",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050108",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050110",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050106",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050105",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070402",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050109",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B050111",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [
                {
                    "readonly_functionId": "B050111",
                    "readonly_specialPermissionId": 13,
                    "readonly_description": "Delete completly amortization by project",
                    "readonly_type": "Allow",
                    "readonly_scope": "Public",
                    "readonly_longDescription": "Can delete completly period amortization by project",
                    "persistenceState": "Unchanged"
                }
            ],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B059900101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [
                {
                    "readonly_functionId": "B059900101",
                    "readonly_specialPermissionId": 13,
                    "readonly_description": "Delete completly amortization by project",
                    "readonly_type": "Allow",
                    "readonly_scope": "Public",
                    "readonly_longDescription": "Can delete completly period amortization by project",
                    "persistenceState": "Unchanged"
                },
                {
                    "readonly_functionId": "B059900101",
                    "readonly_specialPermissionId": 14,
                    "readonly_description": "Generate amortization by group of projects",
                    "readonly_type": "Allow",
                    "readonly_scope": "Public",
                    "readonly_longDescription": "Can generate amortization by group of projects",
                    "persistenceState": "Unchanged"
                },
                {
                    "readonly_functionId": "B059900101",
                    "readonly_specialPermissionId": 15,
                    "readonly_description": "Delete last period amortization by group of projects",
                    "readonly_type": "Allow",
                    "readonly_scope": "Public",
                    "readonly_longDescription": "Can delete last period amortization by group of projects",
                    "persistenceState": "Unchanged"
                },
                {
                    "readonly_functionId": "B059900101",
                    "readonly_specialPermissionId": 16,
                    "readonly_description": "Delete completly amortization by group of projects",
                    "readonly_type": "Allow",
                    "readonly_scope": "Public",
                    "readonly_longDescription": "Can delete completly amortization by group of projects",
                    "persistenceState": "Unchanged"
                }
            ],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B06",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0601",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0602",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060201",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B060202",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B11",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B110101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B110102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B110103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B110104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B110105",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B1101051",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B1101052",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B1101053",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B1101054",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B12",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B120101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B120102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B120103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B120104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0701",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0702",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070201",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070202",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0703",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070301",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0704",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070401",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0706",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070600",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070601",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07060101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07060102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07060103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070602",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07060201",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B07060202",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0707",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070701",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070702",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0708",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070802",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B070801",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B08",
            "readonly_type": "Module",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0801",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080101",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080102",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080103",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080104",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080105",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B0803",
            "readonly_type": "Folder",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        },
        {
            "readonly_permissionId": "B080301",
            "readonly_type": "Item",
            "readonly_read": true,
            "readonly_write": true,
            "readonly_edit": true,
            "readonly_delete": true,
            "readonly_specialPermissions": [],
            "persistenceState": "Unchanged"
        }*/
    ];
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
