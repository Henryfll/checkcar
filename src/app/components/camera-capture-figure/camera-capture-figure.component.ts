import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-capture-figure',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './camera-capture-figure.component.html',
  styleUrl: './camera-capture-figure.component.scss'
})
export class CameraCaptureFigureComponent {
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;

  @Output() photoCaptured = new EventEmitter<string>();

  private stream!: MediaStream;

  constructor(private dialogRef: MatDialogRef<CameraCaptureFigureComponent>) {}

  ngAfterViewInit(): void {
    this.startCamera();

  }

  startCamera(): void {
    const video = this.videoElement.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: {facingMode: { ideal: "environment" },frameRate: { max: 1 }} }).then((stream) => {
     // navigator.mediaDevices.getUserMedia({ video: true }) .then((stream) => {
      video.srcObject = stream;
      this.videoElement.nativeElement.srcObject = stream;
      this.stream = stream;
      video.setAttribute("playsInline", "true");
      video.addEventListener('loadeddata', () => {
        video.play();
        this.drawOverlay();
      });
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
      navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((fallbackStream) => {
        video.srcObject = fallbackStream;
        video.play();
        this.drawOverlay();
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
  drawOverlay(): void {
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    const video = this.videoElement.nativeElement;

    if (context && video.videoWidth && video.videoHeight) {
      // Asegúrate de ajustar las dimensiones del canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Limpia el canvas antes de dibujar
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Configura el estilo del rectángulo
      context.strokeStyle = 'red';
      context.lineWidth = 3;

      // Calcula las coordenadas del cuadrado
      //const rectSize = 300;
      const x = (canvas.width - 400) / 2;
      const y = (canvas.height - 250) / 2;

      // Dibuja el cuadrado
      context.strokeRect(x, y, 400, 200);

       // Agregar texto sobre el rectángulo
      context.fillStyle = 'white'; // Color del texto
      context.font = '20px Arial'; // Fuente y tamaño del texto
      const text = 'Enfoque aquí'; // Texto a mostrar
      const textX = x + 10; // Ajuste horizontal del texto
      const textY = y - 10; // Ajuste vertical del texto
      context.fillText(text, textX, textY); // Dibuja el texto

      // Solicita la siguiente animación para mantener el overlay activo
      requestAnimationFrame(() => this.drawOverlay());
    } else {
      console.error('El contexto del canvas o las dimensiones del video no están disponibles.');
    }
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
