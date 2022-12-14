import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@Core/services/auth.service';
import { NotifyService } from '@Core/services/notify.service';
import { delay, Observable, of } from 'rxjs';
import { Routing } from 'src/app/app.routing';
import { TabService } from 'src/app/layout/services/tab.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionRouteGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _router: Router,
    private _tabService: TabService,
    private _routerActive: ActivatedRoute,
    private _routing: Routing
  ) {console.log('787777')}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      //@ts-ignore
    const id = next.data?.id || next.parent?.data?.id;
    if (this._authService.userLogged && this._authService.isLoggedIn) {
      const findPermisionInRouteEnabled = this._routing.getRouteById(id);

      if (findPermisionInRouteEnabled) {
        const permission = this._authService.getPermission(
          findPermisionInRouteEnabled.id
        );

        if (permission && !findPermisionInRouteEnabled.disabled) {
          //@ts-ignore
          switch (next.data?.method) {
            case 'add':
              const route = this._routing.getRouteById(id);
              if (permission.readonly_write) {
                return true;
              } else {
                //@ts-ignore
                return this._router.createUrlTree(route.url, {
                  replaceUrl: true,
                  relativeTo: this._routerActive,
                });
              }
            default:
              return true;
          }
        }
      }
    }
    // if (!isAgreePermission) {
    const messageError = 'It is not possible to access this url';
    this._notifyService.showNotification('warn', messageError);
    if (this._tabService.previusUrl !== null) return false;
    else
    //@ts-ignore
      return of(this._router.createUrlTree(['/'], { replaceUrl: true })).pipe(
        delay(500)
      );

    // return isAgreePermission;
  }
}
