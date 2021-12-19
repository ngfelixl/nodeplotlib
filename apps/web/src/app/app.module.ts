import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { PlotsService } from './services/plots.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PlotComponent } from './components/plot/plot.component';
import { PlotsComponent } from './components/plots/plots.component';
import { SocketService } from './services/socket.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    OverviewComponent,
    PlotComponent,
    PlotsComponent,
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
    DragDropModule,
    MatCardModule,
  ],
  providers: [PlotsService, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
