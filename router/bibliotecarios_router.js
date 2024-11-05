const express = require('express');
const bibliotecariosController = require('../controller/bibliotecarios_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router
  .route('/')
  .get(bibliotecariosController.listar)
  .post(bibliotecariosController.inserir);

router
  .route('/:id')
  .get(bibliotecariosController.buscarPorId)
  .put(bibliotecariosController.atualizar)
  .delete(bibliotecariosController.deletar);

module.exports = router;
