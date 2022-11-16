import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalDialogComponent } from '@Shared/component/error-dialog/error-dialog.component';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(public dialog: MatDialog, public messageService: MessageService) {}

  showErrorDialog(title: string, message: any): void {
    const dialogRef = this.dialog.open(ErrorModalDialogComponent, {
      width: '500px',
      data: {
        title: title,
        message: message,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  showNotification(type: 'success' | 'warn' | 'error' | 'info' | string, message:string, duration: number = 6000): void {
    this.messageService.add({ key: 'appGlobal', severity: type, summary: message, life: duration, sticky : duration === 0 });
  }

  clearViaService(): void {
    this.messageService.clear();
  }
}
