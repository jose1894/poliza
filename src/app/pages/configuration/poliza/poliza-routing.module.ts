import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@Core/guards/auth.guard";
import { PermissionRouteGuard } from "@Core/guards/permission-route.guard";
import { PolizaComponent } from "./page/poliza.component";



const routes: Routes = [
    {
      path: '',
      component: PolizaComponent,
      data: {
        reuseRoute: true,
        id: 'PS010101',
      },
      canActivate: [AuthGuard, PermissionRouteGuard],
      children: [
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
export class PolizaRoutingModule {}