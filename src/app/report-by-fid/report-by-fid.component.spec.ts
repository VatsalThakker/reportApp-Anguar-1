import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyStudentsComponent } from './report-by-fid.component';

describe('ReportByFidComponent', () => {
  let component: FacultyStudentsComponent;
  let fixture: ComponentFixture<FacultyStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
