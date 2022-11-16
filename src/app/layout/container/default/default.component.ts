import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@BCTheme/services/layout.service';
import { MediaQueryService } from '@BCTheme/services/media-query.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public scrollHiddenToolbar$: Observable<boolean>;

  public isOpenSidenavMobile$: Observable<boolean>;

  public isOpenGallery$: Observable<boolean>;
  public isUnfoldedSidenav$: Observable<boolean>;

  constructor(
    private _layoutService: LayoutService,
    private _mediaQueryService: MediaQueryService
  ) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
    this.isOpenSidenavMobile$ = this._layoutService.onOpenSidenav();
    this.isOpenGallery$ = this._layoutService.onIsOpenGallery();
    this.isUnfoldedSidenav$ = this._layoutService.onIsUnfoldedSidenav();
  }

  ngOnInit(): void {}

  closeSidenav() {
    if (this._mediaQueryService.isMediaMobile)
      this._layoutService.closeSidenav();
  }

}
