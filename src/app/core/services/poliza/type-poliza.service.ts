import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, ViewStatusRoute } from '@Core/interfaces/base-service.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Routing } from 'src/app/app.routing';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TypePolizaService implements BaseService{

  public routePath: string = '';

  private _selectedPoliza$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  
  private _selectedIndexPoliza$: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);

  private _viewStatus$: BehaviorSubject<ViewStatusRoute> =
    new BehaviorSubject<ViewStatusRoute>(ViewStatusRoute.DASHBOARD);

  private _filters$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private _apiService: ApiService,
    private _routing: Routing,
    private _router: Router,
  ){
    this.routePath = this._routing.getPathByIdFormattedString('PS010101');
  }

  public get viewStatus(): ViewStatusRoute {
    return this._viewStatus$.getValue();
  }

  public set viewStatus(status: ViewStatusRoute) {
    this._viewStatus$.next(status);
  }

  public onViewStatus(): Observable<ViewStatusRoute> {
    return this._viewStatus$.asObservable();
  }

  public get selectedPoliza(): any {
    return this._selectedPoliza$.getValue();
  }

  public set selectedPoliza(poliza: any) {
    this._selectedPoliza$.next(poliza)
  }

  public onSelectedPoliza(): Observable<any> {
    return this._selectedPoliza$.asObservable();
  }

  public get selectedIndexPoliza(): number {
    return this._selectedIndexPoliza$.getValue();
  }

  public set selectedIndexPoliza(index: number) {
    this._selectedIndexPoliza$.next(index);
  }

  public onSelectedIndexPoliza(): Observable<number> {
    return this._selectedIndexPoliza$.asObservable();
  }

  public get filters(): string {
    return this._filters$.getValue();
  }

  public set filters(filters: string) {
    this._filters$.next(filters);
  }
  
  public onFilters(): Observable<string> {
    return this._filters$.asObservable();
  }

  public async goToView(
    view: ViewStatusRoute,
    params: string[] = [],
    queryParams: any = {}
  ): Promise<boolean> {
    this.viewStatus = view;
    let resultNav: boolean = false;
    if (view === ViewStatusRoute.DASHBOARD) {
      resultNav = await this._router.navigate([this.routePath], {
        queryParams,
      });
      this.selectedPoliza = null;
      this.selectedIndexPoliza = -1;
    } else if (view === ViewStatusRoute.ADD) {
      resultNav = await this._router.navigate([this.routePath, 'add'], {
        queryParams,
      });
      //this.selectedPoliza = new Currency();
      this.selectedIndexPoliza = -1;
      return resultNav;
    } else {
      resultNav = await this._router.navigate(
        [this.routePath, view, ...params],
        {
          queryParams,
        }
      );
    }

    return resultNav;

    // debugger;
  }

  save(): Observable<any> {
    const body = {}
    return this._apiService.post('/Configurations/Currency/save', body);
  }
  delete(listDelete: any[]): Observable<boolean>{
    let currency:[] = []
    return this._apiService
    .delete('/Configurations/Currency/deleteList', currency)
    .pipe(map((res: any) => res.isSuccess));
  }
}
