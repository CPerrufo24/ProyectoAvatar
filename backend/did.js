const fetch = require('node-fetch');

async function generarVideo(texto) {
  if (!texto || typeof texto !== 'string') {
    throw new Error('El texto para generar el video es inválido o está vacío.');
  }

  try {
    const response = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        script: { type: 'text', input: texto, subtitles: false },
        config: { fluent: true, pad_audio: 0.5 },
        source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Emma_f/image.png'
      })
    });

    const json = await response.json();

    if (!response.ok || !json.result_url) {
      console.error('❌ Error en respuesta de D-ID:', json);
      throw new Error('No se pudo generar el video desde D-ID.');
    }

    return json.result_url;
  } catch (error) {
    console.error('❌ Error al conectar con D-ID:', error.message);
    throw new Error('Error al generar el video desde D-ID.');
  }
}

module.exports = { generarVideo };
