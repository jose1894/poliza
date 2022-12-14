import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FadeOut } from '@BCTheme/animations/FadeOut.animation';
import { MediaQueryService } from '@BCTheme/services/media-query.service';
import { TabNavigation } from '@Core/models/general/navigation/tab-navigation.interface';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [FadeOut()],
})
export class NavbarComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  public tabs: TabNavigation[] = [];
  public selectedId: string | any = null;
  public isVisibleMovePagination: boolean = false;
  public isMobileElseDisabled$: Observable<boolean>;

  @ViewChild('tabContent', { read: ElementRef })
  private _tabContent: ElementRef<HTMLElement> | undefined;
  private _subscriptionOnTab: Subscription;

  constructor(
    private _tabService: TabService,
    private _mediaQueryService: MediaQueryService,
    private ngZone: NgZone
  ) {
    this.isMobileElseDisabled$ = this._mediaQueryService.onIsMediaMobile();
    this._subscriptionOnTab = combineLatest([
      this._tabService.onTabs(),
      this._tabService.onSelectedTabId(),
    ])
      .pipe(map(([tabs, selectedId]) => ({ tabs, selectedId })))
      .subscribe(({ tabs, selectedId }) => {
        if (tabs.length === 0) {
          this.tabs = [];
        } else if (
          this.tabs.length !== tabs.length &&
          tabs[tabs.length - 1]?.title
        ) {
          const lengthActuallyTabs = this.tabs.length;
          const lengthFutureTabs = tabs.length;
          this.tabs = tabs;
          if (lengthFutureTabs > lengthActuallyTabs) {
            this.showBtnScroll();
          }
        }

        if (this.selectedId !== selectedId) {
          // const tab = this.tabs.find((tab) => tab.id === selectedId);
          // if (tab) {
          this.selectedId = selectedId;
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              const tabDOM = document.querySelector(
                `[data-idtab="${selectedId}"]`
              );
              // console.log(tabDOM);
              if (tabDOM && tabDOM.scrollIntoView) {
                if (this.isShowScroll()) {
                  tabDOM.scrollIntoView(false);
                }
              }
            }, 100);
          })
          // }else{
          //   this.selectedId = null;
          // }
        }
      });
  }

  ngOnDestroy(): void {
    this._subscriptionOnTab.unsubscribe();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.showBtnScroll();
  }

  ngAfterViewInit() {
    //Recién en este punto tendrás acceso al valor
    this.showBtnScroll();
  }

  public showBtnScroll() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.isVisibleMovePagination = this.isShowScroll();
      }, 100);
    })
  }

  private isShowScroll() {
    if (this._tabContent?.nativeElement) {
      return (
        this._tabContent.nativeElement.scrollWidth >
        this._tabContent.nativeElement.clientWidth
      );
    }

    return false;
  }

  public scrollRight(): void {
    this._moveScroll(150);
  }

  public scrollLeft(): void {
    this._moveScroll(-150);
  }

  public scrollEnd(): void {
    this._moveScroll(1000);
  }

  /**
   * Remove tab in the array
   * Elimina un Tab del arreglo de tabs
   */
  public removeTab(tab: TabNavigation): void {
    this._tabService.remove(tab.id.toString());
  }

  public onChangeTab(tab: TabNavigation) {
    this._tabService.goToView(tab.id.toString(), tab.pathURL);
  }

  /**
   * Reorganiza los tabs
   */
  public dropSubTab(event: CdkDragDrop<TabNavigation[]>) {
    this._tabService.changeOrderTabs(event.previousIndex, event.currentIndex);
  }

  /**
   * Avisa que se empezo con el drag un tab
   */
  public onStartDragTab(evt: CdkDragStart, tab: TabNavigation) {
    // this._dragTabService.dragTab = tab;
    // this._dragTabService.isDraggingTab = true;
  }

  /**
   * Avisa que se detuvo el drag un tab
   */
  public onEndDragTab(evt: CdkDragEnd, tab: TabNavigation) {
    // setTimeout(() => {
    //   // this._dragTabService.dragTab = null;
    //   // this._dragTabService.isDraggingTab = false;
    // }, 300);
  }

  private _moveScroll(position: number) {
    if (this._tabContent?.nativeElement)
      this._tabContent.nativeElement.scrollTo({
        left: this._tabContent.nativeElement.scrollLeft + position,
        behavior: 'smooth',
      });
  }
}