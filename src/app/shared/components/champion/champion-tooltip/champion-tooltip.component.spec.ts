import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionTooltipComponent } from './champion-tooltip.component';

describe('ChampionTooltipComponent', () => {
  let component: ChampionTooltipComponent;
  let fixture: ComponentFixture<ChampionTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
