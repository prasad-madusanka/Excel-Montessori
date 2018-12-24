import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateStudentComponent } from './modal-update-student.component';

describe('ModalUpdateStudentComponent', () => {
  let component: ModalUpdateStudentComponent;
  let fixture: ComponentFixture<ModalUpdateStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
