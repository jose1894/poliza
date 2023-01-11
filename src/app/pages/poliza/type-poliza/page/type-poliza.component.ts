import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  ViewStatusRoute
} from '@Core/interfaces/base-service.interface';
import { AuthService } from '@Core/services/auth.service';
import { LayoutService } from '@BCTheme/services/layout.service';
import { TypePolizaService } from '@Core/services/poliza/type-poliza.service';
import { ImageDefaultService } from '@Core/services/image-default.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NetworkService, StatusConnection } from '@Core/services/network.service';


@Component({
  selector: 'app-type-poliza',
  templateUrl: './type-poliza.component.html',
  styleUrls: ['./type-poliza.component.scss']
})
export class TypePolizaComponent implements OnInit {

  public formPoliza: FormGroup;
  public filters: string = '';
  public isSearching: boolean = false;
  public isShowAction: boolean = false;
  public spinnerListView: boolean = false;
  public isShowPanelFilter: boolean = false;
  

  public polizaList: any[] = [];
  public isOnline$: Observable<StatusConnection>;
  public scrollHiddenToolbar$: Observable<boolean>;
  private _onGetPermissionSubscription: Subscription;
  public permission: any;

  public icon: any[] = [];
  public dataCode: any[] = [];
  public dataTitle: any[] = [];
  public mainImage: any[] = [];
  public arrayContentData: any[] = [];
  public arrayImagesRight: any[] = [];

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _layoutService: LayoutService,
    private _typePolizaService: TypePolizaService,
    private _networkService: NetworkService,
    private _imageDefaultService: ImageDefaultService
  ) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
    this.isOnline$ = this._networkService.onIsOnline();
    this._onGetPermissionSubscription = this._authService
      .onGetPermission('PS010101')
      .subscribe((permission) => (this.permission = permission));

    this.formPoliza = this._formBuilder.group({
        searchText: [''],
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    (this._onGetPermissionSubscription) && this._onGetPermissionSubscription.unsubscribe();
  }

  seeContentPages(): boolean {
    return (
      this._typePolizaService.viewStatus === ViewStatusRoute.DETAIL ||
      this._typePolizaService.viewStatus === ViewStatusRoute.ADD ||
      this._typePolizaService.viewStatus === ViewStatusRoute.EDIT
    );
  }

  mostrarData(): void {
    this.getDataItemListview();
    /*this.isEnableLoadMore =
      this._currencyService.totalCurrency > this.currencyList.length;
    this._clearCheck();
    if (this.currencyList.length === 1) {
      this.onCurrencySelect(this.currencyList[0]);
    }
    this.stopSpinner();*/
  }

  getDataItemListview() {
    this.dataCode = [];
    this.dataTitle = [];
    this.mainImage = [];
    this.arrayContentData = [];
    this.arrayImagesRight = [];
    this.icon = [];

    this.polizaList.forEach((item, i, array) => {
      const imagenpng = this._imageDefaultService.getImage(item.description);
      this.dataCode.push(item.id);
      this.dataTitle.push(item.description);
      this.mainImage.push(imagenpng);
      this.arrayContentData.push([
        {
          iconValue: 'attach_money',
          textValue: '  ' + item.symbol,
          isImage: false,
        },
        {
          iconValue: 'date_range',
          textValue: item.intervalDaysForExchangeRates,
          isImage: false,
        },
      ]);
      this.arrayImagesRight.push({ img1: imagenpng, img2: imagenpng });
    });

    if (this._typePolizaService.viewStatus === ViewStatusRoute.EDIT) {
      const index = this.polizaList.findIndex(
        (poliza: any) => poliza.id === 1/*this._currencyService.selectedCurrency.id*/
      );
      this._typePolizaService.selectedIndexPoliza = index;
    }

  }

  public onKeyUpBarSearch(evt: KeyboardEvent): void {
    const search = this.formPoliza.get('searchText')?.value;
    if (evt.keyCode === 13) {
      this.searchByText(true); // busco en REST
    } else {
      if (this._authService.userLogged.user.offline) {
        // si es true busco en el indexdDB
        this.searchByText(false); // busco en indexdDb
      }
    }
  }

  private _setFiltersToService(filters: string): void {
    this._typePolizaService.filters = filters;
  }

  searchByText(searchInAPIRest: boolean = true): void {
    this.filters = this.formPoliza.get('searchText')?.value;
    this.isSearching = true;
    this._typePolizaService.selectedIndexPoliza = -1;
    if (this._authService.userLogged.user.offline && !searchInAPIRest) {
      // en este caso no busco al servidor
      this.spinnerListView = false;
    } else {
      this.spinnerListView = true;
    }

    this._setFiltersToService(this.filters);
    this._reload(false, searchInAPIRest);
  }

  public async _reload(
    changeView: boolean = true,
    searchInAPIRest?: boolean
  ): Promise<void> {
    this._typePolizaService.selectedIndexPoliza = -1;
    if (changeView) {
      this._typePolizaService.goToView(ViewStatusRoute.DASHBOARD);
    }
    const search = this.formPoliza.get('searchText')?.value;
    if (this._typePolizaService.filters !== search) {
      this.filters = search;
      this._setFiltersToService(this.filters);
    }
    /**
     * Controlar el reload en las vistas de edit
     */
    /*this._currencyService
      .getCurrencyList(1, this.count)
      .subscribe((result: Currency[]) => {
        if (result) {
          this.currencyList = result;
          this.mostrarData();
          this._changeDetectorRef.detectChanges();
        }
      });*/
  }

  onCleanBarSearch(): void {
    this.spinnerListView = true;
    this.formPoliza.get('searchText')?.setValue('');
    this.filters = '';
    this._setFiltersToService(this.filters);
    this._typePolizaService.selectedIndexPoliza = -1;
    this._reload(false);
  }

  onAddTypePoliza() {
    this._typePolizaService.goToView(ViewStatusRoute.ADD)
  }

  onBackButtonEditMode() {}

  onDelete() {}
  

}
