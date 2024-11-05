const client = require('./database');

exports.listar = async function () {
  try {
    const res = await client.query('SELECT * FROM bibliotecarios');
    return res.rows;
  } catch (err) {
    throw {
      status: 'erro',
      codigo: `${err.code}`,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.inserir = async function (obj) {
  try {
    const res = await client.query(
      'INSERT into bibliotecarios (nome, cpf, senha, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      Object.values(obj)
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: `${err.code}`,
      msg: 'Falha na inserção de dados',
    };
  }
};

exports.buscarPorId = async function (id) {
  try {
    const res = await client.query(
      'SELECT * FROM bibliotecarios WHERE id = $1',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: `${err.code}`,
      msg: 'Falha na consulta de dados',
    };
  }
};

exports.atualizar = async function (id, obj) {
  try {
    const res = await client.query(
      'UPDATE bibliotecarios SET titulo = $1, autor = $2, isbn = $3, ano = $4, edicao = $5, editora = $6, usuario = $7 WHERE id = $8 RETURNING *',
      [...Object.values(obj), id]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: `${err.code}`,
      msg: 'Falha na atualização de dados',
    };
  }
};

exports.deletar = async function (id) {
  try {
    const res = await client.query(
      'DELETE FROM bibliotecarios WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw {
      status: 'erro',
      codigo: `${err.code}`,
      msg: 'Falha na remoção de dados',
    };
  }
};
