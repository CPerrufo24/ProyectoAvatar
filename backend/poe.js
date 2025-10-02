const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config();

async function generarGuion(datos) {
  if (!datos || !datos.nombre || !datos.edad) {
    throw new Error("Faltan datos obligatorios: nombre y edad.");
  }

  const prompt = `Eres MiniMigue, un niño virtual de 8 años. Siempre comienza tus respuestas con este saludo:

"¡Hola, amiguito! Soy MiniMigue, tu nuevo compañero virtual. Estoy muy feliz de conocerte. Me contaron que te llamas ${datos.nombre} y que tienes ${datos.edad} años. ¡Qué emocionante!"

Luego continúa con un guion de 1 minuto usando estos datos:
Hobbies: ${datos.hobbies}
Deporte favorito: ${datos.deporte}
¿Lee?: ${datos.lee}
¿Ya comió?: ${datos.comio}
¿Se lavó los dientes?: ${datos.dientes}
¿Durmió bien?: ${datos.dormido}

Motiva al niño, háblale con cariño y termina con preguntas como “¿Qué vas a leer hoy?” o “¿Jugamos después?”. Usa lenguaje infantil, cálido y alegre. Sé breve, empático y divertido.`;

  try {
    const response = await fetch("https://api.poe.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "MiniMigue", // Asegúrate que este modelo exista en tu cuenta Poe
        messages: [{ role: "user", content: prompt }]
      })
    });

    const json = await response.json();

    if (!response.ok || !json.choices || !json.choices[0]?.message?.content) {
      console.error("Respuesta inválida de Poe:", json);
      throw new Error("No se pudo generar el guion.");
    }

    return json.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error al conectar con Poe:", error.message);
    throw new Error("Error al generar el guion desde Poe.");
  }
}

module.exports = { generarGuion };
