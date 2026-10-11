const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Interfaz web interactiva (carpeta public/)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint de saludo: mensaje de bienvenida
app.get('/saludo', (req, res) => {
  res.send('¡Hola desde Docker! Laboratorio 4 - UdeA 2026');
});

// Endpoint de operaciones matemáticas básicas
// Ejemplo: /calcular?op=sumar&a=5&b=3
app.get('/calcular', (req, res) => {
  const { op } = req.query;
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Los parámetros a y b deben ser números' });
  }

  const operaciones = {
    sumar: () => a + b,
    restar: () => a - b,
    multiplicar: () => a * b,
    dividir: () => (b === 0 ? null : a / b),
  };

  if (!operaciones[op]) {
    return res.status(400).json({
      error: 'Operación no válida',
      operacionesDisponibles: Object.keys(operaciones),
    });
  }

  const resultado = operaciones[op]();
  if (resultado === null) {
    return res.status(400).json({ error: 'No se puede dividir entre cero' });
  }

  res.json({ operacion: op, a, b, resultado });
});

// Endpoint de salud (útil para verificar que el contenedor está vivo)
app.get('/health', (req, res) => {
  res.json({ estado: 'ok', hostname: require('os').hostname() });
});

app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
