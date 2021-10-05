import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { StackComponent } from './components/stack/stack.component';
import { StacksComponent } from './components/stacks/stacks.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Route[] = [
  {
    path: 'plots',
    component: StacksComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: ':id', component: StackComponent },
    ],
  },
  { path: 'tutorial', component: TutorialComponent },
  { path: '**', redirectTo: 'plots' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
