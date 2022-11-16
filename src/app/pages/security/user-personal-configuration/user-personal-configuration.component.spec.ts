import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalConfigurationComponent } from './user-personal-configuration.component';

describe('UserPersonalConfigurationComponent', () => {
  let component: UserPersonalConfigurationComponent;
  let fixture: ComponentFixture<UserPersonalConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPersonalConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPersonalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
