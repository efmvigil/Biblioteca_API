const bibliotecariosRepository = require('../repository/bibliotecarios_repository');

exports.listar = async function () {
  return await bibliotecariosRepository.listar();
};

exports.inserir = async function (bibliotecario) {
  if (
    bibliotecario &&
    bibliotecario.nome &&
    bibliotecario.cpf &&
    bibliotecario.senha &&
    bibliotecario.email &&
    bibliotecario.telefone
  ) {
    return bibliotecariosRepository.inserir(bibliotecario);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'bibliotecario inserido com dados incorretos',
    };
  }
};

exports.buscarPorId = async function (id) {
  const bibliotecarioEncontrado = await bibliotecariosRepository.buscarPorId(
    id
  );
  if (bibliotecarioEncontrado) return bibliotecarioEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'bibliotecario com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const bibliotecarioEncontrado = await bibliotecariosRepository.buscarPorId(
    id
  );
  if (bibliotecarioEncontrado) {
    if (
      atualizacao &&
      atualizacao.nome &&
      atualizacao.cpf &&
      atualizacao.senha &&
      atualizacao.email &&
      atualizacao.telefone
    ) {
      return bibliotecariosRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'bibliotecario inserido com dados incorretos',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'bibliotecario com este id não existe',
    };
};

exports.deletar = async function (id) {
  const bibliotecarioEncontrado = await bibliotecariosRepository.buscarPorId(
    id
  );
  if (bibliotecarioEncontrado) return bibliotecariosRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'bibliotecario com este id não existe',
    };
};
