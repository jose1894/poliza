import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { LayoutService } from '@BCTheme/services/layout.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResultConfirmExitDialog } from '@Core/interfaces/base-service.interface';
import { CustomModalDialogComponent } from '../dialog/custom-dialog/custom-dialog.component';

@Component({
  selector: 'btn-confirm-delete',
  templateUrl: 'btn-confirm-delete.component.html',
  styleUrls: ['btn-confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnConfirmDeleteComponent implements OnInit {
  @Input() enableDelete: boolean = false;
  @Input() enableConfirmDeleteDialog: boolean = false;
  @Input() messageConfirmDeleteDialog: string = '';
  @Input() localcompleteActionValue = false;
  /* Booleano que chequea si proviene de modal para asignar el top: 1% y cambiar color de papelera*/
  @Input() fromModal: boolean = false;
  @Input() deleteMessage: string =
    'Are you sure you want to delete the record?';
  @Output() completeActionChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onConfirmDeleteDialog: EventEmitter<any> = new EventEmitter();
  public confirmDelete = false;
  public showAlert = false;
  public actionDelete = false;
  public refSetTimeout = null;
  public scrollHiddenToolbar$: Observable<boolean>;

  @Input() set completeAction(completeAction: boolean) {
    if (completeAction) {
      this.actionDelete = false;
      this.mouseleaveBtn();
    } else {
      this.localcompleteActionValue = completeAction;
      this.completeActionChange.emit(this.localcompleteActionValue);
    }
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _modal: MatDialog,
    private _layoutService: LayoutService
  ) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
  }

  ngOnInit(): void {
    this.enableDelete =
      this.enableDelete === undefined ? true : this.enableDelete;
    this._changeDetectorRef.markForCheck();
  }

  get completeAction(): boolean {
    return this.localcompleteActionValue;
  }

  confirmDeletes(): void {
    // debugger;
    if (!this.confirmDelete) {
      this.confirmDelete = true;
      this.showAlert = true;
      this._changeDetectorRef.markForCheck();
      //@ts-ignore
      this.refSetTimeout = setTimeout(() => {
        this.mouseleaveBtn();
        this._changeDetectorRef.markForCheck();
      }, 5000);
    }
  }

  delete(): void {
    if (!this.actionDelete) {
      this.hideAlert();
      if (this.enableConfirmDeleteDialog) {
        this.modalConfirmDelete();
      } else {
        this.actionDelete = true;
        this.onDelete.emit();
      }
    }
    this._changeDetectorRef.markForCheck();
  }

  mouseleaveBtn(): void {
    if (!this.actionDelete) {
      this.confirmDelete = false;
      this.hideAlert();
    }
    this._changeDetectorRef.markForCheck();
  }

  hideAlert(): void {
    this.showAlert = false;
    if (this.refSetTimeout) {
      clearTimeout(this.refSetTimeout);
      this.refSetTimeout = null;
    }
    this._changeDetectorRef.markForCheck();
  }

  async modalConfirmDelete() {
    const dialogRef = this._modal.open(CustomModalDialogComponent, {
      disableClose: true,
      width: '480px',
      data: {
        type: 'warning',
        check: true,
        message: this.messageConfirmDeleteDialog,
        buttons: {
          no: true,
          yes: true,
          cancel: false,
          ok: false,
        },
      },
    });

    await dialogRef
      .afterClosed()
      .toPromise()
      .then((result) => {
        switch (result.type) {
          case 'cancel':
            this.mouseleaveBtn();
            this.onConfirmDeleteDialog.emit(ResultConfirmExitDialog.CANCEL);
            return;
          case 'no':
            this.mouseleaveBtn();
            this.onConfirmDeleteDialog.emit(ResultConfirmExitDialog.NO);
            return;
          case 'yes':
            this.actionDelete = true;
            this.onConfirmDeleteDialog.emit(ResultConfirmExitDialog.YES);
            return;
        }
      });
  }
}
