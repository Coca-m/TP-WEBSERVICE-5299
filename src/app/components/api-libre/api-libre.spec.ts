import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLibre } from './api-libre';

describe('ApiLibre', () => {
  let component: ApiLibre;
  let fixture: ComponentFixture<ApiLibre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiLibre],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiLibre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
