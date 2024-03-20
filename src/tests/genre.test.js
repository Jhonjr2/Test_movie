const request = require('supertest');
const app = require('../app');

let id;


test('GET /genres debe traer todos los generos', async () => {
    const response = await request(app).get('/genres');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
})

test('POST /genres debe crear un nuevo genero', async () => {
  const newGenre = {
    name: 'Comedy'
  };
  const response = await request(app).post('/genres').send(newGenre);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.name).toBe(newGenre.name);
});

test('PUT /genres/:id debe actualizar un género', async () => {
  const updatedGenre = {
    name: 'Comedy Actualizado'
  }
  const response = await request(app).put(`/genres/${id}`).send(updatedGenre);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.name).toBe(updatedGenre.name);

});

test('DELETE /genres/:id debe eliminar un género', async () => {
  const response = await request(app).delete(`/genres/${id}`);
  expect(response.status).toBe(204);
});






