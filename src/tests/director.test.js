const request = require('supertest');
const app = require('../app');

let id;

 test('GET /directors debe traer todos los directores', async () => {
  const response = await request(app).get('/directors');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
})

test('POST /directors debe crear un nuevo director', async () => {
  const newDirector = {
    firstName: 'John',
    lastName: 'Rangel',
    nationality: 'Inglaterra',
    image: 'https://www.eluniverso.com/resizer/LE_AXPB0s6jzCo7Bajs4z0hlbN8=/503x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/BRILEHXMIZBOFI43UYP3FGHUKY.jpg',
    birthday: '1970-01-01'
  };
  const response = await request(app).post('/directors').send(newDirector);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id debe actualizar un director', async () => {
  const updatedDirector = {
    firstName: 'John Actualizado'
  }
  const response = await request(app).put(`/directors/${id}`).send(updatedDirector);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.firstName).toBe(updatedDirector.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
  const response = await request(app).delete(`/directors/${id}`);
  expect(response.status).toBe(204);
});


