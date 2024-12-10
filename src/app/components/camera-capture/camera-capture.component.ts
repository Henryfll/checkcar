import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-capture',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './camera-capture.component.html',
  styleUrl: './camera-capture.component.scss'
})
export class CameraCaptureComponent implements OnInit{
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;

  @Output() photoCaptured = new EventEmitter<string>();

  private stream!: MediaStream;

  constructor(private dialogRef: MatDialogRef<CameraCaptureComponent>) {}

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.stream = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera: ', error);
      });
  }

  capture(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoData = canvas.toDataURL('image/png');
      this.dialogRef.close(photoData); // Devuelve la foto al cerrar el diálogo
    }
  }

  cancel(): void {
    this.closeCamera();
    this.dialogRef.close(); // Cierra sin devolver nada

  }

  closeCamera(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks(); // Obtiene todos los "tracks" del flujo
      tracks.forEach((track) => track.stop()); // Detiene cada "track"
    }
  }

  ngOnDestroy(): void {
    this.closeCamera(); // Detener la cámara al destruir el componente
  }
}
