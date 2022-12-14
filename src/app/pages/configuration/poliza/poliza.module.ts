import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolizaComponent } from './page/poliza.component';
import { PolizaRoutingModule } from './poliza-routing.module';
import { SharedModule } from '@Shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PolizaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PolizaRoutingModule
  ]
})
export class PolizaModule { }
