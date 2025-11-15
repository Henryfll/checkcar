import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncripcionComponent } from './incripcion.component';

describe('IncripcionComponent', () => {
  let component: IncripcionComponent;
  let fixture: ComponentFixture<IncripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
