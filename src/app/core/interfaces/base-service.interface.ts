import { Observable } from 'rxjs';

/*export interface BaseService {
  // _viewStatus$: Observable<ViewStatusRoute>;

  viewStatus: ViewStatusRoute;

  // selectedRole: any;

  routePath: string;

  onViewStatus();

  goToView(
    view: ViewStatusRoute,
    params: string[],
    queryParams: any,
    searchVirtualKey?: boolean
  );

  save();

  delete(listDelete: any[]);
}*/

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
