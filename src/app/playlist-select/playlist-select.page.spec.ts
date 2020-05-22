import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaylistSelectPage } from './playlist-select.page';

describe('PlaylistSelectPage', () => {
  let component: PlaylistSelectPage;
  let fixture: ComponentFixture<PlaylistSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
