import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportSearchComponent } from './view-report-search.component';

describe('ViewReportSearchComponent', () => {
  let component: ViewReportSearchComponent;
  let fixture: ComponentFixture<ViewReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReportSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
