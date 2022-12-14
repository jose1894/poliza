import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  ViewStatusRoute
} from '@Core/interfaces/base-service.interface';
import { AuthService } from '@Core/services/auth.service';
import { LayoutService } from '@BCTheme/services/layout.service';
import { PolizaService } from '@Core/services/poliza/poliza.service';
import { ImageDefaultService } from '@Core/services/image-default.service';


@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.scss']
})
export class PolizaComponent implements OnInit {

  public polizaList: any[] = [];
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
    private _layoutService: LayoutService,
    private _polizaService: PolizaService,
    private _imageDefaultService: ImageDefaultService
  ) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
    this._onGetPermissionSubscription = this._authService
      .onGetPermission('PS010101')
      .subscribe((permission) => (this.permission = permission));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    (this._onGetPermissionSubscription) && this._onGetPermissionSubscription.unsubscribe();
  }

  seeContentPages(): boolean {
    return (
      this._polizaService.viewStatus === ViewStatusRoute.DETAIL ||
      this._polizaService.viewStatus === ViewStatusRoute.ADD ||
      this._polizaService.viewStatus === ViewStatusRoute.EDIT
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

    if (this._polizaService.viewStatus === ViewStatusRoute.EDIT) {
      const index = this.polizaList.findIndex(
        (poliza: any) => poliza.id === 1/*this._currencyService.selectedCurrency.id*/
      );
      this._polizaService.selectedIndexPoliza = index;
    }

  }

}
