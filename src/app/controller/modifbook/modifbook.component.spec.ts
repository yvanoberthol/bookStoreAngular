import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifbookComponent } from './modifbook.component';

describe('ModifbookComponent', () => {
  let component: ModifbookComponent;
  let fixture: ComponentFixture<ModifbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
