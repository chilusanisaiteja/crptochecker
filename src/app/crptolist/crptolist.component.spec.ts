import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrptolistComponent } from './crptolist.component';

describe('CrptolistComponent', () => {
  let component: CrptolistComponent;
  let fixture: ComponentFixture<CrptolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrptolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrptolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
