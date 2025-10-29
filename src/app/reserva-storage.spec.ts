import { TestBed } from '@angular/core/testing';

import { ReservaStorageService } from './reserva-storage';

describe('ReservaStorage', () => {
  let service: ReservaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
