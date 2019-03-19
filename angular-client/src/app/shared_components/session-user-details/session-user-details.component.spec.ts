import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionUserDetailsComponent } from './session-user-details.component';

describe('SessionUserDetailsComponent', () => {
  let component: SessionUserDetailsComponent;
  let fixture: ComponentFixture<SessionUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
