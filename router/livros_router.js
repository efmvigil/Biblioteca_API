const express = require('express');
const livrosController = require('../controller/livros_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/').get(livrosController.listar).post(livrosController.inserir);

router
  .route('/:id')
  .get(livrosController.buscarPorId)
  .put(livrosController.atualizar)
  .delete(livrosController.deletar);

module.exports = router;
