import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '@BCTheme/services/layout.service';
import { ViewStatusRoute } from '@Core/interfaces/base-service.interface';
import { TypePolizaInterface } from '@Core/models/poliza/type-poliza';
import { NotifyService } from '@Core/services/notify.service';
import { TypePolizaService } from '@Core/services/poliza/type-poliza.service';
import { preventSpecialKey } from '@Shared/helpers/prevent-special-key';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-type-list-edit',
  templateUrl: './type-list-edit.component.html',
  styleUrls: ['./type-list-edit.component.scss']
})
export class TypeListEditComponent implements OnInit {
  public isSave: boolean = false;
  public isRefresh: boolean = false;
  public formControlTypePoliza: FormGroup;
  public typePoliza: TypePolizaInterface | null = null;

  public scrollHiddenToolbar$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _layoutService: LayoutService,
    private _notifyService: NotifyService,
    private _typePolizaService: TypePolizaService
  ) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
    this.formControlTypePoliza = this._formBuilder.group({
      descripcion: ['', [Validators.required]],
    });

    this._typePolizaService.onSelectedTypePoliza().subscribe((data: any) => {
      if (data) {
        const { descripcion, ...dataTypePoliza } = data
        this.formControlTypePoliza.patchValue({
          descripcion: descripcion
        });
      }
    })

    console.log('edit')
  }

  ngOnInit(): void {
    this.typePoliza = {
      descripcion: ''
    }
  }

  saveTypePoliza() {
    const type = 'success';    
    const id = this._typePolizaService.selectedTypePoliza?.id || 0; 
    if (this._typePolizaService.viewStatus === ViewStatusRoute.ADD) {
      this._typePolizaService.save(this.formControlTypePoliza.value).subscribe((data: TypePolizaInterface) => {
        const message = 'Save successfully';
        //@ts-ignore
        this._goToView(type, message, data.id);
        this._typePolizaService.selectedTypePoliza = data;
      }, error => { console.log(error) })
    } else {
      const message = 'Update successfully';
      this._typePolizaService.update(this.formControlTypePoliza.value, id).subscribe((resp:any) => {
        const { status, data } = resp;
        if(status === 'ok') {          
         this._goToView(type, message, data.id);
        }
      });
    }
  }

  _goToView(type: string, message: string, id: string)  {
    this._notifyService.showNotification(type, message);
    this._typePolizaService.goToView(ViewStatusRoute.EDIT, [id]);
  }

  public changeInput(evt: KeyboardEvent, key: string): void {
    if (preventSpecialKey(evt)) return;
    //@ts-ignore
    const value = evt.target.value;

    if (this.typePoliza) {
      //@ts-ignore
      if (this.typePoliza[key] !== value) {
        //@ts-ignore
        this.typePoliza[key] = value;
      }

    }

  }

  getErrorMessage(key: string) {
    if (this.formControlTypePoliza.controls[key].hasError('required')) {
      return 'You must enter a value';
    }
    return this.formControlTypePoliza.controls[key].hasError('email') ? 'Not a valid email' : '';
  }

}
