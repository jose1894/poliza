import {
    RouteReuseStrategy,
    DetachedRouteHandle,
    ActivatedRouteSnapshot,
    ActivatedRoute,
    RouterOutlet,
    OutletContext,
  } from '@angular/router';
  import { ComponentRef, Directive, Input } from '@angular/core';
  /** Interface for object which can store both:
   * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
   * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
   */
  interface RouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
  }
  export class ReuseRouteReuseStrategy implements RouteReuseStrategy {
    private _handlers: { [key: string]: RouteStorageObject } = {};
    
  
    public get handlers() {
      return this._handlers;
    }
  
    /** Preguntamos si la Ruta va a ser Almacenada */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {  
      if (!route.routeConfig || route.routeConfig.loadChildren) {
        return false;
      }
      /** Whether this route should be re used or not */
      // let shouldReuse = false;
  
      if (
        route.routeConfig?.data?.['reuseRoute'] &&
        typeof route.routeConfig.data['reuseRoute']=== 'boolean'
      ) {
        return route.routeConfig.data['reuseRoute'];
      }
      return false;
    }
    // Se almacena la ruta en el Store
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      if (handle) {
        const storedRoute: RouteStorageObject = {
          snapshot: route,
          handle: handle,
        };
        this._handlers[this.getIdentify(route)] = storedRoute;
      } else if (this._handlers[this.getIdentify(route)]) {
        delete this._handlers[this.getIdentify(route)];
      }
    }
    /** Preguntamos si existe la ruta en el store para volver
     * a colocar el estado en el que estaba */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return !!this._handlers[this.getIdentify(route)];
    }
  
    /** Devolvemos la ruta almacenada previamente  */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
      const key: string = this.getIdentify(route);
  
      const handler = this.handlers[key];
      if (handler) {
        const keyWithChildrenBefore = this.getIdentify(handler.snapshot, true);
        const keyWithChildrenCurrent = this.getIdentify(route, true);
  
        if (keyWithChildrenBefore !== keyWithChildrenCurrent) {
          this.destroyHandle(key);
        }
      }
  
      if (
        !route.routeConfig ||
        route.routeConfig.loadChildren ||
        !this.handlers[this.getIdentify(route)]
      ) {
        return null;
      }
      return this.handlers[this.getIdentify(route)].handle;
    }  
    /** Determina si una ruta debe reutilizarse */
    shouldReuseRoute(
      before: ActivatedRouteSnapshot,
      current: ActivatedRouteSnapshot
    ): boolean {
      return before.routeConfig === current.routeConfig;
    }
  
    /**
     * Returns a url for the current route
     * @param route
     */
    private getIdentify(
      route: ActivatedRouteSnapshot,
      withChildren: boolean = false
    ): string {
      /** The url we are going to return */
      let url =
        route.pathFromRoot.map((it) => this.routeToUrl(it)).join('/') + '*';
      if (withChildren) {
        url += route.children.map((cr) => this.getChildRouteKeys(cr));
      }
      return url + '*' + (!!route.data?.['id'] ? route.data?.['id'] : '');
    }
    private routeToUrl(route: ActivatedRouteSnapshot): string {
      if (route.url) {
        if (route.url.length) {
          return route.url.join('/');
        } else {
          if (typeof route.component === 'function') {
            return `[${route.component.name}]`;
          } else if (typeof route.component === 'string') {
            return `[${route.component}]`;
          } else {
            return `[AppComponent]`;
          }
        }
      } else {
        return '(null)';
      }
    }
  
    private getChildRouteKeys(route: ActivatedRouteSnapshot): string {
      let url = this.routeToUrl(route);
      return route.children.reduce(
        (fin, cr) => (fin += this.getChildRouteKeys(cr)),
        url
      );
    }
    /**
     * Clearing / Destorying all handles
     */
    public clearHandles() {
      for (const key in this._handlers) {
        this.destroyHandle(key);
      }
      this._handlers = {};
    }
    /**
     * Destroying a handle
     * @param handle
     */
    private destroyHandle(keyHandle: string): void {
      const handle: DetachedRouteHandle = this.handlers[keyHandle]?.handle;
  
      if (handle) {
        //@ts-ignore
        const componentRef: ComponentRef<any> = handle['componentRef'];
        delete this._handlers[keyHandle];
        // }
        //@ts-ignore
        const contexts: Map<string, OutletContext> = handle['contexts'];
        const values: Array<OutletContext> = Array.from(contexts.values());
        values.forEach((context: OutletContext) => {
          if (context.outlet) {
            // Destroy the component
            context.outlet.deactivate();
            // Destroy the contexts for all the outlets that were in the component
            context.children.onOutletDeactivated();
          }
        });
        if (componentRef.instance.ngOnDestroy) {
          componentRef.instance.ngOnDestroy();
        }
      }
    }
  
    /**
     * closePage
     */
    public closePage(idPage: string): void {
      const key: string | undefined = Object.keys(this.handlers).find((key: string) =>
        key.includes(idPage)
      );
      key !== undefined && this.destroyHandle(key);
    }
  }
  
  export interface OnAttach {
    /**
     * A callback method that is invoked when the RouteReuseStrategy instructs
     * to re-attach a previously detached component / subtree
     */
    onAttach(activatedRoute: ActivatedRoute): void;
  }
  export interface OnDetach {
    /**
     * A callback method that is invoked when the RouteReuseStrategy instructs
     * to detach component / subtree
     */
    onDetach(): void;
  }
  
  export interface OnBeforeDestroy {
    onBeforeDestroy(): Promise<boolean>;
  }
  
  @Directive({
    selector: 'static-router-outlet',
  })
  export class AppRouterOutletDirective extends RouterOutlet {
    //@ts-ignore
    detach(): ComponentRef<any> {
      const instance: any = this.component;
      if (instance && typeof instance.onDetach === 'function') {
        instance.onDetach();
      }
      return super.detach();
    }
    //@ts-ignore
    attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute): void {
      super.attach(ref, activatedRoute);
      if (ref.instance && typeof ref.instance.onAttach === 'function') {
        ref.instance.onAttach(activatedRoute);
      }
    }
  }
  