const request = require('supertest');
const app = require('../app');

let id;

 test('GET /actors debe traer todos los actores', async () => {
  const response = await request(app).get('/actors');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
})

test('POST /actors debe crear un nuevo genero', async () => {
  const newActor = {
    firstName: 'Will',
    lastName: 'Smith',
    nationality: 'USA',
    image: 'https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2022/03/28/6241870c05990.r_d.2375-1483.jpeg',
    birthday: '1980-01-01'
  };
  const response = await request(app).post('/actors').send(newActor);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.firstName).toBe(newActor.firstName);
  
});

test('PUT /actors/:id debe actualizar un actor', async () => {
  const updatedActor = {
    firstName: 'Will Actualizado'
  }
  const response = await request(app).put(`/actors/${id}`).send(updatedActor);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.firstName).toBe(updatedActor.firstName);
});


test('DELETE /actors/:id debe eliminar un actor', async () => {
  const response = await request(app).delete(`/actors/${id}`);
  expect(response.status).toBe(204);
});

 
