import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
