const { default: fetch } = require('node-fetch');

async function generarVideo(texto) {
  const response = await fetch('https://api.d-id.com/talks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      script: { type: 'text', input: texto, subtitles: false },
      config: { fluent: true, pad_audio: 0.5 },
      source_url: 'https://your-avatar-url.com/avatar.png' // Puedes usar uno infantil
    })
  });

  const json = await response.json();
  return json.result_url;
}

module.exports = { generarVideo };
