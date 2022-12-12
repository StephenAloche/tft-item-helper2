import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionManagerComponent } from './champion-manager.component';

describe('ChampionManagerComponent', () => {
  let component: ChampionManagerComponent;
  let fixture: ComponentFixture<ChampionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
