import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmicionComponent } from './transmicion.component';

describe('TransmicionComponent', () => {
  let component: TransmicionComponent;
  let fixture: ComponentFixture<TransmicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
