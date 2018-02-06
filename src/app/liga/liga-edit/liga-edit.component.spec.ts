import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaEditComponent } from './liga-edit.component';

describe('LigaEditComponent', () => {
  let component: LigaEditComponent;
  let fixture: ComponentFixture<LigaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
