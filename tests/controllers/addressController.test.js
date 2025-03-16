const request = require("supertest");
const app = require("../../src/app");

describe("Address API", () => {
  test("Deve adicionar um endereço com sucesso", async () => {
    const response = await request(app).post("/addresses").send({
      userId: "12345",
      cep: "12345-678",
      logradouro: "Rua das Flores",
      numero: "100",
      complemento: "Apto 101",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve retornar erro ao enviar CEP inválido", async () => {
    const response = await request(app).post("/addresses").send({
      userId: "12345",
      cep: "1234-567",
      logradouro: "Rua das Flores",
      numero: "100",
      complemento: "Apto 101",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("CEP inválido. Verifique o formato.");
  });
});
