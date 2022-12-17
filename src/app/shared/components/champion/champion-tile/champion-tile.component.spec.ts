import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionTileComponent } from './champion-tile.component';

describe('ChampionTileComponent', () => {
  let component: ChampionTileComponent;
  let fixture: ComponentFixture<ChampionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
