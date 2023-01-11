import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeListEditComponent } from './type-list-edit.component';

describe('TypeListEditComponent', () => {
  let component: TypeListEditComponent;
  let fixture: ComponentFixture<TypeListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeListEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
