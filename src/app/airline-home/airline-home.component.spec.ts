import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineHomeComponent } from './airline-home.component';

describe('AirlineHomeComponent', () => {
  let component: AirlineHomeComponent;
  let fixture: ComponentFixture<AirlineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
