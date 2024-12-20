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
    const video = this.videoElement.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: "environment" },} }).then((stream) => {
     // navigator.mediaDevices.getUserMedia({ video: true }) .then((stream) => {
      video.srcObject = stream;
      this.videoElement.nativeElement.srcObject = stream;
      this.stream = stream;
      video.addEventListener('loadeddata', () => {
        video.play();
      });
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
      navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((fallbackStream) => {
        video.srcObject = fallbackStream;
        video.play();
      })
      .catch((fallbackError) => {
        console.error("Error al acceder a cualquier cámara:", fallbackError);
        if (fallbackError.name === "NotAllowedError") {
          alert(
            "Por favor, habilita los permisos de cámara en la configuración de tu dispositivo."
          );
        }
      });
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
