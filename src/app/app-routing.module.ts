import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@Core/guards/auth.guard';
import { IsAuthenticatedGuard } from '@Core/guards/is-authenticated.guard';
import { DefaultComponent } from './layout/container/default/default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: {
      reuseRoute: false,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}