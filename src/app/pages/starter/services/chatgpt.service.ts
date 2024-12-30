import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apiKey = (window as any).config.apiKey;

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
  async placaYVin(base64Image: string): Promise<{ placa: string; vin: string }> {
    const response = await this.questionAboutImage(
      base64Image,
      'Obtén la placa actual y número VIN. Devuelve el resultado en el formato: La placa actual es: ABC123 y el número VIN es: 123456789.'
    );
    const match = response.match(/La placa actual es: (\w+) y el número VIN es: (\w+)/i);
    if (match) {
      return { placa: match[1], vin: match[2] };
    }
    return { placa: 'ABC123', vin: '123456789' };
  }


  async caraTraseraDeCarnet(base64Image: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(base64Image, '¿Existe la palabra provincia en la foto?');
  }

  async coincideVIN(base64Image: string, vin: string | null): Promise<boolean> {
    if (!vin) return true;
    return this.yesNoQuestionAboutImage(base64Image, `Responde con sí o no si el VIN es ${vin}`);
  }

  async comprobarPlaca(base64Image: string, placa: string): Promise<boolean> {
    return this.yesNoQuestionAboutImage(
      base64Image,
      `Responde sí o no si la placa es ${placa} es igual a la placa de la foto`
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
