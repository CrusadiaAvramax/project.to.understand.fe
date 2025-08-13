import {TestBed} from '@angular/core/testing';

import {Utenti} from './utenti';

describe('Utenti', () => {
  let service: Utenti;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Utenti);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
