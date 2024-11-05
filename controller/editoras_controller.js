const editorasService = require('../service/editoras_service');

exports.listar = async function (req, res) {
  try {
    const result = await editorasService.listar();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.inserir = async function (req, res) {
  try {
    const result = await editorasService.inserir(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.buscarPorId = async function (req, res) {
  try {
    const result = await editorasService.buscarPorId(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.atualizar = async function (req, res) {
  try {
    const result = await editorasService.atualizar(req.id, req.body);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};

exports.deletar = async function (req, res) {
  try {
    const result = await editorasService.deletar(req.id);
    res.send(result);
  } catch (err) {
    res.status(err.codigo).send(err);
  }
};
