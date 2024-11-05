const client = require('./database');

exports.listar = async function () {
  try {
    const res = await client.query('SELECT * FROM editoras');
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
      'INSERT into editoras (nome, nacionalidade) VALUES ($1, $2) RETURNING *',
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
    const res = await client.query('SELECT * FROM editoras WHERE id = $1', [
      id,
    ]);
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
      'UPDATE editoras SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *',
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
      'DELETE FROM editoras WHERE id = $1 RETURNING *',
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
