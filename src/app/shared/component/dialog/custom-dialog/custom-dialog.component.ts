import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'custom-modal-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomModalDialogComponent implements OnInit {
  public check: boolean = false;
  constructor(
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CustomModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (!this.data.buttons.positive) {
      this.data.buttons.positive = 'Yes';
    }
    if (!this.data.buttons.negative) {
      this.data.buttons.negative = 'No';
    }
  }
  close(type: string): void {
    this.dialogRef.close({ type: type });
  }

  getColor(type: string): string {
    switch (type) {
      case 'info':
        return '#03A9F4';
      case 'warning':
        return '#FFC107';
      case 'error':
        return '#B71C1C';
      case 'question':
        return '#37474F';
      default: 
        return '#03A9F4';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'info':
        return 'info_outline';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'question':
        return 'question_answer';
      default:
        return 'info_outline';
    }
  }
}
