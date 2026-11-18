# Notifications

Microservicio de notificaciones por correo de EntradasYa. Está construido con Node.js, Express y Nodemailer; no utiliza base de datos.

## Requisitos

- Node.js 20 o superior.
- Una cuenta SMTP y sus credenciales configuradas localmente.

## Instalación

Desde esta carpeta:

```bash
npm install
```

Crea `.env` a partir de `.env.example` y configura tus credenciales SMTP. Para Yahoo, `SMTP_PASS` debe ser una contraseña de aplicación. No subas `.env` al repositorio.

## Ejecución

```bash
npm run dev
```

El servicio verifica la conexión SMTP antes de escuchar en el puerto configurado. Si la conexión falla, el proceso termina. El puerto predeterminado es `3006`.

## Endpoints

### Estado

`GET /health`

Respuesta `200`:

```json
{
  "service": "notifications",
  "status": "ok"
}
```

### Enviar correo de prueba

`POST /api/notifications/test` con `Content-Type: application/json`:

```json
{
  "to": "destinatario@example.com"
}
```

### Enviar confirmación de compra

`POST /api/notifications/purchase-confirmation` con `Content-Type: application/json`:

```json
{
  "to": "destinatario@example.com",
  "customerName": "Ana Pérez",
  "orderId": "ORD-12345",
  "eventName": "Concierto de ejemplo",
  "ticketsUrl": "https://entradas.example.com/mis-entradas/ORD-12345"
}
```

Todos los campos son obligatorios. `to` debe ser un correo válido y `ticketsUrl` debe usar `http` o `https`. Devuelve `200` cuando se envía el mensaje y `400` si los datos no son válidos.

Los errores del proveedor SMTP se procesan como errores internos (`500`). El límite del cuerpo JSON es de 16 KB; solicitudes JSON malformadas reciben `400` y las que exceden el límite reciben `413`.

## Postman

Importa `EntradasYa Notifications.postman_collection.json` en Postman. La colección usa `{{baseUrl}}`, cuyo valor predeterminado es `http://localhost:3006`.
