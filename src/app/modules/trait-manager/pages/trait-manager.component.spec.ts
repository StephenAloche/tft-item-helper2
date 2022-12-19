import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitManagerComponent } from './trait-manager.component';

describe('TraitManagerComponent', () => {
  let component: TraitManagerComponent;
  let fixture: ComponentFixture<TraitManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraitManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
