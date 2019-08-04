/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForbidenComponent } from './Forbiden.component';

describe('ForbidenComponent', () => {
  let component: ForbidenComponent;
  let fixture: ComponentFixture<ForbidenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbidenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbidenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
