import { ItemRoute } from './item-route.interface';

export interface TabNavigation {
  id: string | number;
  // label: string;
  title: string;
  itemNavigation: ItemRoute;
  pathURL: string;
  changesEdit: {
    saveOnExit: boolean;
    haveChangesPending: boolean;
    saveFunction: CallableFunction;
    // service: BaseService;
    // nameFunctionExec:string;
  };
}
