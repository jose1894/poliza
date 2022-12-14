import { 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  ElementRef, 
  NgZone, 
  OnInit, 
  ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Show } from '@BCTheme/animations/show.animation';
import { LayoutService } from '@BCTheme/services/layout.service';
import { AuthService } from '@Core/services/auth.service';
import { 
  NetworkService, 
  StatusConnection } from '@Core/services/network.service';
import { UserPersonalConfigurationComponent } from '@Pages/security/user-personal-configuration/user-personal-configuration.component';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { KeyStorage, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [Show()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {

  public loginResultPermissions: any[] = [];

  public isOnline$: Observable<StatusConnection>;

  public user: any = null;

  public showEmailLong: boolean = false;

  public viewMyUser: boolean = true;

  private _loginResult: any = null;

  public userFirstLastName: string | null = null

  /* Ref de los span para saber su width */
  //@ts-ignore
  @ViewChild('userName') userNameRef: ElementRef<HTMLElement>;
  //@ts-ignore
  @ViewChild('userId') userIdRef: ElementRef<HTMLElement>;

  constructor(   
    private ngZone: NgZone,
    private _matDialog: MatDialog,    
    private _cd: ChangeDetectorRef,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    private _storageService: StorageService,
    private _networkService: NetworkService,
  ) { 
    this.isOnline$ = this._networkService.onIsOnline();
  }

  ngAfterViewInit(): void {
    this._calcLongEmailContent();
  }

  private _calcLongEmailContent() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.showEmailLong =
          this.userIdRef?.nativeElement?.clientWidth >
          this.userNameRef?.nativeElement?.clientWidth;
          this._cd.markForCheck();
      }, 100);
    });
  }

  ngOnInit(): void {
    this._calcLongEmailContent();

    if (this._authService.isLoggedIn ||
        this._storageService.getValue(KeyStorage.TOKEN)) {
          this._authService.onUserLogged().subscribe((user) =>{
            this._loginResult = user;
            /* Validation permits toolbar */
            this.loginResultPermissions = !!this._loginResult
              .loginResultPermissions
              ? this._loginResult.loginResultPermissions
              : [];
            this.userFirstLastName = `${user?.nombre || ''} ${user?.apellido || ''}`;
            this.user = user;
          })
        }
  }

  toggleSidenavOpen(){
    this._layoutService.openSidenav();
  }

  toggleOptionChat(){}

  openModalMyUserConfig(): void {
    if (this._authService.userLogged) {
      const dialogRef = this._matDialog.open(UserPersonalConfigurationComponent, {
        width: '60%',
        maxWidth: '620px',
        panelClass: 'headerClass',
        //Data futura del modal
        data: {
          user: this._authService.userLogged.user
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        //console.log(result);
      })
    }    
  }

  logout(): void {
    this._apiService.logout();
  }

}
