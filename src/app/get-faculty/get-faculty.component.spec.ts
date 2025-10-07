import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFacultyComponent } from './get-faculty.component';

describe('GetFacultyComponent', () => {
  let component: GetFacultyComponent;
  let fixture: ComponentFixture<GetFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetFacultyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
