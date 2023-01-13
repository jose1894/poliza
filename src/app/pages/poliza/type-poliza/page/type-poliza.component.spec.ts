import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePolizaComponent } from './type-poliza.component';

describe('PolizaComponent', () => {
  let component: TypePolizaComponent;
  let fixture: ComponentFixture<TypePolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePolizaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
