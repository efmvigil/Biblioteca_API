const livrosService = require('../service/livros_service');

exports.listar = async function (req, res) {
  try {
    const result = await livrosService.listar();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.inserir = async function (req, res) {
  try {
    const result = await livrosService.inserir(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.buscarPorId = async function (req, res) {
  try {
    const result = await livrosService.buscarPorId(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.atualizar = async function (req, res) {
  try {
    const result = await livrosService.atualizar(req.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.deletar = async function (req, res) {
  try {
    const result = await livrosService.deletar(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};
