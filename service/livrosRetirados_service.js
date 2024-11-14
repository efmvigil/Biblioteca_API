const livrosRetiradosRepository = require('../repository/livrosRetirados_repository');

exports.listar = async function () {
  return await livrosRetiradosRepository.listar();
};

exports.inserir = async function (idLivro, idUsuario) {
  if (idLivro && idUsuario) {
    const verificacao = await livrosRetiradosRepository.verificarLivroRetirado(
      idLivro
    );
    if (!verificacao) {
      return await livrosRetiradosRepository.inserir(idLivro, idUsuario);
    } else {
      throw {
        status: 'erro',
        codigo: 409,
        msg: 'Livro indisponivel para retirada',
        livro,
      };
    }
  } else {
    throw {
      status: 'erro',
      codigo: 400,
      msg: 'Erro ao retirar livro',
      livro,
    };
  }
};

exports.buscarPorId = async function (id) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) return livroRetiradoEncontrado;
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

exports.atualizar = async function (id, atualizacao) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) {
    if (atualizacao) {
      return livrosRetiradosRepository.atualizar(id, atualizacao);
    } else {
      throw {
        status: 'erro',
        codigo: 400,
        msg: 'Livro retirado inserido com dados incorretos',
      };
    }
  } else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};

exports.deletar = async function (id) {
  const livroRetiradoEncontrado = await livrosRetiradosRepository.buscarPorId(
    id
  );
  if (livroRetiradoEncontrado) return livrosRetiradosRepository.devolver(id);
  else
    throw {
      status: 'erro',
      codigo: 404,
      msg: 'Livro retirado com este id não existe',
    };
};
