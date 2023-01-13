import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, ViewStatusRoute } from '@Core/interfaces/base-service.interface';
import { TypePolizaInterface } from '@Core/models/poliza/type-poliza';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Routing } from 'src/app/app.routing';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TypePolizaService implements BaseService{

  public routePath: string = '';

  private _selectedTypePoliza$: BehaviorSubject<any> =
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

  public get selectedTypePoliza(): any {
    return this._selectedTypePoliza$.getValue();
  }

  public set selectedTypePoliza(poliza: any) {
    this._selectedTypePoliza$.next(poliza)
  }

  public onSelectedTypePoliza(): Observable<any> {
    return this._selectedTypePoliza$.asObservable();
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
    console.log(view)
    let resultNav: boolean = false;
    if (view === ViewStatusRoute.DASHBOARD) {
      resultNav = await this._router.navigate([this.routePath], {
        queryParams,
      });
      this.selectedTypePoliza = null;
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

  save(data: TypePolizaInterface): Observable<any> {
    return this._apiService.post('/tipo-poliza', data).pipe(
      map((resp: any) => resp.data)
    );
  }

  update(data: TypePolizaInterface, id: string): Observable<any> {
    return this._apiService.put(`/tipo-poliza/${id}`, data)
  }

  getTypePolizaById(id: string): Observable<any> {
    return this._apiService.get(`/tipo-poliza/${id}`, {})
  } 
  delete(listDelete: any[]): Observable<boolean>{
    let currency:[] = []
    return this._apiService
    .delete('/Configurations/Currency/deleteList', currency)
    .pipe(map((res: any) => res.isSuccess));
  }
}
