import { moveItemInArray } from '@angular/cdk/drag-drop';
import { LocationStrategy } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NavigationEnd,
  Params,
  Router,
  RouteReuseStrategy,
} from '@angular/router';
import { TabNavigation } from '@Core/models/general/navigation/tab-navigation.interface';
import { ROUTES } from '@Core/routes/routes';
import { CustomModalDialogComponent } from '@Shared/component/dialog/custom-dialog/custom-dialog.component';
import { decodeParams } from '@Shared/helpers/replace-uri';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReuseRouteReuseStrategy } from 'src/app/app.routes-strategy';
import { ItemRoute } from '../../core/models/general/navigation/item-route.interface';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private _tabs: BehaviorSubject<{ [id: string]: TabNavigation }> =
    new BehaviorSubject<{
      [id: string]: TabNavigation;
    }>({});
  private _selectedTabId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );
  private _previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  private _tabsWillDeteled: TabNavigation[] = [];

  constructor(
    @Inject('Window') private _window: Window,
    @Inject(RouteReuseStrategy)
    private _routeReuseStrategy: ReuseRouteReuseStrategy,
    private _router: Router,
    private _modal: MatDialog,
    private _locationStrategy: LocationStrategy
  ) {
    /* Inicializo el arreglo con la ruta con la que arranco */
    this.create(this._window.location.pathname);

    // console.log(this._router.routerState);

    /** Comentado por pruebas */
    this._locationStrategy.onPopState(() => {
      //@ts-ignore
      history.pushState(null, null, this._window.location.href);
    });

    /* Escucha el evento del Router "NavigationEnd" para agregar nuevos tabs al array */
    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._setPreviusUrl(event.url);
        /** Comentado por pruebas */
        //@ts-ignore
        history.pushState(null, null, event.url);
        /* Elimina los tabs que se tengan que eliminar despues que se haya trasladado a otra ruta */
        this.deleteInArrayTabs();
        /* Verifica que las siguientes rutas se deberia de limpiar los tabs ya que no deberian de crearse uno a partir de esta ruta
        sino, se crea un tab */
        if (event.url === '/auth/login' || event.url === '/') {
          this.cleanTabs();
        } else {
          this.create(event.url.toString());
        }
      });
  }

  public get tabs(): TabNavigation[] {
    return Object.assign([], this._getArrayFromObject(this._tabs.getValue()));
  }

  public get tabsObject(): { [id: string]: TabNavigation } {
    return this._tabs.getValue();
  }

  public onTabs(): Observable<TabNavigation[]> {
    return this._tabs
      .asObservable()
      .pipe(map((tabs) => this._getArrayFromObject(tabs)));
  }

  public get previusUrl(): string | null{
    return this._previousUrl.getValue();
  }
  private _setPreviusUrl(previusUrl: string) {
    this._previousUrl.next(previusUrl);
  }
  public onPreviusUrl(): Observable<string | null> {
    return this._previousUrl.asObservable();
  }

  public get selectedTabId(): string | null {
    return this._selectedTabId.getValue();
  }

  public set selectedTabId(index) {
    this._selectedTabId.next(index);
  }

  public onSelectedTabId(): Observable<string | null> {
    return this._selectedTabId.asObservable();
  }

  public changeOrderTabs(previousIndex: any, newIndex: any) {
    let tabs = this.tabs;
    moveItemInArray(tabs, previousIndex, newIndex);

    const orderingTabs = this._getObjectFromArray(tabs);
    this._tabs.next(orderingTabs);
    if (this.selectedTabId === previousIndex) {
      this.selectedTabId = newIndex;
    }
  }


  
  /**
   * removen
   */
  public async remove(id: string) {
    // console.log(this._applicationRef.components);
    // let tabs = this._tabs$.getValue();

    /* Obttengo el index y el objeto Tab del tab a eliminar */
    let tabDelete: { index: number; tab: TabNavigation } =
      this.getTabDelete(id);

    /* Se verifica que se puede eliminar el tab */
    let canDelete: boolean = true || undefined;

    //console.log(tabDelete);
    if (
      tabDelete.tab.changesEdit.saveOnExit &&
      tabDelete.tab.changesEdit.haveChangesPending
    ) {
      const messageChange = 'Do you want to save the changes?';

      const dialogRef = this._modal.open(CustomModalDialogComponent, {
        disableClose: true,
        width: '480px',
        data: {
          type: 'question',
          message: messageChange,
          buttons: {
            no: true,
            yes: true,
            cancel: true,
            ok: false,
          },
        },
      });
      //@ts-ignore
      canDelete = await dialogRef
        .afterClosed()
        .toPromise()
        .then(async (result) => {
          switch (result.type) {
            case 'cancel':
              return false;
            // return ResultConfirmExitDialog.CANCEL;
            case 'no':
              return true;
            // return ResultConfirmExitDialog.NO;
            case 'yes':
              const response: boolean = await new Promise<boolean>(
                async (resolve, reject) => {
                  const { saveFunction } = tabDelete.tab.changesEdit;
                  if (!saveFunction) {
                    resolve(false);
                  }
                  await saveFunction();
                  resolve(true);
                }
              );

              return response;
            default:
              return false;
          }
        });
    }

    if (canDelete) {
      // debugger
      /* Obtiene de nuevo el tab que se va a eliminar ya que es posible que se haya hecho focus y cambiado de index */
      tabDelete = this.getTabDelete(id);
      //@ts-ignore
      const tabSelected = this.getTabDelete(this.selectedTabId);
      /*
       * Si solo queda un Tab abierto, al eliminarlo se devuelve Home
       */
      if (this.tabs.length == 1) {
        this.selectedTabId = null;
        this._tabsWillDeteled.push(tabDelete.tab);
        this._router.navigate(['/']);

        // this._tabs$.next({});
      } else if (this.tabs.length >= 2) {
        //@ts-ignore        
        let nextTabID: TabNavigation = null;
        if (tabDelete.tab.id === this.selectedTabId) {
          /* Si esta de ultimo en el arreglo */
          if (tabSelected.index === this.tabs.length - 1) {
            //@ts-ignore
            nextTabID = this.tabs.find(
              (tab: TabNavigation, i: number) => i === tabDelete.index - 1
            );

            /* Si el Tab no es el ultimo del arrelglo */
          } else if (tabDelete.index < this.tabs.length - 1) {
            //@ts-ignore
            nextTabID = this.tabs.find(
              (tab: TabNavigation, i: number) => i === tabDelete.index + 1
            );
          }
          this._tabsWillDeteled.push(tabDelete.tab);
          this.selectedTabId = nextTabID.id.toString();
          const { queryParams, urlDecode } = this._decodeUrlInternalRouter(
            nextTabID.pathURL
          );
          this._router.navigate(['/', ...urlDecode], {
            queryParams,
          });
        } else {
          this._tabsWillDeteled.push(tabDelete.tab);
          this.deleteInArrayTabs();
        }
      }
    }
  }

  private getTabDelete(id: string): { index: number; tab: TabNavigation } {
    return {
      index: this.tabs.findIndex((tab: TabNavigation) => tab.id === id),
      /* Tab a eliminar */
      //@ts-ignore
      tab: this.tabs.find((tab: TabNavigation) => tab.id === id),
    };
  }

  /**
   * create
   */
  public create(pathURL: string) {
    //@ts-ignore
    const itemNavigation: ItemRoute = this._getItemNavigationByURL(
      ROUTES,
      pathURL
    );
    //console.log(itemNavigation)
    if (pathURL === '/') {
      return;
    }

    /* Si la ruta esta disponible en el archivo de configuracion de rutas con permisos */
    if (itemNavigation !== null && itemNavigation !== undefined) {
      const { id, title, titleTab, saveOnExit } = itemNavigation;
      const tabs = this._tabs.getValue();
      const newTabs: { [id: string]: TabNavigation } = {
        ...tabs,
        [id]: {
          id,
          title: titleTab ?? title,
          itemNavigation,
          pathURL,
          changesEdit: {
            saveOnExit: saveOnExit ? true : false,
            haveChangesPending:
              tabs[id]?.changesEdit?.haveChangesPending || false,
            saveFunction: tabs[id]?.changesEdit?.saveFunction || null,
          },
        },
      };

      this._tabs.next(newTabs);
      this.selectedTabId = id.toString();
    }
  }

  
  public patchChangesEditAtRoute(
    pathURL: string,
    haveChanges: boolean,
    //@ts-ignore
    saveFunction: CallableFunction = null
  ) {
    //@ts-ignore
    const itemNavigation: ItemRoute = this._getItemNavigationByURL(
      ROUTES,
      pathURL
    );
    if (itemNavigation !== null && itemNavigation !== undefined) {
      if (itemNavigation.saveOnExit) {
        const tabs: { [x: string]: TabNavigation } = this._tabs.getValue();

        const newTabs = {
          ...tabs,
          [itemNavigation.id]: {
            ...tabs[itemNavigation.id],
            changesEdit: {
              saveOnExit: true,
              haveChangesPending: haveChanges,
              saveFunction:
                saveFunction ||
                tabs[itemNavigation.id]?.changesEdit?.saveFunction ||
                null,
            },
          },
        };
        this._tabs.next(newTabs);
      }
    }
  }

  /**
   * cleanTabs
   */
  public cleanTabs() {
    this._tabs.next({});
    this._routeReuseStrategy.clearHandles();
  }

  private _getItemNavigationByURL(
    itemsNavigation: ItemRoute[],
    pathURL: string
  ): ItemRoute | null {
    for (const item of itemsNavigation) {
      if (item.type === 'collapsable') {
        if (item.children) {
          const result = this._getItemNavigationByURL(item.children, pathURL);
          if (result !== null) {
            return result;
          }
        }
      } else if (item.type === 'item') {
        // const urlIsReport: boolean = pathURL.includes('/report');
        const paths: string[] = item.url?.filter(Boolean) ?? [''];
        // Valido que el item que itera es un reporte al igual que la url que esta llegando por parametros
        const pathURLSegment = pathURL.split('/').filter(Boolean);
        if (this._searchItemCoincidenceWithPaths(paths, pathURLSegment)) {
          return item;
        } else {
          continue;
        }
      }
    }

    return null;
  }

  private _escapeRegExp(stringToGoIntoTheRegex: string) {
    if (stringToGoIntoTheRegex) {
      return _.escapeRegExp(stringToGoIntoTheRegex);
    }
    return '';
  }

  private _searchItemCoincidenceWithPaths(
    pathsItem: string[],
    pathsExternals: string[]
  ): boolean {
    for (let i = 0; i < pathsItem.length; i++) {
      const path = pathsItem[i];
      const stringToGoIntoTheRegex = this._escapeRegExp(pathsExternals[i]);
      const regex = new RegExp(stringToGoIntoTheRegex, 'm');
      if (!path.match(regex)) {
        return false;
      }
    }

    return true;
  }

  private _decodeUrlInternalRouter(path: string) {
    const [url, params] = path.split('?');
    const uri = url.split(/\//).filter((value) => value !== '');
    const urlDecode = decodeParams(...uri);

    let queryParams: Params = {};
    if (params) {
      const httpParams = new HttpParams({ fromString: params });

      queryParams = httpParams
        .keys()
        .map((x) => ({ [x]: httpParams.get(x) }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    }

    return {
      queryParams,
      urlDecode,
    };
  }

  public goToView(ID: string, urlWillCreate: string) {
    if (this._hasInArrayTabs(ID)) {
      const tabs: TabNavigation = this.tabsObject[ID];

      const { queryParams, urlDecode } = this._decodeUrlInternalRouter(
        tabs.pathURL
      );

      this._router.navigate(['/', ...urlDecode], {
        queryParams,
      });
    } else {
      this._router.navigate([urlWillCreate]);
    }
  }

  private _hasInArrayTabs(ID: string): boolean {
    if (!this._tabs.getValue()[ID]) return false;
    else return true;
  }

  //@ts-ignore
  private _getArrayFromObject(tabs): TabNavigation[] {
    return Object.values(tabs);
  }

  private _getObjectFromArray(tabs: TabNavigation[]): {
    [id: string]: TabNavigation;
  } {
    let tabsObject: { [id: string]: TabNavigation } = {};

    for (const tab of tabs) {
      tabsObject = {
        ...tabsObject,
        [tab.id]: tab,
      };
    }
    return tabsObject;
  }

  private deleteInArrayTabs() {
    let tabsObject = this._tabs.getValue();
    for (const tab of this._tabsWillDeteled) {
      delete tabsObject[tab.id];
      this._routeReuseStrategy.closePage(tab.id.toString());
    }

    this._tabs.next(tabsObject);
    this._tabsWillDeteled = [];
  }
}
