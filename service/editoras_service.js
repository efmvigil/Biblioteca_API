const editorasRepository = require('../repository/editoras_repository');

exports.listar = async function () {
  return await editorasRepository.listar();
};

exports.inserir = async function (editora) {
  if (editora && editora.nome && editora.nacionalidade) {
    return editorasRepository.inserir(editora);
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'editora inserida com dados incorretos',
    };
  }
};

exports.buscarPorId = async function (id) {
  const editoraEncontrada = await editorasRepository.buscarPorId(id);
  if (editoraEncontrada) return editoraEncontrada;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'editora com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const editoraEncontrada = await editorasRepository.buscarPorId(id);
  if (editoraEncontrada) {
    if (atualizacao && atualizacao.nome && atualizacao.nacionalidade) {
      return editorasRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'editora inserida com dados incorretos',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'editora com este id não existe',
    };
};

exports.deletar = async function (id) {
  const editoraEncontrada = await editorasRepository.buscarPorId(id);
  if (editoraEncontrada) return editorasRepository.deletar(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'editora com este id não existe',
    };
};
