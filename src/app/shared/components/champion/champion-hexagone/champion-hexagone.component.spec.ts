import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionHexagoneComponent } from './champion-hexagone.component';

describe('ChampionHexagoneComponent', () => {
  let component: ChampionHexagoneComponent;
  let fixture: ComponentFixture<ChampionHexagoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionHexagoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionHexagoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
