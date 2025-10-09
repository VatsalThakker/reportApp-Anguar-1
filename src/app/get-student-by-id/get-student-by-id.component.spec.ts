import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentComponent } from './get-student-by-id.component';

describe('GetStudentByIdComponent', () => {
  let component: ViewStudentComponent;
  let fixture: ComponentFixture<ViewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
