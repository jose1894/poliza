import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBarFilterComponent } from './input-bar-filter.component';

describe('InputBarFilterComponent', () => {
  let component: InputBarFilterComponent;
  let fixture: ComponentFixture<InputBarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBarFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
