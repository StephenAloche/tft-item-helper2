import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionPicComponent } from './champion-pic.component';

describe('ChampionPicComponent', () => {
  let component: ChampionPicComponent;
  let fixture: ComponentFixture<ChampionPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
