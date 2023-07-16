import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrptdetailsComponent } from './crptdetails.component';

describe('CrptdetailsComponent', () => {
  let component: CrptdetailsComponent;
  let fixture: ComponentFixture<CrptdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrptdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrptdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
