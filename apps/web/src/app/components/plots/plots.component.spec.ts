import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsComponent } from './plots.component';

describe('PlotsComponent', () => {
  let component: PlotsComponent;
  let fixture: ComponentFixture<PlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotsComponent],
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
});
