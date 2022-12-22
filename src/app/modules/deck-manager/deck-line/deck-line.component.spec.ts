import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckLineComponent } from './deck-line.component';

describe('DeckLineComponent', () => {
  let component: DeckLineComponent;
  let fixture: ComponentFixture<DeckLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
