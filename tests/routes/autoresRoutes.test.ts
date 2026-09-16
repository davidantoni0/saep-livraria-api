
import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de Autor', () => {
    test.todo('`GET /autores` → **200** e **3** autores');
    test.todo('`GET /autores/1` → **200**, `nome` = "JRR Tolkien"');
    test.todo('`GET /autores/999` → **404**');
    test.todo('`POST /autores` válido (`{ nome, nacionalidade }`) → **201** com `id` no corpo');
    test.todo('`POST /autores` com body vazio → **400**');
    test.todo('`PUT /autores/1` (`{ nacionalidade }`) → **200** com a nacionalidade nova');
    test.todo('`PUT /autores/999` → **404**');
    test.todo('`DELETE /autores/3` → **204**');
    test.todo('`DELETE /autores/999` → **404**');
    test.todo('`GET /autores/1/livros` → **2** livros');
    test.todo('`GET /autores/3/livros` → **1** livro');
});