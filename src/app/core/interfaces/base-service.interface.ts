import { Observable } from "rxjs";

export interface BaseService {
  // _viewStatus$: Observable<ViewStatusRoute>;

  viewStatus: ViewStatusRoute;
  routePath: string;
  onViewStatus(): Observable<ViewStatusRoute>;
  goToView(
    view: ViewStatusRoute,
    params: string[],
    queryParams: any,
    searchVirtualKey?: boolean
  ): Promise<boolean>;
  save(): Observable<Object>;
  delete(listDelete: any[]): Observable<boolean>;
}

export enum ViewStatusRoute {
  PROJECTLIST = 'projectlist',
  DASHBOARD = 'dashboard',
  DETAIL = 'detail',
  EDIT = 'edit',
  ADD = 'add',
}

export enum ResultConfirmExitDialog {
  YES = 'yes',
  NO = 'no',
  CANCEL = 'cancel',
}
