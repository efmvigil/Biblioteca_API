const express = require('express');
const editorasController = require('../controller/editoras_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router
  .route('/')
  .get(editorasController.listar)
  .post(editorasController.inserir);

router
  .route('/:id')
  .get(editorasController.buscarPorId)
  .put(editorasController.atualizar)
  .delete(editorasController.deletar);

module.exports = router;
