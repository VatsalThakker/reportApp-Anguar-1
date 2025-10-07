import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByFidComponent } from './report-by-fid.component';

describe('ReportByFidComponent', () => {
  let component: ReportByFidComponent;
  let fixture: ComponentFixture<ReportByFidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportByFidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByFidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
