import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredCoursesComponent } from './required-courses.component';

describe('RequiredCoursesComponent', () => {
  let component: RequiredCoursesComponent;
  let fixture: ComponentFixture<RequiredCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
