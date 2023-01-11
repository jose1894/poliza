import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FadeOut } from '@BCTheme/animations/FadeOut.animation';
import { LayoutService } from '@BCTheme/services/layout.service';
import { NetworkService, StatusConnection } from '@Core/services/network.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-bar-filter',
  templateUrl: './input-bar-filter.component.html',
  styleUrls: ['./input-bar-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    FadeOut(),
    trigger('slidePanelFilter', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          // display: 'none',
        })
      ),
      state(
        '*',
        style({
          transform: 'translateX(0)',
          // display: 'block',
        })
      ),
      transition('void => *', animate('420ms')),
      transition('* => void', animate('420ms')),
    ]),
  ],
})
export class InputBarFilterComponent implements OnInit, AfterViewChecked {
  @Input() public isEditionMode: boolean = false;
  @Input() public isSpinSearch: boolean = false;
  @Input() public isEnableDelete: boolean = true;
  /**
   * @description Habilita o no el boton para abrir el panel de filtrado
   * @default {boolean} true
   */
  @Input() public isShowFilterButton: boolean = true;
  @Input() public isShowRefreshButton: boolean = true;
  @Input() public isDisabledFilterButton: boolean = false;
  @Input() public isShowAddButton: boolean = true;
  @Input() public isDisabledAddButton: boolean = false;
  @Input() public isShowInputSearch: boolean = true;
  @Input() public isDisabledSearchButton: boolean = false;
  @Input() public showMsgIndexedDB: boolean = false;
  @Input() public hasExtrasFilters: boolean = false;
  //@ts-ignore
  @Input() public formFilter: FormGroup = null;
  @Input() public onlyPanelFilter: boolean = false;
  @Input() public isShowPanelFilter: boolean = false;
  @Input() public disableAnimationPanelFilter: boolean = false;
  @Input() public menuHamburgerContent: MenuHamburgerItem[] = [];
  @Input() public menuHamburgerAddContent: MenuHamburgerAddItem[] = [];
  @Input() public isDisabledMoreMenuButton: boolean = false;
  @Input() public enableConfirmDeleteDialog: boolean = false;
  @Input() public messageConfirmDeleteDialog: string = '';
  @Input('tooltiptext')
  public tooltipTextButtonAdd: string = 'New'
  @Input() public isExpansionActive: boolean = false;

  @Input() public searchPlaceHolder: string = 'Search filter';

  @Input() public hasExtraFiltersInCollapsable : boolean = false

  @Output('onToggleShowPanelFilter')
  private _onToggleShowPanelFilterEvent: EventEmitter<{
    isOpen: boolean;
  }> = new EventEmitter<{ isOpen: boolean }>();

  @Output('onApplyFilters')
  private _onApplyFilters: EventEmitter<void> = new EventEmitter<void>();

  @Output('onDeleteFilters')
  private _onDeleteFilters: EventEmitter<void> = new EventEmitter<void>();

  @Output('onKeyUpBarSearch')
  private _onKeyUpBarSearch: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @Output('onCleanBarSearch')
  private _onCleanBarSearch: EventEmitter<void> = new EventEmitter<void>();

  @Output('onSearchButton')
  private _onSearchButton: EventEmitter<string> = new EventEmitter<string>();

  @Output('onAddButton') private _onAddButton: EventEmitter<void | string> =
    new EventEmitter<void | string>();

  @Output('onBackButtonEditMode')
  private _onBackButtonEditMode: EventEmitter<void> = new EventEmitter<void>();

  @Output('onDeleteEditMode')
  private _onDeleteEditMode: EventEmitter<void> = new EventEmitter<void>();

  @Output('onConfirmDeleteDialog')
  private _onConfirmDeleteDialog: EventEmitter<string> = new EventEmitter<string>();

  // public formFilter: FormGroup;
  public isOnline$: Observable<StatusConnection>;

  public scrollHiddenToolbar$: Observable<boolean>;

  constructor(    
    private _formBuilder: FormBuilder,
    private _layoutService: LayoutService,
    private _networkService: NetworkService,
    private _changeDetectorRef: ChangeDetectorRef,
    
  ) {
    this.isOnline$ = this._networkService.onIsOnline();
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();

    if (this.formFilter === null) {
      this.formFilter = this._formBuilder.group({
        searchText: [''],
      });
    }
  }
  ngAfterViewChecked(): void {
    this._changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {}

  public searchKeyUp(evt: KeyboardEvent): void {
    this._onKeyUpBarSearch.emit(evt);
  }

  public onSearchButton(): void {
    let value = this.isShowInputSearch
      ? this.formFilter.get('searchText')?.value
      : '';
    this._onSearchButton.emit(value);
  }

  public cleanField(): void {
    this._onCleanBarSearch.emit();
  }

  public add(): void {
    this._onAddButton.emit();
  }

  public addMenuOption(
    functionOption: (event: EventEmitter<void | string>) => void
  ) {
    functionOption(this._onAddButton);
  }

  public closeExtraFilter(): void {
    this._onBackButtonEditMode.emit();
  }

  public delete(): void {
    this._onDeleteEditMode.emit();
  }

  public confirmDeleteDialog(result: string): void {
    this._onConfirmDeleteDialog.emit(result);
  }

  public applyFilters(): void {
    this._onApplyFilters.emit();
  }

  public deleteFilters(): void {
    this._onDeleteFilters.emit();
  }

  public openFilterPanel(): void {
    // this.isShowPanelFilter = true;

    this._onToggleShowPanelFilterEvent.emit({ isOpen: true });
    /* Emit output para cambiar la vista a mas filtros */
    this._changeDetectorRef.markForCheck();
  }

  public closeFilterPanel(): void {
    // this.isShowPanelFilter = false;
    this._onToggleShowPanelFilterEvent.emit({ isOpen: false });
    this._changeDetectorRef.markForCheck();
  }
}

export interface MenuHamburgerItem {
  icon: string;
  name: string;
  function: any;
  disabled?: boolean;
}

export interface MenuHamburgerAddItem extends MenuHamburgerItem {
  function: (event: EventEmitter<void | string>) => void;
}
