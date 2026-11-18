const express = require('express');

const controller = require('../controllers/notifications.controller');

const router = express.Router();

router.post('/test', controller.sendTest);

router.post(
  '/purchase-confirmation',
  controller.sendPurchaseConfirmation
);

module.exports = router;
