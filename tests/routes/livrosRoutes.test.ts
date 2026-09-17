import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de Livro', () => {
  it('`GET /livros` → **200** e **5** livros', async () => {
        const res = await request(app).get('/livros');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(5);
      });
  it('`GET /livros/1` → **200**, `titulo` = "O Hobbit"', async () => {
        const res = await request(app).get('/livros/1');
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('O Hobbit');
    });
  it('`GET /livros/999` → **404**', async () => {
        const res = await request(app).get('/livros/999');
        expect(res.status).toBe(404);
    });
  it('`POST /livros` válido (`titulo`, `paginas` ≥ 1, `autor_id` e `editora_id` existentes) → **201** com `id` no corpo', async () => {
        const res = await request(app).post('/livros').send(
          {
            titulo: 'test',
            paginas: 1 ,
            autor_id: 1 ,
            editora_id: 1 ,
          }
        );
        expect(res.status).toBe(201);
        expect(res.body).toEqual(
            expect.objectContaining({
              id: 6
            })
          );
    });
  it('`POST /livros` com body vazio → **400**', async () => {
        const res = await request(app).post('/livros')
        .send(
            {}
        );
        expect(res.status).toBe(400);
      });
  it('`POST /livros` com `autor_id` inexistente (`999`) → **400**', async () => {
        const res = await request(app).post('/livros').send(
          {
            titulo: 'test',
            paginas: 1 ,
            autor_id: 999 ,
            editora_id: 1 ,
          }
        );
        expect(res.status).toBe(400);
      });
  it('`POST /livros` com `editora_id` inexistente (`999`) → **400**', async () => {
        const res = await request(app).post('/livros').send(
          {
            titulo: 'test',
            paginas: 1 ,
            autor_id: 1 ,
            editora_id: 999 ,
          }
        );
        expect(res.status).toBe(400);
      });
  it('`POST /livros` com `paginas` = `0` → **400**', async () => {
        const res = await request(app).post('/livros').send(
          {
            titulo: 'test',
            paginas: 0 ,
            autor_id: 1 ,
            editora_id: 1 ,
          }
        );
        expect(res.status).toBe(400);
      });;
  it('`POST /livros` com `paginas` negativas → **400**', async () => {
        const res = await request(app).post('/livros').send(
          {
            titulo: 'test',
            paginas: -1 ,
            autor_id: 1 ,
            editora_id: 1 ,
          }
        );
        expect(res.status).toBe(400);
      });
  it('`PUT /livros/1` (`{ paginas }`) → **200**', async () => {
        const res = await request(app).put('/livros/1')
        .send(
            {
                paginas: 5,
            }
        );
        
        expect(res.status).toBe(200);
    });
  it('`PUT /livros/999` → **404**', async () => {
        const res = await request(app).put('/livros/999')
        .send(
            {
                paginas: 5,
            }
        );
        
        expect(res.status).toBe(404);
    });
  it('`DELETE /livros/5` → **204**', async () => {
        const res = await request(app).delete('/livros/5');
        expect(res.status).toBe(204);
    });
  it('`DELETE /livros/999` → **404**', async () => {
        const res = await request(app).delete('/livros/999');
        expect(res.status).toBe(404);
    });
  it('`GET /editoras/2/livros` → os livros da editora 2', async () => {
        const res = await request(app).get('/editoras/2/livros');
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    });
  it.todo('`POST /livros` para a editora 2 e, em seguida, `GET /editoras/2/livros` → a lista **cresce em 1** e inclui o novo livro');
});