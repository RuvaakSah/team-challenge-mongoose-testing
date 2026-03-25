const request = require('supertest');
const app = require('../index');
const Post = require('../team-challenge-mongoose-testing/models/Post');
const mongoose = require('mongoose');

describe('Test de la Red Social', () => {
    beforeAll(async () => {
        await Post.deleteMany();
    });

    test('POST /create debería crear una publicación', async () => {
        const res = await request(app)
            .post('/create')
            .send({ title: "Título Test", body: "Cuerpo Test" });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    test('GET / debería traer todas las publicaciones', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});