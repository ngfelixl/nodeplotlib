import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { PlotComponent } from './components/plot/plot.component';

const routes: Route[] = [
  { path: 'plots/:id', component: PlotComponent }
];

@NgModule({
  declarations: [AppComponent, PlotComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
