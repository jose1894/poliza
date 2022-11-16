import { Injectable } from '@angular/core';
//import { LoginResult } from '@Core/models/security/loginResult/loginResult.model';
import { AuthService } from '@Core/services/auth.service';
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
        this._routesFilterWithPermissions.next(
          loginResult.readonly_routesAllowed
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
  public getRouteById(id: string): ItemRoute | null | undefined  {
    return Routing.getRouteById(id, this.getRoutesWithPermissions());
  }

  public static getRouteById(id: string, routesValues: ItemRoute[]): ItemRoute | null | undefined {
    return this.generateSearch(id, routesValues);
  }

  private static _factorySearchItemRoute() {
    const mapper: Map<string, ItemRoute> = new Map();
    return (id: string, routesValues: ItemRoute[]): ItemRoute | null | undefined => {
      if (mapper.has(id)) {
        return mapper.get(id);
      }

      const result = this._getChildrenByItemNavigation(id, routesValues);

      if (result) {
        mapper.set(id, result);
      }

      return result;
    };
  }

  // Get Route in Tree by ID
  private static _getChildrenByItemNavigation(
    id: string,
    routesValues: ItemRoute[]
  ): ItemRoute | null {
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

    return null;
  }
}
