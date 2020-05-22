import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaylistEditPage } from './playlist-edit.page';

describe('PlaylistEditPage', () => {
  let component: PlaylistEditPage;
  let fixture: ComponentFixture<PlaylistEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
