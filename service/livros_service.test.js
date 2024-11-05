const livrosService = require('../service/livros_service');
const livrosRepository = require('../repository/livros_repository');
jest.mock('../repository/livros_repository');

afterEach(() => {
  jest.clearAllMocks();
});

// Teste para listar
test('listar - deve retornar uma lista de livros', async () => {
  const mockLivros = [
    { id: 1, titulo: 'Livro 1' },
    { id: 2, titulo: 'Livro 2' },
  ];
  livrosRepository.listar.mockResolvedValue(mockLivros); // Mock retornando uma Promise resolvida

  const result = await livrosService.listar();

  expect(result).toEqual(mockLivros);
  expect(livrosRepository.listar).toHaveBeenCalledTimes(1);
});

// Teste para inserir
test('inserir - deve inserir um novo livro com sucesso', async () => {
  const novoLivro = {
    titulo: 'Novo Livro',
    autor: 'Autor Exemplo',
    isbn: '1234567890123',
    ano: 2021,
    edicao: '1ª',
    editora: 'Editora Exemplo',
    usuario: 1,
  };

  livrosRepository.inserir.mockResolvedValue(novoLivro);

  const result = await livrosService.inserir(novoLivro);

  expect(result).toEqual(novoLivro);
  expect(livrosRepository.inserir).toHaveBeenCalledWith(novoLivro);
});

// Teste para erro ao inserir
test('inserir - deve lançar erro ao inserir livro com dados incorretos', async () => {
  const livroInvalido = { titulo: 'Livro Sem Autor' };

  await expect(livrosService.inserir(livroInvalido)).rejects.toEqual({
    status: 'erro',
    codigo: 400,
    msg: 'Livro inserido com dados incorretos',
  });

  expect(livrosRepository.inserir).not.toHaveBeenCalled();
});

// Teste para buscarPorId
test('buscarPorId - deve retornar o livro com o id especificado', async () => {
  const livro = { id: 1, titulo: 'Livro 1' };
  livrosRepository.buscarPorId.mockResolvedValue(livro);

  const result = await livrosService.buscarPorId(1);

  expect(result).toEqual(livro);
  expect(livrosRepository.buscarPorId).toHaveBeenCalledWith(1);
});

// Teste para erro ao buscarPorId
test('buscarPorId - deve lançar erro se o livro não existir', async () => {
  livrosRepository.buscarPorId.mockResolvedValue(null);

  await expect(livrosService.buscarPorId(99)).rejects.toEqual({
    status: 'erro',
    codigo: 404,
    msg: 'Livro com este id não existe',
  });

  expect(livrosRepository.buscarPorId).toHaveBeenCalledWith(99);
});

// Teste para atualizar
test('atualizar - deve atualizar o livro com o id especificado', async () => {
  const livroAtualizado = {
    id: 1,
    titulo: 'Livro Atualizado',
    autor: 'Autor Atualizado',
    isbn: '1234567890123',
    ano: 2022,
    edicao: '2ª',
    editora: 'Editora Atualizada',
    usuario: 1,
  };

  livrosRepository.buscarPorId.mockResolvedValue({
    id: 1,
    titulo: 'Livro 1',
    autor: 'Autor 1',
    isbn: '1234567890123',
    ano: 2021,
    edicao: '1ª',
    editora: 'Editora Original',
    usuario: 1,
  });

  livrosRepository.atualizar.mockResolvedValue(livroAtualizado);

  const result = await livrosService.atualizar(1, livroAtualizado);

  expect(result).toEqual(livroAtualizado);
  expect(livrosRepository.atualizar).toHaveBeenCalledWith(1, livroAtualizado);
});

// Teste para erro ao atualizar
test('atualizar - deve lançar erro se o livro não existir', async () => {
  livrosRepository.buscarPorId.mockResolvedValue(null);

  const atualizacao = { titulo: 'Livro Atualizado', autor: 'Autor Atualizado' };

  await expect(livrosService.atualizar(99, atualizacao)).rejects.toEqual({
    status: 'erro',
    codigo: 404,
    msg: 'Livro com este id não existe',
  });

  expect(livrosRepository.atualizar).not.toHaveBeenCalled();
});

// Teste para deletar
test('deletar - deve deletar o livro com o id especificado', async () => {
  const livro = { id: 1, titulo: 'Livro a ser deletado' };
  livrosRepository.buscarPorId.mockResolvedValue(livro);
  livrosRepository.deletar.mockResolvedValue(livro);

  const result = await livrosService.deletar(1);

  expect(result).toEqual(livro);
  expect(livrosRepository.deletar).toHaveBeenCalledWith(1);
});

// Teste para erro ao deletar
test('deletar - deve lançar erro se o livro não existir', async () => {
  livrosRepository.buscarPorId.mockResolvedValue(null);

  await expect(livrosService.deletar(99)).rejects.toEqual({
    status: 'erro',
    codigo: 404,
    msg: 'Livro com este id não existe',
  });

  expect(livrosRepository.deletar).not.toHaveBeenCalled();
});
