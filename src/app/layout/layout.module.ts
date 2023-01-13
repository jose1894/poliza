import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './container/default/default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@Shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BCThemeSharedModule } from '@BCTheme/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CollapsableComponent } from './components/collapsable/collapsable.component';
import { ItemComponent } from './components/item/item.component';
import { GroupComponent } from './components/group/group.component';



@NgModule({
  declarations: [
    DefaultComponent,
    ToolbarComponent,
    NavbarComponent,
    SidenavComponent,
    NavigationComponent,
    CollapsableComponent,
    ItemComponent,
    GroupComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    BCThemeSharedModule, 
    SharedModule
  ],
  exports: [DefaultComponent],
})
export class LayoutModule { }
