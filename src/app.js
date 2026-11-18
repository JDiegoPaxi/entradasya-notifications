const express = require('express');

const notificationRoutes = require('./routes/notifications.routes');

const app = express();

app.use(express.json({ limit: '16kb' }));

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'notifications',
    status: 'ok'
  });
});

app.use('/api/notifications', notificationRoutes);

app.use((err, req, res, next) => {
  console.error('Error en notifications:', err.message);

  const isMulterError = err.name === 'MulterError';
  const status = err.code === 'LIMIT_FILE_SIZE' || err.status === 413
    ? 413
    : isMulterError || [400].includes(err.status)
      ? 400
      : 500;
  const messages = {
    400: 'Los datos o el archivo de la solicitud no son válidos.',
    413: 'El archivo o cuerpo de la solicitud excede el límite permitido.',
    500: 'Error interno al procesar la notificación.'
  };

  res.status(status).json({
    message: messages[status]
  });
});

module.exports = app;
