import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionItemsListComponent } from './champion-items-list.component';

describe('ChampionItemsListComponent', () => {
  let component: ChampionItemsListComponent;
  let fixture: ComponentFixture<ChampionItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionItemsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
