
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'error-modal-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
