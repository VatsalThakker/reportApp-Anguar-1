import { TestBed } from '@angular/core/testing';

import { FacultyServiceService } from './faculty-service.service';

describe('FacultyServiceService', () => {
  let service: FacultyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
