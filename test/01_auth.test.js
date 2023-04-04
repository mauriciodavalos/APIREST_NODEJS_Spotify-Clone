const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");
const mongoose = require("mongoose");


/**
 * Se va a ejecutar antes de las pruebas 
 */
beforeAll(async () => {
    await usersModel.deleteMany({});
});

/**
 * Se va a cerrar la conexion de moongose
 */
afterAll(async () => {
    await mongoose.connection.close();
});

//LOGIN PRUEBA
test("esto deberia de retornar 404", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLogin);

    expect(response.statusCode).toEqual(404);
});

test("esto deberia de retornar 201", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send(testAuthRegister);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("data.token");
    expect(response.body).toHaveProperty("data.user");
});

//LOGIN PRUEBA
test("esto deberia de retornar password no valido 401", async () => {
    const newTestAuthLogin = { ...testAuthLogin, password: "22222222" }
    const response = await request(app)
        .post("/api/auth/login")
        .send(newTestAuthLogin);

    expect(response.statusCode).toBe(401);
});

test("esto deberia de retornar 200 login exitoso", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthRegister);

    expect(response.statusCode).toEqual(200);
});

