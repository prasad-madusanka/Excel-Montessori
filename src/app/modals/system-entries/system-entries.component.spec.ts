import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEntriesComponent } from './system-entries.component';

describe('SystemEntriesComponent', () => {
  let component: SystemEntriesComponent;
  let fixture: ComponentFixture<SystemEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
