import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCaptureFigureComponent } from './camera-capture-figure.component';

describe('CameraCaptureFigureComponent', () => {
  let component: CameraCaptureFigureComponent;
  let fixture: ComponentFixture<CameraCaptureFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraCaptureFigureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraCaptureFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
