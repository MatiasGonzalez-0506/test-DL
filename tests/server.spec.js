const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {

  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it("Obteniendo un array", async () => {
    const { body } = await request(server).get("/cafes").send();
    const coffee = body;
    expect(coffee).toBeInstanceOf(Array);
  });

  it("Obteniendo un objeto de un array", async () => {
    const { body } = await request(server).get("/cafes").send();
    const coffee = body;
    const result = coffee.find((e) => typeof e === "object");
    expect(result).toBeInstanceOf(Object);
  });

  it("Comprobando que no existe un id con 404", async () => {
    const jwt = "token";
    const idCoffeeToEliminate = 10;
    const response = await request(server)
      .delete(`/cafes/${idCoffeeToEliminate}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });

  it("Agregando un nuevo café ", async () => {
    const coffee = { id: 5, nombre: "Expresso" };
    const { body: cafes } = await request(server).post("/cafes").send(coffee);
    expect(cafes).toContainEqual(coffee);
  });

  it("Obteniendo un 201", async () => {
    const coffee = { id:6 , nombre: "Crema" };
    const response = await request(server).post("/cafes").send(coffee);
    const status = response.statusCode;
    expect(status).toBe(201);
  });

  it("Obteniendo un 400", async () => {
    const id = 2;
    const coffee = { id, nombre: "Con Leche" };
    const response = await request(server).put("/cafes/1").send(coffee);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});