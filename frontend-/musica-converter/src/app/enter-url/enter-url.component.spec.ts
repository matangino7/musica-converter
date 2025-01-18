import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterUrlComponent } from './enter-url.component';

describe('EnterUrlComponent', () => {
  let component: EnterUrlComponent;
  let fixture: ComponentFixture<EnterUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterUrlComponent]
    });
    fixture = TestBed.createComponent(EnterUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
