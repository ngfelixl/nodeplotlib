import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StackComponent } from './components/stack/stack.component';
import { StacksComponent } from './components/stacks/stacks.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { PlotsService } from './services/plots.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PlotComponent } from './components/plot/plot.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    StacksComponent,
    StackComponent,
    OverviewComponent,
    PlotComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [PlotsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
