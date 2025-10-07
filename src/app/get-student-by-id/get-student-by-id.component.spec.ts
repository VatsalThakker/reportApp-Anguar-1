import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudentByIdComponent } from './get-student-by-id.component';

describe('GetStudentByIdComponent', () => {
  let component: GetStudentByIdComponent;
  let fixture: ComponentFixture<GetStudentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStudentByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStudentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
