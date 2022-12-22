import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTraitsComponent } from './active-traits.component';

describe('ActiveTraitsComponent', () => {
  let component: ActiveTraitsComponent;
  let fixture: ComponentFixture<ActiveTraitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTraitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
