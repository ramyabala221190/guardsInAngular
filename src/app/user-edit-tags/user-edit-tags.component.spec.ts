import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditTagsComponent } from './user-edit-tags.component';

describe('UserEditTagsComponent', () => {
  let component: UserEditTagsComponent;
  let fixture: ComponentFixture<UserEditTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
