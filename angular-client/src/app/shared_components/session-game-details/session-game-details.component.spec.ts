import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGameDetailsComponent } from './session-game-details.component';

describe('SessionGameDetailsComponent', () => {
  let component: SessionGameDetailsComponent;
  let fixture: ComponentFixture<SessionGameDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionGameDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionGameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
