import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUpScrollComponent } from './button-up-scroll.component';

describe('ButtonUpScrollComponent', () => {
  let component: ButtonUpScrollComponent;
  let fixture: ComponentFixture<ButtonUpScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonUpScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonUpScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
