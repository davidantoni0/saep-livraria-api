import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de Livro', () => {
  it.todo('`GET /livros` → **200** e **5** livros');
  it.todo('`GET /livros/1` → **200**, `titulo` = "O Hobbit"');
  it.todo('`GET /livros/999` → **404**');
  it.todo('`POST /livros` válido (`titulo`, `paginas` ≥ 1, `autor_id` e `editora_id` existentes) → **201** com `id` no corpo');
  it.todo('`POST /livros` com body vazio → **400**');
  it.todo('`POST /livros` com `autor_id` inexistente (`999`) → **400**');
  it.todo('`POST /livros` com `editora_id` inexistente (`999`) → **400**');
  it.todo('`POST /livros` com `paginas` = `0` → **400**');
  it.todo('`POST /livros` com `paginas` negativas → **400**');
  it.todo('`PUT /livros/1` (`{ paginas }`) → **200**');
  it.todo('`PUT /livros/999` → **404**');
  it.todo('`DELETE /livros/5` → **204**');
  it.todo('`DELETE /livros/999` → **404**');
  it.todo('`GET /editoras/2/livros` → os livros da editora 2');
  it.todo('`POST /livros` para a editora 2 e, em seguida, `GET /editoras/2/livros` → a lista **cresce em 1** e inclui o novo livro');
});