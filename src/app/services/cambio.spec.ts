import { TestBed } from '@angular/core/testing';

import { Cambio } from './cambio';

describe('Cambio', () => {
  let service: Cambio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cambio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
