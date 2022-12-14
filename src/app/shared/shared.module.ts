import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BCThemeSharedModule } from '@BCTheme/shared.module';
import { AppRouterOutletDirective } from 'src/app/app.routes-strategy';
import { ErrorModalDialogComponent } from './component/error-dialog/error-dialog.component';
import { ButtonUpScrollComponent } from './component/button-up-scroll/button-up-scroll.component';
import { CustomModalDialogComponent } from './component/dialog/custom-dialog/custom-dialog.component';
import { UserPersonalConfigurationComponent } from '@Pages/security/user-personal-configuration/user-personal-configuration.component';
import { ModalsTemplateComponent } from './component/modals-template/modals-template.component';
import { BtnConfirmDeleteComponent } from './component/btn-confirm-delete/btn-confirm-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemListViewComponent } from './item-list-view/item-list-view.component';


@NgModule({
  declarations: [
    ButtonUpScrollComponent,
    BtnConfirmDeleteComponent,
    ModalsTemplateComponent,
    UserPersonalConfigurationComponent,
    /* Dialogs */
    ErrorModalDialogComponent,
    CustomModalDialogComponent,
    /* Directives */
    AppRouterOutletDirective,
    ItemListViewComponent,
  ],
  imports: [
    CommonModule,
    BCThemeSharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    /* Components */
    ButtonUpScrollComponent,
    BtnConfirmDeleteComponent,
    ModalsTemplateComponent,
    UserPersonalConfigurationComponent,
    /* Dialogs */

    ErrorModalDialogComponent,

    /* Directive */
    AppRouterOutletDirective,
    /* Module */
    BCThemeSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ItemListViewComponent,
  ],
  entryComponents: [
    ErrorModalDialogComponent,
    CustomModalDialogComponent,
    ModalsTemplateComponent,
  ],
})
export class SharedModule { }
