const express = require('express');
const bodyParser = require('body-parser');
const { generarGuion } = require('./poe');
const { generarVideo } = require('./did');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/generar-video', async (req, res) => {
  const guion = await generarGuion(req.body);
  const videoUrl = await generarVideo(guion);
  res.json({ url: videoUrl });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
