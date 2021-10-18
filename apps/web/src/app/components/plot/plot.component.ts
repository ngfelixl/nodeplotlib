import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotData } from '@npl/interfaces';

// eslint-disable-next-line
declare const Plotly: any;

@Component({
  selector: 'npl-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotComponent implements AfterViewInit {
  @Input() plotData!: PlotData;
  @ViewChild('plotContainer', {static: false}) plotContainer!: ElementRef;

  ngAfterViewInit() {
    Plotly.newPlot(
      this.plotContainer.nativeElement,
      this.plotData.data,
      {...(this.plotData.layout ?? {}), autosize: true},
      {responsive: true}
    )
  }
}
