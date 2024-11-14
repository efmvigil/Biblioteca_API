const express = require('express');
const livrosRetiradosController = require('../controller/livrosRetirados_controller');
const authController = require('../controller/auth_controller');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  req.id = val;
  next();
});

router.route('/').get(livrosRetiradosController.listar);

router
  .route('/:id')
  .get(livrosRetiradosController.buscarPorId)
  .patch(livrosRetiradosController.devolver)
  .put(livrosRetiradosController.atualizar)
  .delete(livrosRetiradosController.deletar)
  .post(authController.autenticarToken, livrosRetiradosController.inserir);

module.exports = router;
