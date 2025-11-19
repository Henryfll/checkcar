import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorScrollComponent } from './visor-scroll.component';

describe('VisorScrollComponent', () => {
  let component: VisorScrollComponent;
  let fixture: ComponentFixture<VisorScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
