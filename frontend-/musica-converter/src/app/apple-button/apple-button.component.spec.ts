import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleButtonComponent } from './apple-button.component';

describe('AppleButtonComponent', () => {
  let component: AppleButtonComponent;
  let fixture: ComponentFixture<AppleButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppleButtonComponent]
    });
    fixture = TestBed.createComponent(AppleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
