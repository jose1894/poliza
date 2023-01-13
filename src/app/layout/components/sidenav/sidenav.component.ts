import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FadeOut } from '@BCTheme/animations/FadeOut.animation';
import { LayoutService } from '@BCTheme/services/layout.service';
import { MediaQueryService } from '@BCTheme/services/media-query.service';
import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';
import { filter, Observable } from 'rxjs';
import { Routing } from 'src/app/app.routing';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [FadeOut()],
})
export class SidenavComponent implements OnInit {
  public isHover: boolean = false;
  //public isMobile$: Observable<boolean>;
  public isOpenSidenav: boolean = false;
  public forceFolded: boolean = false;
  //public version: string = environment.version;

  public navigation: ItemRoute[] = [];

  constructor(
    private _layoutService: LayoutService,
    private _mediaQueryService: MediaQueryService,
    private _router: Router,
    private _routing: Routing
  ) {
    // this.isMobile$ = this._mediaQueryService.onIsMediaMobile();
    //this.isMobile$ = false
    this._layoutService.onOpenSidenav().subscribe((isOpen) => {
      this.isOpenSidenav = isOpen;
    });

    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!this.forceFolded) this.closeSidenav();
      });

    this._layoutService.onIsUnfoldedSidenav().subscribe((isUnfolded) => {
      this.forceFolded = isUnfolded;
    });
    this._routing.onGetRoutesWithPermissions().subscribe((navigation) => {
      this.navigation = navigation;
    });
  }

  ngOnInit(): void {}

  public get isUnfolded(): boolean {
    if (this._mediaQueryService.isMediaMobile && this.isOpenSidenav) {
      return true;
    } else if (this.forceFolded || this.isHover) {
      return true;
    } else {
      return false;
    }
  }

  public onMouseLeaveAside(): void {
    if (!this.forceFolded) {
      this.isHover = false;
    }
  }

  public onMouseEnterAside(): void {
    if (!this.forceFolded) {
      this.isHover = true;
    }
  }

  public closeSidenav(): void {
    this._layoutService.closeSidenav();
  }

  public toggleSidebarFolded(): void {
    this.forceFolded = !this.forceFolded;
    this._layoutService.isOpenSidenav = this.forceFolded;
    this._layoutService.isUnfoldedSidenav = this.forceFolded;
  }
}