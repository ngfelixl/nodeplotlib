import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlotData } from '@npl/nodeplotlib';
import { Subject } from 'rxjs';
import { PlotsService } from '../../services/plots.service';
import { PlotsComponent } from './plots.component';

const PLOTS: PlotData[] = [
  {
    id: 1,
    data: [{ x: [1, 2, 3], y: [2, 3, 4] }],
    layout: {
      title: 'Test Plot 1',
    },
  },
  {
    id: 2,
    data: [{ x: [1, 2, 3], y: [2, 3, 4] }],
    layout: {
      title: 'Test Plot 2',
    },
  },
];

@Component({
  selector: 'npl-plot',
  template: '',
})
export class PlotComponent {
  @Input() plotData!: PlotData;
}

describe('PlotsComponent', () => {
  let component: PlotsComponent;
  let fixture: ComponentFixture<PlotsComponent>;
  let plotsServiceMock: PlotsService;
  let plots$: Subject<PlotData[]>;

  beforeEach(async () => {
    plots$ = new Subject();
    plotsServiceMock = {
      plots$,
    } as unknown as PlotsService;

    await TestBed.configureTestingModule({
      declarations: [PlotsComponent, PlotComponent],
      providers: [{ provide: PlotsService, useValue: plotsServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a empty list if there are no emitted values', () => {
    const plots = fixture.debugElement.queryAll(By.directive(PlotComponent));

    expect(plots.length).toBe(0);
  });

  it('should render a plot if there is one element', () => {
    plots$.next([PLOTS[0]]);

    fixture.detectChanges();

    const plots = fixture.debugElement.queryAll(By.directive(PlotComponent));
    expect(plots.length).toBe(1);
  });

  it('should render several plots', () => {
    plots$.next(PLOTS);

    fixture.detectChanges();

    const plots = fixture.debugElement.queryAll(By.directive(PlotComponent));
    expect(plots.length).toBe(2);
  });
});
