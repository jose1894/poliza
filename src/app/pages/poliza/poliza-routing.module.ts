import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '@Core/routes/routes';
import { joinRoute } from '@Shared/helpers/join-route';
import { Routing } from 'src/app/app.routing';

const routes: Routes = [
  {
    //@ts-ignore
    path: Routing.getRouteById('PS010101', ROUTES).url.join('/'),
    loadChildren: () => import('./type-poliza/type-poliza.module').then((m) => m.TypePolizaModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolizaRoutingModule {}
