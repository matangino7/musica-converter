import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlaylistsComponent } from './spotify-playlists.component';

describe('SpotifyPlaylistsComponent', () => {
  let component: SpotifyPlaylistsComponent;
  let fixture: ComponentFixture<SpotifyPlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyPlaylistsComponent]
    });
    fixture = TestBed.createComponent(SpotifyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
