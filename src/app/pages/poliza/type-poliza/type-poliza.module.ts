import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypePolizaComponent } from './page/type-poliza.component';
import { SharedModule } from '@Shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypePolizaRoutingModule } from './type-poliza-routing.module';
import { TypeListEditComponent } from './components/type-list-edit/type-list-edit.component';



@NgModule({
  declarations: [
    TypePolizaComponent,
    TypeListEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TypePolizaRoutingModule
  ]
})
export class TypePolizaModule { }
