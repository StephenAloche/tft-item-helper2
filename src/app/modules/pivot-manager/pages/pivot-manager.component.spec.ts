import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotManagerComponent } from './pivot-manager.component';

describe('PivotManagerComponent', () => {
  let component: PivotManagerComponent;
  let fixture: ComponentFixture<PivotManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PivotManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
