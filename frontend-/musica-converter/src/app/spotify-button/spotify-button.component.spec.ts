import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyButtonComponent } from './spotify-button.component';

describe('SpotifyButtonComponent', () => {
  let component: SpotifyButtonComponent;
  let fixture: ComponentFixture<SpotifyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyButtonComponent]
    });
    fixture = TestBed.createComponent(SpotifyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
