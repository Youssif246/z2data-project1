import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedComponent } from './compared.component';

describe('ComparedComponent', () => {
  let component: ComparedComponent;
  let fixture: ComponentFixture<ComparedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparedComponent]
    });
    fixture = TestBed.createComponent(ComparedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
