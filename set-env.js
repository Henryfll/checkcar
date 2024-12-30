const fs = require('fs');

// Obtén la API key desde las variables de entorno
const apiKey = process.env.API_KEY;

// Verifica si la variable de entorno está configurada
if (!apiKey) {
  console.error('Error: API_KEY no está definida en las variables de entorno.');
  process.exit(1); // Finaliza el script con un código de error
}

// Genera el contenido del archivo `environment.prod.ts`
const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${apiKey}' // Inserta la API key aquí
};
`;

// Ruta donde se generará el archivo `environment.prod.ts`
const targetPath = './src/environments/environment.prod.ts';

// Escribe el contenido en el archivo `environment.prod.ts`
fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error al escribir el archivo environment.prod.ts:', err);
    process.exit(1);
  }
  console.log('Archivo environment.prod.ts generado exitosamente.');
});
