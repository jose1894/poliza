import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '@Core/routes/routes';
import { Routing } from 'src/app/app.routing';

const routes: Routes = [
 /* {
    path: Routing.getRouteById('B020102', ROUTES).url.join('/'),
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: Routing.getRouteById('B020103', ROUTES).url.join('/'),
    loadChildren: () => import('./roles/role.module').then((m) => m.RoleModule),
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
