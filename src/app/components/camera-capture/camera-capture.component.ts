import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-camera-capture',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatIcon],
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

    navigator.mediaDevices.getUserMedia({ video: {facingMode: { ideal: "environment" },frameRate: { ideal: 15, max: 30 }, } }).then((stream) => {
     // navigator.mediaDevices.getUserMedia({ video: true }) .then((stream) => {
      video.srcObject = stream;
      this.videoElement.nativeElement.srcObject = stream;
      this.stream = stream;
      video.setAttribute("playsInline", "true");
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

  /*capture(): void {
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
  }*/

    capture(): void {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;
  const context = canvas.getContext('2d');

  if (!context || video.videoWidth === 0) {
    console.error("Error: video aún no está listo.");
    return;
  }

  // Reducción automática a 1024px de ancho (evita errores en móviles viejos)
  const maxWidth = 1024;
  const scale = maxWidth / video.videoWidth;

  canvas.width = maxWidth;
  canvas.height = video.videoHeight * scale;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  try {
    const photoData = canvas.toDataURL('image/jpeg', 0.8); // JPEG es más seguro que PNG
    this.dialogRef.close(photoData);
  } catch (e) {
    console.error("Error generando Base64:", e);
    alert("Error al capturar imagen. Intenta nuevamente.");
    this.dialogRef.close();
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
