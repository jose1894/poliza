import { Injectable } from '@angular/core';
//import { LoginResult } from '@Core/models/security/loginResult/loginResult.model';
import { AuthService } from '@Core/services/auth.service';
import { filterPermissionsWithRoutes } from '@Shared/helpers/filter-permissions-with-routes';
import { joinRoute } from '@Shared/helpers/join-route';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemRoute } from './core/models/general/navigation/item-route.interface';

/**
 * @Class Routing
 */
@Injectable({
  providedIn: 'root',
})
export class Routing {
  // private _loginResult: LoginResult;
  private static generateSearch = Routing._factorySearchItemRoute();

  private _routesFilterWithPermissions: BehaviorSubject<ItemRoute[]> =
    new BehaviorSubject<ItemRoute[]>([]);

  private constructor(private readonly _authService: AuthService) {
    this._authService.onUserLogged().subscribe((loginResult: any) => {
      if (loginResult !== null) {
        const permissionsIdList = loginResult['loginResultPermissions'].map(
          (permmission: any) => permmission.readonly_permissionId
        );
        const routesAllowed = permissionsIdList.length > 0 ? filterPermissionsWithRoutes(permissionsIdList) : [];
        this._routesFilterWithPermissions.next(
          routesAllowed //loginResult.readonly_routesAllowed
        );
      } else {
        this._routesFilterWithPermissions.next([]);
      }
    });
  }

  public getRoutesWithPermissions() {
    return this._routesFilterWithPermissions.getValue();
  }

  public onGetRoutesWithPermissions(): Observable<ItemRoute[]> {
    return this._routesFilterWithPermissions.asObservable();
  }

  public getPathByIdFormattedString(id: string): string {
    return Routing.getPathByIdFormattedString(
      id,
      this.getRoutesWithPermissions()
    );
  }

  public static getPathByIdFormattedString(
    id: string,
    routesValues: ItemRoute[]
  ): string {
    return joinRoute(Routing.generateSearch(id, routesValues)?.url ?? []);
  }

  /* Retorna la informacion de un children-route por su id */
  public getRouteById(id: string): ItemRoute  {
    return Routing.getRouteById(id, this.getRoutesWithPermissions());
  }

  public static getRouteById(id: string, routesValues: ItemRoute[]): ItemRoute {
    return this.generateSearch(id, routesValues);
  }

  private static _factorySearchItemRoute() {
    const mapper: Map<string, ItemRoute> = new Map();
    return (id: string, routesValues: ItemRoute[]): ItemRoute => {
      if (mapper.has(id)) {
        //@ts-ignore
        return mapper.get(id);
      }

      const result = this._getChildrenByItemNavigation(id, routesValues);

      if (result) {
        mapper.set(id, result);
      }
      //@ts-ignore
      return result;
    };
  }

  // Get Route in Tree by ID
  private static _getChildrenByItemNavigation(
    id: string,
    routesValues: ItemRoute[]
  ): ItemRoute{
    for (const route of routesValues) {
      if (!!route.children) {
        const result = this._getChildrenByItemNavigation(id, route.children);

        if (result) {
          return result;
        }

        continue;
      }

      if (route.id === id) return route;
    }
    //@ts-ignore
    return null;
  }
}
