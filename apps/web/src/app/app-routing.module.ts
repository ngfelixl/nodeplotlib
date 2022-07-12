import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
  Route,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';
import { PlotsComponent } from './components/plots/plots.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Route[] = [
  { path: 'plots', component: PlotsComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: '**', redirectTo: 'plots' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export class AppRoutesReuseStrategy implements RouteReuseStrategy {
  private cache: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    if (handler) {
      this.cache[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cache[this.getUrl(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === current.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot) {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    return this.cache[this.getUrl(route)];
  }

  private getUrl(route: ActivatedRouteSnapshot): string {
    return route.routeConfig?.path ?? '';
  }
}
