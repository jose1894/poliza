import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@Core/guards/auth.guard";
import { PermissionRouteGuard } from "@Core/guards/permission-route.guard";
import { TypeListEditComponent } from "./components/type-list-edit/type-list-edit.component";
import { TypePolizaComponent } from "./page/type-poliza.component";



const routes: Routes = [
    {
      path: '',
      component: TypePolizaComponent,
      data: {
        reuseRoute: true,
        id: 'PS010101',
      },
      canActivate: [AuthGuard, PermissionRouteGuard],
      children: [
        {
          path: 'add',
          component: TypeListEditComponent,
          data: { method: 'add' },
          canActivate: [PermissionRouteGuard],
        },
        {
          path: '**',
          redirectTo: '',
          pathMatch: 'full',
        },
      ],
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TypePolizaRoutingModule {}