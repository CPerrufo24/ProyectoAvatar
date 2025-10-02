const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generarGuion } = require('./poe');
const { generarVideo } = require('./did');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint básico para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('✅ Servidor activo. Usa POST /generar-video para generar el video.');
});

// Endpoint principal
app.post('/generar-video', async (req, res) => {
  try {
    const datos = req.body;

    // Validación básica de entrada
    if (!datos || !datos.nombre || !datos.edad) {
      return res.status(400).json({ error: 'Faltan datos obligatorios: nombre y edad.' });
    }

    console.log('📨 Datos recibidos:', datos);

    const guion = await generarGuion(datos);
    console.log('📝 Guion generado:', guion);

    const videoUrl = await generarVideo(guion);
    console.log('🎥 Video generado:', videoUrl);

    if (!videoUrl) {
      throw new Error('No se recibió URL de video desde D-ID');
    }

    res.json({ url: videoUrl });
  } catch (error) {
    console.error('❌ Error al generar video:', error.message);
    res.status(500).json({ error: 'No se pudo generar el video. Revisa consola para más detalles.' });
  }
});

// Puerto dinámico para Vercel o local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
