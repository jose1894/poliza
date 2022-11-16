import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
//import { ScrollHiddenHeaderDirective } from './directives/scroll-hidden-header.directive';

@NgModule({
  declarations: [/*ScrollHiddenHeaderDirective*/],
  exports: [MaterialModule, FlexLayoutModule, /*ScrollHiddenHeaderDirective*/],
})
export class BCThemeSharedModule {}