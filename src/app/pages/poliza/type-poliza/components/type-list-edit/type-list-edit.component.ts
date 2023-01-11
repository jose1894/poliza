import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@BCTheme/services/layout.service';
import { TypePolizaInterface } from '@Core/models/poliza/type-poliza';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-type-list-edit',
  templateUrl: './type-list-edit.component.html',
  styleUrls: ['./type-list-edit.component.scss']
})
export class TypeListEditComponent implements OnInit {
  public isSave: boolean = false;
  public isRefresh: boolean = false;
  public typePoliza: TypePolizaInterface | null = null;

  public scrollHiddenToolbar$: Observable<boolean>;

  constructor (private _layoutService: LayoutService) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
   }

  ngOnInit(): void {
    this.typePoliza = {
      descripcion: 'test'
    }
  }

}
