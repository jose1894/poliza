import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { MediaQueryService } from '@BCTheme/services/media-query.service';
import { debounceTime, distinctUntilChanged, take, map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  /**
   * @constant HEIGHT_MIN_SCROLL
   * @description Minimo requerido para hacer scroll y ocultar Toolbar y matTabList
   * @varsion 1.0
   */
  public readonly HEIGHT_MIN_SCROLL: number = 900;

  /**
   *
   */
  private _isOpenSidenav: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  /**
   *
   */
  private _isOpenGallery: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   * @var _isHiddenToolbar$
   */
  private _isHiddenToolbar: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   *
   */
  private _isUnfoldedSidenav: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private initTime: any = null;

  constructor(private _mediaQueryService: MediaQueryService) {
    this._mediaQueryService
      .onIsMediaMobile()
      .pipe(distinctUntilChanged())
      .subscribe((isMediaMobile) => {
        if (isMediaMobile) {
          this._isOpenSidenav.next(false);
          this._isUnfoldedSidenav.next(false);
        }
      });
  }

  public get isUnfoldedSidenav() {
    return this._isUnfoldedSidenav.getValue();
  }

  public set isUnfoldedSidenav(isUnfolded: boolean) {
    this._isUnfoldedSidenav.next(isUnfolded);
  }

  public onIsUnfoldedSidenav(): Observable<boolean> {
    return this._isUnfoldedSidenav.asObservable();
  }

  /**
   * @name onScrollEventByToolbarObserver
   * @description Retorna el Observable del Subject $onScrollDownHidenToolbar
   * @returns {Observable<boolean>} Devuelve un Observable de valor booleano. '
   * true' si es para ocultar la barra y 'false' si no la oculta
   */
  onHiddenToolbar(): Observable<boolean> {
    return this._isHiddenToolbar.asObservable();
  }

  /**
   * @name isHiddenToolbar
   * @description Retorna el valor actual del Obseravble $onScrollDownHidenToolbar.
   * @returns {boolean} Devuelve un valor booleano.
   */
  public get isHiddenToolbar(): boolean {
    return this._isHiddenToolbar.getValue();
  }

  /**
   * @name setShowToolbar
   * @description Muestra el Toolbar
   * @returns {void}
   */
  public setShowToolbar(): void {
    this._isHiddenToolbar.next(false);
  }

  /**
   * @name setHiddenToolbar
   * @description Oculta el Toolbar
   * @param {boolean} force Forzar el ocultar el Toolbar
   * @returns {void}
   */
  public setHiddenToolbar(force: boolean = false) {
    if (
      force ||
      this._mediaQueryService.windowSizes.height < this.HEIGHT_MIN_SCROLL
    ) {
      this._isHiddenToolbar.next(true);
    }
  }

  /**
   * onOpenSidenav
   */
  public onOpenSidenav() {
    return this._isOpenSidenav.asObservable();
  }

  public get isOpenSidenav(): boolean {
    return this._isOpenSidenav.getValue();
  }

  public set isOpenSidenav(isOpen: boolean) {
    this._isOpenSidenav.next(isOpen);
  }

  /**
   * toogleOpenSidenav
   */
  public toogleStateSidenav(): void {
    this._isOpenSidenav.next(!this.isOpenSidenav);
  }

  /**
   * closeSidenav
   */
  public closeSidenav(): void {
    if (!this.isOpenSidenav) {
      return;
    }
    this._isOpenSidenav.next(false);
  }

  /**
   * openSidenav
   */
  public openSidenav(): void {
    if (this.isOpenSidenav) {
      return;
    }

    this._isOpenSidenav.next(true);
  }

  /**
   * openGallery
   */
  public get isOpenGallery(): boolean {
    return this._isOpenGallery.getValue();
  }

  /**
   * openGallery
   */
  public set isOpenGallery(isOpen: boolean) {
    this._isOpenGallery.next(isOpen);
  }

  /**
   * onIsOpenGallery
   */
  public onIsOpenGallery(): Observable<boolean> {
    return this._isOpenGallery.asObservable();
  }

  public startCountdown(seconds: any) {
    this.initTime = (seconds) && moment(Date.now() + (seconds + 1) * 1000);
    return interval(1000).pipe(
      take(seconds),
      map(() => {
        let diff = (this.initTime) && this.initTime.diff(moment());
        let countdown = moment.utc(diff).format('mm:ss');
        return countdown;
      })
    );
  }
}
