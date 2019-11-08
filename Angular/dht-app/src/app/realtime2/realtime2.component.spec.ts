import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Realtime2Component } from './realtime2.component';

describe('Realtime2Component', () => {
  let component: Realtime2Component;
  let fixture: ComponentFixture<Realtime2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Realtime2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Realtime2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
