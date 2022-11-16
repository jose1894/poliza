import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userLogged$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  public get userLogged(): any {
    return this._userLogged$.getValue();
  }

  public set userLogged(userLogged) {
    this._userLogged$.next(userLogged);
    this._isLoggedIn$.next(userLogged !== null ? true : false);
  }

  public onUserLogged(): Observable<any> {
    return this._userLogged$.asObservable();
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  public set isLoggedIn(isLoggedIn) {
    this._isLoggedIn$.next(isLoggedIn);
  }

}
