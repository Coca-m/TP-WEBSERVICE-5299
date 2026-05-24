import { TestBed } from '@angular/core/testing';

import { Audiotexto } from './audiotexto';

describe('Audiotexto', () => {
  let service: Audiotexto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Audiotexto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
