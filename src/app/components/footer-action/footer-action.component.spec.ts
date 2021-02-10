import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterActionComponent } from './footer-action.component';

describe('FooterActionComponent', () => {
  let component: FooterActionComponent;
  let fixture: ComponentFixture<FooterActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
