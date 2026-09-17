
import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';


beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de Autor', () => {
    test('`GET /autores → **200** e **3** autores', async () => {
        const res = await request(app).get('/autores');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
      });
      test('`GET /autores/1` → **200**, `nome` = "JRR Tolkien"', async () => {
        const res = await request(app).get('/autores/1');
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe('JRR Tolkien');
    });
    test('`GET /autores/999` → **404**', async () => {
        const res = await request(app).get('/autores/999');
        expect(res.status).toBe(404);
    });
    test('`POST /autores` válido (`{ nome, nacionalidade }`) → **201** com `id` no corpo', async () => {
        const res = await request(app).post('/autores').send(
          {
              nome: 'Jk Rowling',
              nacionalidade: 'Britânica',
          }
        );
        expect(res.status).toBe(201);
        expect(res.body).toEqual(
            expect.objectContaining({
              id: 4
            })
          );
    });
    test('`POST /autores` com body vazio → **400**', async () => {
        const res = await request(app).post('/autores')
        .send(
            {}
        );
        expect(res.status).toBe(400);
      });
    test('`PUT /autores/1` (`{ nacionalidade }`) → **200** com a nacionalidade nova', async () => {
        const res = await request(app).put('/autores/1')
        .send(
            {
                nacionalidade : 'brasileira'
            }
        );
        
        expect(res.status).toBe(200);
        expect(res.body.nacionalidade).toBe('brasileira')
    });
    test('`PUT /autores/999` → **404**', async () => {
        const res = await request(app).put('/autores/999')
        .send(
            {
                nacionalidade : 'brasileira'
            }
        );
        
        expect(res.status).toBe(404);
      });
    test('`DELETE /autores/3` → **204**', async () => {
        const res = await request(app).delete('/autores/3');
        expect(res.status).toBe(204);
    });
    test('`DELETE /autores/999` → **404**', async () => {
        const res = await request(app).delete('/autores/999');
        expect(res.status).toBe(404);
    });
    test('`GET /autores/1/livros` → **2** livros', async () => {
        const res = await request(app).get('/autores/1/livros');
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(2)
    });
    test('`GET /autores/3/livros` → **1** livro', async () => {
        const res = await request(app).get('/autores/3/livros');
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    });
});