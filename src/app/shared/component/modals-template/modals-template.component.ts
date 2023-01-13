import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'modals-template',
  templateUrl: 'modals-template.component.html',
  styleUrls: ['modals-template.component.scss'],
})
export class ModalsTemplateComponent {
  @Input() disabled: boolean = false;
  @Input() title = '';
  @Input() btnApply = true;
  @Input() msgBtnAceptar = 'Accept';
  @Input() isClassDefault = true;
  @Input() public isSpinSave: boolean = false;
  @Input() public isShowInputSave: boolean = true;
  @Input() public isSpinRefresh: boolean = false;
  @Input() public isShowDelete: boolean = false;
  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFocusClick: EventEmitter<any> = new EventEmitter<any>();

  isDelete = false;

  keypressed($event: any): void {
    this.onApply.emit($event);
  }

  close(): void {
    this.onClose.emit();
  }

  confirm(): void {
    this.onConfirm.emit();
  }

  onHandleDelete(): void {
    this.onDelete.emit();
  }

  // evento necesario cuando se presiona confirm el evento click pero se dispara
  // un observable antes con un mensaje (caso purchase invoice -> modal purchase
  // order lines)
  onFocus(focusEvent: any): void {
    if (focusEvent && focusEvent.sourceCapabilities){
      this.onFocusClick.emit(true);
    }
  }
}
