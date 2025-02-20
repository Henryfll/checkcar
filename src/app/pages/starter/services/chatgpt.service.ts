import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apiKey = environment.apiKey;//(window as any).config.apiKey;

  private client: OpenAI;

  constructor(private http: HttpClient) {
    // Inicializar el cliente de OpenAI con la clave API
    this.client = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  // Función para codificar una imagen desde archivo
  async encodeImageFromFile(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  // Función para llamar a OpenAI con imagen y pregunta
  async questionAboutImage(base64Image: string, question: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o', // Modelo de OpenAI
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: question },
            { type: 'image_url', image_url: { url: `${base64Image}` } }
          ]
        }
      ],
      max_tokens: 300
    });
    return response.choices[0]?.message?.content || 'Sin respuesta';
  }


  // Función para respuestas de tipo sí o no
  async yesNoQuestionAboutImage(base64Image: string, question: string): Promise<boolean> {
    const response = await this.questionAboutImage(base64Image, question);
    return response.trim().toLowerCase().startsWith('sí');
  }

  // Función para obtener placa y VIN
  async placaYVin(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(base64Image, '¿Este es un documento, es una matricula de un auto?');
  }


  async caraTraseraDeCarnet(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(base64Image, '¿Existe la palabra provincia en la foto?');
  }

  async coincideVIN(base64Image: string, vin: string | null): Promise<boolean> {
    if (!vin) return true;
    return this.yesNoQuestionAboutImage(base64Image, `Responde con sí o no si la imagen tiene un código`);
  }

  async comprobarPlaca(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      `Responde sí o no si la imagen corresponde a la parte frontal de un vehículo`
    );
  }
  async comprobarFotoPosteriorVehiculo(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      `Responde sí o no si la imagen corresponde a la parte posterior de un vehículo`
    );
  }

  async esAnversoCedula(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      'Responde con un sí o no si es visible una foto en la credencial.'
    );
  }

  async colorCoche(base64Image: string): Promise<string> {
    const response = await this.questionAboutImage(base64Image, '¿De qué color es el coche? Menciona solamente el color.');
    return response.trim();
  }

  async esContratoDeCompraventa(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      'Responde con un sí o no si existe la frase "CONTRATO DE COMPRA VENTA" en el documento.'
    );
  }

  async esReconocimientoDeFirmas(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      'Responde con un sí o no si existe la frase "RECONOCIMIENTO DE FIRMAS" en el documento.'
    );
  }

  async yesNoAccident(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      'Responde con un sí o no si la foto muestra algún daño como golpes, rayones, abolladuras o vidrios rotos.'
    );
  }
}
