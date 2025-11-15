import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegadosPopupComponent } from './delegados-popup.component';

describe('DelegadosPopupComponent', () => {
  let component: DelegadosPopupComponent;
  let fixture: ComponentFixture<DelegadosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegadosPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegadosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
